import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is simply a test',
      'http://www.cuisine-francaise.org/blog/wp-content/uploads/2009/10/COQUILLES-SAINT-JACQUES-PIERRTTES-GUIDE.jpg'
    ),
    new Recipe(
      'A test recipe',
      'this is simply a test',
      'http://www.cuisine-francaise.org/blog/wp-content/uploads/2009/10/COQUILLES-SAINT-JACQUES-PIERRTTES-GUIDE.jpg'
    ),
  ];
}
