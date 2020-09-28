import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      customField: ['', [Validators.required]]
    }, {
      // Delay updating the form validity for performance reasons
      updateOn: 'blur'
    });
  }

  get nameFormControl() {
    return this.form.controls.name;
  }

  get customInputFormControl() {
    return this.form.controls.customField;
  }

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      timer(500).subscribe(() => {
        console.log(this.form.value);
        this.loading= false;
      });
    }
  }
}
