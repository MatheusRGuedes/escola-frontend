import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToString'
})
export class ObjectToStringPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    //if (value instanceof Endereco) {
    //  return 'endereco class';
    // }

    return value.toString();
  }

}
