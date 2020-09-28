import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  }]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder = '';
  @Input() hasError: boolean;

  // The internal data model
  private innerValue = '';

  // Change inner value on input
  onChange(value: string): void {
    this.writeValue(value);
    this.onTouchedCallback();
  }

  // Set touched on blur
  onBlur(): void {
    this.onTouchedCallback();
  }

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: string) => void;

  // From ControlValueAccessor interface
  writeValue(value: string): void {
    // Check if inner value is changed for performance reasons
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}
