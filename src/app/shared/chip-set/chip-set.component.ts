import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { popInOut } from '../../core/animations/pop-in-out.animation';

@Component({
  selector: 'chip',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrls: ['./chip-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  @Input() value: any;
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;

  constructor() {
  }
}

@Component({
  selector: 'chip-set',
  templateUrl: './chip-set.component.html',
  styleUrls: ['./chip-set.component.scss'],
  animations: [popInOut]
})
export class ChipSetComponent {
  @ContentChildren(ChipComponent) chips: QueryList<ChipComponent>;

  constructor() {
  }
}
