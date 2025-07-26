import { Component } from '@angular/core';
import { LoaderService } from './core/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // ✅ typo fixed: use "styleUrls" (plural)
})
export class AppComponent {
  title = 'hrXpert';
  loading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.loading$.subscribe(state => {
      this.loading = state;
    });
  }
}
