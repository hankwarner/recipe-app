import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  collapsed = true;
  @Output() changePageEvent = new EventEmitter<string>();

  onNavClick(pageName: string) {
    this.changePageEvent.emit(pageName);
  }
}
