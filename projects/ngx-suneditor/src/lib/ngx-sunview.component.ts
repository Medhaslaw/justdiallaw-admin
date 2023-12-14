import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-sunview',
  template: `
    <div
      *ngIf="bypassSantiziser"
      class="sun-editor-editable"
      [innerHTML]="content | safeHtml"
    ></div>
    <div
      *ngIf="!bypassSantiziser"
      class="sun-editor-editable"
      [innerHTML]="content"
    ></div>
  `,
})
export class NgxSunViewComponent {
  /**
   * HTML content generated by the editor to display
   */
  @Input() content!: string;

  /**
   * Bypass angular's DomSanitizer
   * @default false
   */
  @Input() bypassSantiziser: boolean = false;
}
