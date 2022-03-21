import produce from 'immer';
import { find } from 'lodash';
import { user } from 'utils/enum';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  ADD_USERS_REQUEST,
  ADD_USERS_SUCCESS,
  ADD_USERS_FAILURE,
  DEL_USERS_REQUEST,
  DEL_USERS_SUCCESS,
  DEL_USERS_FAILURE,
  MODIFY_USERS_REQUEST,
  MODIFY_USERS_SUCCESS,
  MODIFY_USERS_FAILURE,
  HANDLE_ADD_MODAL_SHOW,
  HANDLE_ADD_MODAL_CANCEL,
  HANDLE_MODIFY_MODAL_SHOW,
  HANDLE_MODIFY_MODAL_CANCEL,
  ON_CHANGE_ACCOUNTID,
  ON_CHANGE_NAME,
  ON_CHANGE_EMAIL,
  ON_CHANGE_PASSWORD,
  ON_CHANGE_PERMISSIONS,
} from './users.constants';

export const initialState = {
  usersList: [],
  addModalVisible: false,
  addModalLoading: false,
  modifyModalVisible: false,
  modifyModalLoading: false,
  userForm: {
    accountId: '',
    name: '',
    email: '',
    password: '',
    permissions: user,
  },
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
        draft.usersList = action.payload.data;
        break;
      case ADD_USERS_REQUEST:
        draft.addModalLoading = true;
        break;
      case ADD_USERS_SUCCESS:
        draft.addModalLoading = false;
        draft.addModalVisible = false;
        draft.userForm = {
          accountId: '',
          name: '',
          email: '',
          password: '',
          permissions: user,
        };
        break;
      case ADD_USERS_FAILURE:
        draft.addModalLoading = false;
        break;
      case MODIFY_USERS_REQUEST:
        draft.modifyModalLoading = true;
        break;
      case MODIFY_USERS_SUCCESS:
        draft.modifyModalLoading = false;
        draft.modifyModalVisible = false;
        draft.userForm = {
          accountId: '',
          name: '',
          email: '',
          password: '',
          permissions: user,
        };
        break;
      case MODIFY_USERS_FAILURE:
        draft.modifyModalLoading = false;
      case HANDLE_ADD_MODAL_SHOW:
        draft.addModalVisible = true;
        break;
      case HANDLE_ADD_MODAL_CANCEL:
        draft.addModalLoading = false;
        draft.addModalVisible = false;
        draft.userForm = {
          accountId: '',
          name: '',
          email: '',
          password: '',
          permissions: user,
        };
        break;
      case HANDLE_MODIFY_MODAL_SHOW:
        draft.modifyModalVisible = true;
        break;
      case HANDLE_MODIFY_MODAL_CANCEL:
        draft.modifyModalLoading = false;
        draft.modifyModalVisible = false;
        draft.userForm = {
          accountId: '',
          name: '',
          email: '',
          password: '',
          permissions: user,
        };
        break;
      case ON_CHANGE_ACCOUNTID:
        draft.userForm.accountId = action.payload;
        break;
      case ON_CHANGE_NAME:
        draft.userForm.name = action.payload;
        break;
      case ON_CHANGE_EMAIL:
        draft.userForm.email = action.payload;
        break;
      case ON_CHANGE_PASSWORD:
        draft.userForm.password = action.payload;
        break;
      case ON_CHANGE_PERMISSIONS:
        draft.userForm.permissions = action.payload;
        break;
    }
  });

export default usersReducer;
