import { CartItem } from "@components/ecommerce";
import { TProduct } from "@type/index";

type TCartItemListProps = {
  products: TProduct[];
  changeCartQuantity: (id: number, quantity: number) => void; // will takes function return void
  DeleteItem: (id: number) => void;
};
const CartItemList = ({
  products,
  changeCartQuantity,
  DeleteItem,
}: TCartItemListProps) => {
  let list = products.map((el) => {
    return (
      <CartItem
        key={el.id}
        {...el}
        changeCartQuantity={changeCartQuantity}
        DeleteItem={DeleteItem}
      />
    );
  });
  return <>{list}</>;
};

export default CartItemList;
