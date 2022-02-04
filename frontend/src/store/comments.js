import { csrfFetch } from "./csrf";
const ADD_COMMENT = "comment/ADD_COMMENT";
const LOAD_COMMENTS = "comment/LOAD_COMMENTS";

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  payload: comments,
});

export const createComment = (comment, spotId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${spotId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({comment, userId}),
  });
  const newComment = await response.json();
  if (response.ok) {
    dispatch(addComment(newComment));
    return newComment;
  }
};

export const getComments = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${spotId}`);
  if (response.ok) {
    const loadedComments = await response.json();
    dispatch(loadComments(loadedComments));
    return loadedComments;
  }
};

export default function commentReducer(state = {}, action) {
  switch(action.type) {
    case ADD_COMMENT: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case LOAD_COMMENTS: {
      const newState = {}
      action.payload.forEach((comment, i) => {
        newState[comment.id] = comment;
      })
      return newState;
    }
    default: {
      return state;
    }
  }
}
