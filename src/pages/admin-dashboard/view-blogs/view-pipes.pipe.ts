import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'viewPipes'
})
export class ViewPipesPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }
  transform(value:any): any {
      if (value)
          return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
