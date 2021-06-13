import { animate, style, transition, trigger } from '@angular/animations';

export const popInOut = trigger('popInOut', [
  transition(':enter', [
    style({ transform: 'scale(0)', opacity: 0 }),  // initial
    animate('1s cubic-bezier(.25, 1, 0.2, 1)',
      style({ transform: 'scale(1)', opacity: 1 }))  // final
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1, height: '*' }),
    animate('1s cubic-bezier(.25, 1, 0.2, 1)',
      style({
        transform: 'scale(0)', opacity: 0,
        width: '0px', margin: '0px', padding: '0px'
      }))
  ])
]);
