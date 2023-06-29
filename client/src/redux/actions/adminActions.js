import axios from 'axios';
import { getUsers, userDelete, resetError, setError } from '../slices/admin';

export const getAllUsers = () => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get('api/users', config);
    dispatch(getUsers(data));
  } catch (error) {
    // eslint-disable-next-line no-undef
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Users could not be fetched.'
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();
  
    try {
      const config = {
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.delete(`api/users/${id}`, config);
      dispatch(userDelete(data));
    } catch (error) {
      // eslint-disable-next-line no-undef
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'Users could not be fetched.'
        )
      );
    }
  };

  export const resetErrorAndRemoval = () => async(dispatch) => {
    dispatch(resetError());
  };