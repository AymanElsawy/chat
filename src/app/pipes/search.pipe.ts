import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user.interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(users: User[], filter:string ) :User[]{
    if (!filter) return users;
    return users.filter((user) => user.username.toLowerCase().includes(filter.toLowerCase()));

  }

}
