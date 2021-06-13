import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppConstants } from '../../../app.constants';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  constructor() {
  }

  appConstants = AppConstants;
  hideBorder = false;
  skills = ['Java', 'Spring', 'Python', 'Git', 'Angular', 'Bootstrap', 'JPA',
    'JDBC', 'Jenkins', 'JUnit', 'Node.js', 'PostgreSQL', 'PrimeNg',
    'REST', 'RXJS', 'SpringBoot', 'IntelliJ'].sort();
  languages = ['CSS', 'HTML', 'Java', 'JavaScript', 'TypeScript', 'Python'];
  practices = ['Agile', 'CI/CD', 'Scrum', 'Test Driven Development'];
}
