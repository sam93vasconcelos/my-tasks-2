import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

interface ITask {
  id: string;
  title: string;
  completed: boolean;
  control: FormControl;
}

@Component({
  selector: ' singles',
  templateUrl: './singles.component.html',
  styleUrls: ['./singles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglesComponent implements OnInit {
  tasks: ITask[] = [];
  completed: number = 0;
  uncompleted: number = 0;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.createControls();
    this.calculate();
  }

  ngOnInit(): void {}

  createControls(): void {
    const i = 10;
    for (let index = 0; index < i; index++) {
      const task = {
        id: `asldkf${index}alsdkfj`,
        title: `Teste - ${index}`,
        completed: false,
        control: new FormControl(),
      };

      task.control.valueChanges.subscribe({
        next: (value) => {
          task.completed = value;
          this.calculate();
        },
      });
      this.tasks.push(task);
    }

    this.changeDetector.markForCheck();
  }

  calculate(): void {
    this.completed = this.tasks.filter((task) => task.completed).length;
    this.uncompleted = this.tasks.filter((task) => !task.completed).length;
    this.changeDetector.markForCheck();
  }
}
