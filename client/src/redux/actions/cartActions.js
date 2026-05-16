import { setLoading, setError, cartItemAdd, cartItemRemoval, setExpressShipping, clearCart } from '../slices/cart';
import FIXTURE_PRODUCTS from '../../data/fixtureProducts';

// Portfolio mode: resolve product details from the same fixture the products slice uses
// so add-to-cart works without a backend.
export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  const data = FIXTURE_PRODUCTS.find((p) => p._id === id);
  if (!data) {
    dispatch(setError(`Product "${id}" not found.`));
    return;
  }
  dispatch(cartItemAdd({
    id: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    stock: data.stock,
    qty,
  }));
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
}

export const setExpress = (value) => async (dispatch) => {
  dispatch(setExpressShipping(value));
};

export const resetCart = () => (dispatch) => {
  dispatch(clearCart());
}