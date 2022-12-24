export interface IngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface CategoryType {
  value: string;
  text: string;
}

export interface RequestDataBase {
  success: boolean;
}

export interface RequestDataMessage extends RequestDataBase {
  message: string;
}

export interface AuthUser {
  name: string;
  email: string;
}

export type OrderStatus = "done" | "created" | "pending";
export interface Order {
  _id: string;
  ingredients: string[];
  status: OrderStatus;
}
