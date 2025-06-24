export type TProduct = {
  id: number;
  title: string;
  price: number;
  cat_prefix?: string;
  img: string;
  img2: string;
  img3: string;
  max: number;
  quantity?: number;
  isLiked?: boolean;
  isAuthorized?: boolean;
};
