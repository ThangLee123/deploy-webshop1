import Axios from 'axios';
import { useSelector } from 'react-redux';
import { axiosInstance } from '~/config/configApiUrl';
import { showSuccessMessage } from '~/utils/notifyService';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    // console.log('action summary1');
    const { data } = await axiosInstance.post(`/api/products/${productId}`, {}); //m
    // console.log('xcxcxc', data);
    // console.log('action summary2');
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image1: data.image1,
            image2: data.image2,
            image3: data.image3,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            seller: data.seller,
            qty,
        },
    });

    // console.log('action summary3');
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    // console.log('action summary5');
};

export const removeFromCart = (productId, productName) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    showSuccessMessage(`Product  ${productName} delete successfully`, 'topRight');
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const isCartEmpty = () => () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    if (cartItems.length === 0) console.log('check Empty card' + cartItems.length);
    return 0;
};
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
    localStorage.setItem('cartSavePaymentMethod', JSON.stringify(data));
};
