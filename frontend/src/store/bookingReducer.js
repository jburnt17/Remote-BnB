import { csrfFetch } from "./csrf";

const ADD_BOOKING = "/booking/addBooking";
const LOAD_BOOKINGS = "/booking/loadBookings";
const REMOVE_BOOKING = "/booking/removeBooking";

//action creators
export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking,
});

export const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings,
});

export const removeBooking = (booking) => ({
  type: REMOVE_BOOKING,
  booking,
});

//thunks
export const createBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  console.log("in thunk");
  const newBooking = await response.json();
  if (response.ok) {
    dispatch(addBooking(newBooking));
    return newBooking;
  }
};

export const getBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings");
  const bookings = await response.json();
  dispatch(loadBookings(bookings));
  return bookings;
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(removeBooking(booking));
  }
};

//initial state && reducer
const initialState = { entries: {} };

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING: {
      const newState = {
        ...state,
        entries: { [action.booking.id]: action.booking },
      };
      return newState;
    }
    case LOAD_BOOKINGS: {
      const newState = { ...state, entries: {} };
      action.bookings.forEach((booking) => {
        newState.entries[booking.id] = booking;
      });
      return newState;
    }
    case REMOVE_BOOKING: {
      const newState = { ...state };
      delete newState.entries[action.booking.id];
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default bookingReducer;
