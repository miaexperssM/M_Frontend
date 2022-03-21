import {
  POST_SIGN_UP_REQUEST,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FAILURE,
  ON_CHANGE_NAME,
  ON_CHANGE_EMAIL,
  ON_CHANGE_PASSWORD,
  ON_CHANGE_PERMISSIONS,
} from './signup.constants';

export const postSignUpAction = payload => ({ type: POST_SIGN_UP_REQUEST, payload });
export const postSignUpSuccess = payload => ({ type: POST_SIGN_UP_SUCCESS, payload });
export const postSignUpFailure = payload => ({ type: POST_SIGN_UP_FAILURE, payload });

export const onChangeNameAction = payload => ({ type: ON_CHANGE_NAME, payload });
export const onChangeEmailAction = payload => ({ type: ON_CHANGE_EMAIL, payload });
export const onChangePasswordAction = payload => ({ type: ON_CHANGE_PASSWORD, payload });
export const onChangePermissionsAction = payload => ({ type: ON_CHANGE_PERMISSIONS, payload });
