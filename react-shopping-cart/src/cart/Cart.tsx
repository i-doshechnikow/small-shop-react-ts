import CartItem from "../CartItem/CartItem";

import { Wrapper } from "./Cart.style";

import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = (props) => {
  const { cartItems, addToCart, removeFromCart } = props;

  const calculateTotal = (items: CartItemType[]) => {
    return items.reduce((accumulator: number, item: CartItemType) => {
      let total = item.amount * item.price;
      return accumulator + total;
    }, 0);
  };

  return (
    <Wrapper>
      <h2>Your shopping cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
