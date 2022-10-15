import { Component, OnInit } from '@angular/core';
import { ListTasksService } from '../list-tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentDate;
  allTasks = [];
  showAddButton = true;
  constructor(private listTasks: ListTasksService) {}
  ngOnInit(): void {
    this.currentDate = new Date();

    this.listTasks.getAllTasks().subscribe({
      next: (response) => {
        console.log(response);
        this.allTasks = [];
        for (const key in response) {
          this.allTasks.push({ id: key, ...response[key] });
        }
        console.log(this.allTasks);
      },
    });
  }

  editChecked(task) {
    task.checked = !task.checked;
    this.listTasks.updateTask(task).subscribe({
      next: (response) => {
        console.log('Task Updated');
      },
    });
  }

  onDelete(idTask) {
    this.listTasks.deleteTask(idTask).subscribe({
      next: (response) => {
        alert('Task Deleted');
        this.ngOnInit();
      },
    });
  }

  toggleShowAdd() {
    this.showAddButton = !this.showAddButton;
  }

  onAddTask(taskText) {
    this.listTasks
      .addTask({
        text: taskText,
        date: new Date().toString(),
        checked: false,
      })
      .subscribe({
        next: (response) => {
          alert('Task Added');
          this.toggleShowAdd();
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
