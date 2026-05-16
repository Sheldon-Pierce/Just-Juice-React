import axios from 'axios';

import {
  setProducts,
  setLoading,
  setError,
  setProduct,
  productReviewed,
  resetError,
} from '../slices/products';
import FIXTURE_PRODUCTS from '../../data/fixtureProducts';

// Portfolio mode: products are served from a static client-side fixture so the site
// renders without a running Mongo + Express backend. A tiny artificial delay keeps the
// loading spinner momentarily visible — matches what a real fetch would feel like.
const FIXTURE_DELAY_MS = 120;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  await delay(FIXTURE_DELAY_MS);
  dispatch(setProducts(FIXTURE_PRODUCTS));
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await delay(FIXTURE_DELAY_MS);
  const found = FIXTURE_PRODUCTS.find((p) => p._id === id);
  if (found) {
    dispatch(setProduct(found));
  } else {
    dispatch(setError(`Product "${id}" not found.`));
  }
};

export const createProductReview =
  (productId, userId, comment, rating, title) => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `/api/products/reviews/${productId}`,
        { comment, userId, rating, title },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(productReviewed());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
    }
  };

export const resetProductError = () => async (dispatch) => {
  dispatch(resetError())
  }
