import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios'
import getConfig from '../../utils/getConfig';
import { getPurchasesThunk } from './purchases.slice';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cartSlice = createSlice({
		name: 'car',
    initialState: [],
    reducers: {
        setCar: (state, action)=> {
          return action.payload
        }
    }
})

export const getProductsCarThunk = () => dispatch => {
  dispatch(setIsLoading(true));
  return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
    .then(res=> dispatch(setCar(res.data.data.cart.products)))
    .finally(()=> dispatch(setIsLoading(false)))
}

export const createPurchasesThunk = (productsInCart) => dispatch => {
  dispatch(setIsLoading(true));
  return axios.post(`https://e-commerce-api.academlo.tech/api/v1/cart`, productsInCart, getConfig())
    .then((res)=> dispatch(getProductsCarThunk()))
    .finally(()=> dispatch(setIsLoading(false)))
}

export const checkoutCarThunk = () => dispatch => {
  dispatch(setIsLoading(true));
  return axios.post(`https://e-commerce-api.academlo.tech/api/v1/purchases`, {}, getConfig())
    .then((res)=> dispatch(setCar([])))
    .finally(()=> dispatch(setIsLoading(false)))
}

export const deleteItenCarThunk = (id) => dispatch => {
  dispatch(setIsLoading(true));
  return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
    .then((res)=> dispatch(getProductsCarThunk()))
    .finally(()=> dispatch(setIsLoading(false)))
}

export const { setCar } = cartSlice.actions;

export default cartSlice.reducer;

// https://e-commerce-api.academlo.tech/api/v1/cart
