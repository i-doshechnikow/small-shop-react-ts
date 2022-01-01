import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Drawer, Grid, LinearProgress, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Cart from "./cart/Cart";

import { StyledButton, Wrapper } from "./App.styles";
import Item from "./item/item";
import CartItem from "./CartItem/CartItem";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalitems = (items: CartItemType[]) =>
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (clickedItemId: number) => {
    setCartItems((prev) => {
      const isLastInCart = prev.some(
        (item) => item.id === clickedItemId && item.amount === 1
      );

      if (isLastInCart) {
        return prev.filter((item) => item.id !== clickedItemId);
      }

      return prev.map((item) => {
        return item.id === clickedItemId
          ? { ...item, amount: item.amount - 1 }
          : item;
      });
    });
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <Wrapper className="App">
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton
        onClick={() => {
          setCartOpen(true);
        }}
      >
        <Badge badgeContent={getTotalitems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default App;
