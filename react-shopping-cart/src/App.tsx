import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Drawer, Grid, LinearProgress, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import { Wrapper } from "./App.styles";

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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  console.log("data :>> ", data);

  const getTotalitems = () => null;

  const handleAddToCart = () => null;

  const handleRemoveFromCart = () => null;
  if (error) <div>Something went wrong...</div>;
  return (
    <div className="App">{isLoading ? <LinearProgress /> : "Lets start"}</div>
  );
};

export default App;
