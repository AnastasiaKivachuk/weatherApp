import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cutName'
})
export class CutNamePipe implements PipeTransform {

  transform(array: string[]): any {
    return array.filter((item) => item !== 'name');
  }
}
