import { Component, signal } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../types/list';
import { effect } from '@angular/core';
import { Calservice } from '../../services/cal.service';
import { Money } from '../../types/money';
import Swal from 'sweetalert2';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLinkWithHref],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  data = signal<List[]>([]);
  moneyCal = signal<Money>({ earn: 0, pay: 0, total: 0 });

  constructor(private listservice: ListService, private calService: Calservice) {
    effect(() => {
      this.getItem();
    });
  }

  getItem() {
    this.listservice.getData().subscribe({
      next: (latestData) => {
        this.data.set(latestData.data);
        const moneyData = this.calService.getCal(this.data());
        this.moneyCal.set(moneyData);
      },
      error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
    });
  }

  confirmDel(name: String) {
    Swal.fire({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delItem(name);
      }
    });
  }

  delItem(name: String) {
    this.listservice.deleteData(name).subscribe({
      next: () => {
        this.getItem();
        Swal.fire({
          title: '✅ ลบข้อมูลสำเร็จ',
          icon: 'success',
          draggable: true,
        });
      },
      error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
    });
  }
}
