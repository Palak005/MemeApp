import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  imports: [],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.css'
})

export class UiInputComponent {
  @Input() placeholder = '';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
