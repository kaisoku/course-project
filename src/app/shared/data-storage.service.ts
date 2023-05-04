import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  recipeUrl =
    'https://angular-http-request-53c89-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipeUrl, recipes).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchRecipe() {
    return this.http.get<Recipe[]>(this.recipeUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          const mappedRecipe: Recipe = {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
          return mappedRecipe;
        });
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }
}
