import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrl: './signup-client.component.scss'
})
export class SignupClientComponent {

  validateForm!: FormGroup;

  constructor(
    ){}
}
