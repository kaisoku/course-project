import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  //private shoppingListSub: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnDestroy() {
    //this.shoppingListSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    console.log(this.ingredients);
    /*  this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListSub =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => (this.ingredients = ingredients)
      ); */
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
