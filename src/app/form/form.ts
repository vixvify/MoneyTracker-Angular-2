import { Component, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { List } from '../../types/list';
import { ListService } from '../../services/list.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  name = signal<string>('');
  money = signal<Number>(0);
  type = signal<string>('');
  canSend = signal(false);

  constructor(private listService: ListService, private router: Router) {
    effect(() => {
      if (this.name() === '' || Number(this.money()) === 0 || this.type() === '') {
        this.canSend.set(false);
      } else {
        this.canSend.set(true);
      }
    });
  }

  sendData() {
    const data: List = {
      name: this.name(),
      money: this.money(),
      type: this.type(),
    };
    this.listService.saveData(data).subscribe({
      next: () => {
        Swal.fire({
          title: '✅ ส่งข้อมูลสำเร็จ',
          icon: 'success',
          draggable: true,
        });
        this.router.navigate(['/']);
      },
      error: (err) => console.error('❌ เกิดข้อผิดพลาด', err),
    });
  }
}
