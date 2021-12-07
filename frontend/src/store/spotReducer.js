import { csrfFetch } from "./csrf";

const ADD_SPOT = "spot/addSpot";

//action creators
export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

//thunk creators
export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/host", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  const newSpot = await response.json();
  if (response.ok) {
    dispatch(addSpot(newSpot));
    return newSpot;
  }
};

//initial state && reducer
const initialState = { entries: {}, isLoading: true };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPOT:
      return {
        ...state,
        entries: { ...state.entries, [action.spot.id]: action.spot },
      };
    default:
      return state;
  }
};

export default spotReducer;
