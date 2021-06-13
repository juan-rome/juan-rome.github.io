import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppConstants } from '../../../app.constants';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {
  appConstants = AppConstants;
}
