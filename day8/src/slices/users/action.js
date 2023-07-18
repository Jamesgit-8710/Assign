import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
});

// export const fetchProd = createAsyncThunk("fetchProd", async () => {
//     const response = await fetch("https://fakestoreapi.com/products");
//     return response.json();
// });
