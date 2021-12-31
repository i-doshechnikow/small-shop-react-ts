import { Button } from "@material-ui/core";

import { CartItemType } from "../App";

import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = (props) => {
  const { item, addToCart, removeFromCart } = props;

  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;
