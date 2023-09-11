import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  private context!: CanvasRenderingContext2D;
  private isDrawing = false;
  private selectedColor = 'black';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.renderer.listen(this.canvas.nativeElement, 'mousedown', (event) => this.onMouseDown(event));
    this.renderer.listen(this.canvas.nativeElement, 'mousemove', (event) => this.onMouseMove(event));
    this.renderer.listen(this.canvas.nativeElement, 'mouseup', () => this.onMouseUp());
  }

  onMouseDown(event: MouseEvent) {
    this.isDrawing = true;
    this.context.strokeStyle = this.selectedColor;
    this.context.lineWidth = 3;
    this.context.beginPath();
    this.context.moveTo(
      event.clientX - this.canvas.nativeElement.getBoundingClientRect().left,
      event.clientY - this.canvas.nativeElement.getBoundingClientRect().top
    );
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing) return;
    this.context.lineTo(
      event.clientX - this.canvas.nativeElement.getBoundingClientRect().left,
      event.clientY - this.canvas.nativeElement.getBoundingClientRect().top
    );
    this.context.stroke();
  }

  onMouseUp() {
    this.isDrawing = false;
    this.context.closePath();
  }

  changeColor(newColor: string) {
    this.selectedColor = newColor;
  }
}
