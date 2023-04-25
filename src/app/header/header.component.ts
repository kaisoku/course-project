import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private dataStoraService: DataStorageService) {}

  onSaveData() {
    this.dataStoraService.storeRecipe();
  }

  onFetchData() {
    this.dataStoraService.fetchRecipe().subscribe();
  }
}
