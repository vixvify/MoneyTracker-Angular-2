import { Injectable } from '@angular/core';
import { List } from '../types/list';

@Injectable({
  providedIn: 'root',
})
export class Calservice {
  getCal(data: List[]) {
    const earn = data
      .filter((e) => e.type === 'รายรับ')
      .map((e) => Number(e.money))
      .reduce((sum, num) => {
        sum += num;
        return sum;
      }, 0);
    const pay = data
      .filter((e) => e.type === 'รายจ่าย')
      .map((e) => Number(e.money))
      .reduce((sum, num) => {
        sum += num;
        return sum;
      }, 0);
    const total = earn - pay;
    return { earn, pay, total };
  }
}
