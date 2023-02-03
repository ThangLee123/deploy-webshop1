import Axios from 'axios';
import { axiosInstance } from '~/config/configApiUrl';
import { showErrorMessage, showSuccessMessage } from '~/utils/notifyService';
import {
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

export const listProducts =
    ({
        seller = '',
        name = '',
        category = '',
        currentPage = '',
        itemsPerPage = 9,
        searchValue = '',
        min = 0,
        max = 0,
        rating = 0,
        order = '',
    }) =>
    async (dispatch) => {
        // console.log('act1');
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });
        // console.log('act2');
        try {
            // console.log('act3');
            const { data } = await axiosInstance.post(
                `/api/products?searchValue=${searchValue}&name=${name}&category=${category}&pageNumber=${currentPage}&itemsPerPage=${itemsPerPage}&seller=${seller}&min=${min}&max=${max}&rating=${rating}&order=${order}`,
                {},
            ); //m
            // console.log(data);
            // console.log('act4');
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
            // console.log('act5');
        } catch (error) {
            // console.log(error);
            // console.log('act6');
            dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
            // console.log('act7');
        }
    };
export const listProductCategories = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
        const { data } = await axiosInstance.post(`/api/products/categories`, {}); //m
        dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    // console.log('acc1');
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    // console.log('acc2');
    try {
        // console.log('acc3');
        const { data } = await axiosInstance.post(`/api/products/${productId}`, {}); //m
        // console.log(data);
        // console.log('acc4');
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
        // console.log('acc5');
    } catch (error) {
        // console.log(error); //(axiosInstance error)
        // console.log('acc6');
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
        // console.log('acc7');
    }
};

export const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    try {
        const { token } = getState();
        const { data } = await axiosInstance.post(
            `/api/products/createProduct`,
            {},
            {
                headers: {
                    Authorization: `${token}`,
                },
            },
        );
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    try {
        const { token } = getState();
        const { data } = await axiosInstance.put(`/api/products/${product._id}`, product, {
            headers: {
                Authorization: `${token}`,
            },
        });
        showSuccessMessage('Product Updated Successfully', 'topRight');
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        showErrorMessage(
            error.response && error.response.data.message ? error.response.data.message : error.message,
            'topRight',
        );
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { token } = getState();
    try {
        await axiosInstance.delete(`/api/products/${productId}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        // console.log(data);
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
};

export const createReview = (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    try {
        const { token } = getState();
        const { data } = await axiosInstance.post(`/api/products/${productId}/reviews`, review, {
            headers: {
                Authorization: `${token}`,
            },
        });
        dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review });
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
