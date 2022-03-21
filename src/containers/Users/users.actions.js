import {
  GET_USERS_REQUEST,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
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

export const getUsersAction = payload => ({ type: GET_USERS_REQUEST, payload });
export const getUsersSuccess = payload => ({ type: GET_USERS_SUCCESS, payload });
export const getUsersFailure = payload => ({ type: GET_USERS_FAILURE, payload });

export const addUsersAction = payload => ({ type: ADD_USERS_REQUEST, payload });
export const addUsersSuccess = payload => ({ type: ADD_USERS_SUCCESS, payload });
export const addUsersFailure = payload => ({ type: ADD_USERS_FAILURE, payload });

export const delUsersAction = payload => ({ type: DEL_USERS_REQUEST, payload });
export const delUsersSuccess = payload => ({ type: DEL_USERS_SUCCESS, payload });
export const delUsersFailure = payload => ({ type: DEL_USERS_FAILURE, payload });

export const modifyUsersAction = payload => ({ type: MODIFY_USERS_REQUEST, payload });
export const modifyUsersSuccess = payload => ({ type: MODIFY_USERS_SUCCESS, payload });
export const modifyUsersFailure = payload => ({ type: MODIFY_USERS_FAILURE, payload });

export const handleAddModalShowAction = payload => ({ type: HANDLE_ADD_MODAL_SHOW, payload });
export const handleAddModalCancelAction = payload => ({ type: HANDLE_ADD_MODAL_CANCEL, payload });

export const handleModifyModalShowAction = payload => ({ type: HANDLE_MODIFY_MODAL_SHOW, payload });
export const handleModifyModalCancelAction = payload => ({ type: HANDLE_MODIFY_MODAL_CANCEL, payload });

export const onChangeAccountIdAction = payload => ({ type: ON_CHANGE_ACCOUNTID, payload });
export const onChangeNameAction = payload => ({ type: ON_CHANGE_NAME, payload });
export const onChangeEmailAction = payload => ({ type: ON_CHANGE_EMAIL, payload });
export const onChangePasswordAction = payload => ({ type: ON_CHANGE_PASSWORD, payload });
export const onChangePermissionsAction = payload => ({ type: ON_CHANGE_PERMISSIONS, payload });
