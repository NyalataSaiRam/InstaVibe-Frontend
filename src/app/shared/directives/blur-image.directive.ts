import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBlurImage]',
  standalone: true
})
export class BlurImageDirective {

  constructor(private er:ElementRef, private render: Renderer2) {
    this.render.setStyle(this.er.nativeElement, 'z-index', '1');
   }

  @HostListener('mouseover') 
  onMouseEnter(){
    this.render.setStyle(this.er.nativeElement, "opacity", .3);
    this.render.setStyle(this.er.nativeElement, "z-index", 0);
  }
  @HostListener('mouseleave') 
  onMouseExit(){
    this.render.setStyle(this.er.nativeElement, "opacity", 1);
    this.render.setStyle(this.er.nativeElement, "z-index", 1);
  }


}
