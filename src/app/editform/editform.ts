import { Component, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { List } from '../../types/list';
import { ListService } from '../../services/list.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './editform.html',
  styleUrl: './editform.css',
})
export class Editform {
  name = signal<string>('');
  money = signal<Number>(0);
  type = signal<string>('');

  constructor(
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getData();
  }

  getData() {
    this.listService.getSingle(this.route.snapshot.paramMap.get('name')!).subscribe({
      next: (res) => {
        this.name.set(res.data.name);
        this.money.set(res.data.money);
        this.type.set(res.data.type);
      },
    });
  }

  updateData() {
    const data = {
      name: this.name(),
      money: Number(this.money()),
      type: this.type(),
    };
    this.listService.updateItem(this.name(), data).subscribe({
      next: () => {
        console.log('com');

        Swal.fire({
          title: '✅ แก้ไขข้อมูลสำเร็จ',
          icon: 'success',
          draggable: true,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
