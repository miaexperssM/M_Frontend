import produce from 'immer';
import { ON_CHANGE_NAME, ON_CHANGE_EMAIL, ON_CHANGE_PASSWORD, ON_CHANGE_PERMISSIONS } from './signup.constants';

export const initialState = {
  signUpForm: {
    name: '',
    email: '',
    password: '',
    permissions:'Admin'
  },
};

/* eslint-disable default-case, no-param-reassign */
const signUpReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ON_CHANGE_NAME:
        draft.signUpForm.name = action.payload;
        break;
      case ON_CHANGE_EMAIL:
        draft.signUpForm.email = action.payload;
        break;
      case ON_CHANGE_PASSWORD:
        draft.signUpForm.password = action.payload;
        break;
      case ON_CHANGE_PERMISSIONS:
        draft.signUpForm.permissions = action.payload;
    }
  });

export default signUpReducer;
