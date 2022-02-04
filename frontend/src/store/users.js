import { csrfFetch } from "./csrf";

const GET_USERS = "users/getUsers";

const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});

export const fetchUsers = () => async (dispatch) => {
  const response = await csrfFetch("/api/users");
  if (response.ok) {
    const users = await response.json();
    dispatch(getUsers(users));
    return users;
  }
};

const initialState = {};
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      const newState = { ...state };
      action.payload.forEach((person, i) => {
        newState[i] = person;
      });
      return newState;
    }
    default: {
      return state;
    }
  }
};
