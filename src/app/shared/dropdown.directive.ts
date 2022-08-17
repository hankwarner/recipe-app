import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  constructor(private el: ElementRef) {}

  @HostBinding("class.open") toggleOpen = false;

  @HostListener("document:click", ["$event"])
  onDropdownClick(ev: Event) {
    this.toggleOpen = this.el.nativeElement.contains(ev.target)
      // toggle the dropdown menu when button is clicked
      ? !this.toggleOpen
      // close the menu when anywhere outside of the menu element is clicked
      : false;
  }

}
