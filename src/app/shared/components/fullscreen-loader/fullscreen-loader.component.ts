import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullscreen-loader',
  templateUrl: './fullscreen-loader.component.html',
  styleUrls: ['./fullscreen-loader.component.scss']
})
export class FullscreenLoaderComponent {
  @Input() visible = false;
}
