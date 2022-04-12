import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
 
  recipesChange = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Tasty Schnitzel",
  //     "A super-tasty Schnitzel - just awesome!",
  //     "https://www.carolinescooking.com/wp-content/uploads/2016/06/Wiener-schnitzel-photo-1.jpg",
  //     [
  //       new Ingredient("Meat", 1), 
  //       new Ingredient("French Fries", 20)
  //     ]),
  //   new Recipe(
  //     "Big Fat Burger",
  //     "What else you need to say?",
  //     "https://www.thespruceeats.com/thmb/ad4-cZdHW0fHWDn_JSuh3FTjLag=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/garlic-burger-patties-333503-hero-01-e4df660ff27b4e5194fdff6d703a4f83.jpg",
  //     [
  //       new Ingredient("Buns", 2), 
  //       new Ingredient("Meat", 1)
  //     ]),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChange.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index]; 
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChange.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChange.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChange.next(this.recipes.slice());
  }
}
