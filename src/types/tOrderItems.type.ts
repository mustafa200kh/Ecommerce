import { TProduct } from "./index";

export type TOrederItems = {
  id: number;
  userId: number;
  items: TProduct[];
  subTotalPrice: number;
};
