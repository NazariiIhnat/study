import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit = 5) {
    return value.length > limit ? `${value.substr(0, limit)}...` : value;
  }
}
