import {AbstractControl} from '@angular/forms';

function PasswordValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value ? {'misMatch': true} : null;
}
// go to this link:
// https://www.youtube.com/watch?v=dlVVYmntDnE&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ&index=56
