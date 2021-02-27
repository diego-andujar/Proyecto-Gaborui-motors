import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  transform(array: any[], pageSize: number | string, pageNumber: number): any[] {
    if(!array.length) return[];
    if(pageSize === "all") {
      return array;
    }
    pageSize = pageSize || 1
    pageNumber = pageNumber || 4
    --pageNumber
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
  }

}
