import { format } from "date-fns";
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
export const createBooking =
  (startDate, endDate, spotId, userId) => async (dispatch) => {
    const response = await csrfFetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startDate, endDate, spotId, userId }),
    });
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
const initialState = {};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING: {
      const newState = {
        ...state,
        [action.booking.id]: action.booking,
      };
      return newState;
    }
    case LOAD_BOOKINGS: {
      const newState = { ...state };
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
        newState[booking.id].startDate = format(new Date(newState[booking.id]?.startDate), 'EEE MMM dd y')
        newState[booking.id].endDate = format(new Date(newState[booking.id]?.endDate), 'EEE MMM dd y')
      });
      return newState;
    }
    case REMOVE_BOOKING: {
      const newState = { ...state };
      delete newState[action.booking.id];
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default bookingReducer;
