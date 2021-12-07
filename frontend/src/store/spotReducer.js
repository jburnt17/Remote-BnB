import { csrfFetch } from "./csrf";

const ADD_SPOT = "spot/addSpot";
const LOAD_SPOTS = "spot/loadSpots";
const REMOVE_SPOT = "spot/removeSpot";

//action creators
export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
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

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  dispatch(loadSpots(spots));
  return spots;
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(removeSpot(spot.id));
  }
};

//initial state && reducer
const initialState = { entries: {}, isLoading: true };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const newState = { ...state, entries: {} };
      action.spots.forEach((spot) => {
        newState.entries[spot.id] = spot;
      });
      return newState;
    case ADD_SPOT:
      return {
        ...state,
        entries: { ...state.entries, [action.spot.id]: action.spot },
      };
    case REMOVE_SPOT:
      const nState = { ...state };
      delete nState[action.spotId];
      return nState;
    default:
      return state;
  }
};

export default spotReducer;
