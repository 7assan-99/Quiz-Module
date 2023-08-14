import { Directive, ElementRef, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({selector: '[clickedOutside]'})
export class ClickedOutsideDirective{

    constructor(private el: ElementRef){}

    @Output() public clickOutside = new EventEmitter<boolean>();

    @HostListener('document:click',['$event.target'])
    public onClick(target: any){
        const clickedInside = this.el.nativeElement.contains(target);

        if(!clickedInside){
            this.clickOutside.emit(true)
        }
    }
}