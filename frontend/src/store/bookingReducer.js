import { csrfFetch } from "./csrf";

const ADD_BOOKING = "/booking/addBooking";

//action creators
export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking,
});

//thunks
export const createBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  console.log('in thunk')
  const newBooking = await response.json();
  if (response.ok) {
    dispatch(addBooking(newBooking));
    return newBooking;
  }
};

//initial state && reducer
const initialState = { entries: {} };

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING: {
      // return {
      //   ...state,
      //   [action.booking.id]: action.booking,
      // };
      const newState = {
        ...state,
        entries: { [action.booking.id]: action.booking },
      };
      console.log(action.booking);
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default bookingReducer;
