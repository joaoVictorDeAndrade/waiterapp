import { Ingredient } from './Ingredient';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  ingredients: Ingredient[];
}
