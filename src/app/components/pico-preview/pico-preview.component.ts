import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pico-preview',
  templateUrl: './pico-preview.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export default class PicoPreviewComponent {
  constructor() {}
}
