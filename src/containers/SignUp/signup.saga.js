import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { POST_SIGN_UP_REQUEST } from './signup.constants';
import { postSignUpAPI } from './signup.api';
import { postSignUpSuccess, postSignUpFailure } from './signup.actions';
import { makeSelectName, makeSelectEmail, makeSelectPassword, makeSelectPermissions } from './signup.selectors';

export function* postSignUpSaga() {
  const name = yield select(makeSelectName());
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const permissions = yield select(makeSelectPermissions());

  try {
    const user = yield call(postSignUpAPI, { name, email, password, permissions });

    yield put(postSignUpSuccess(user));
    yield put(push('/'));
  } catch (error) {
    yield put(postSignUpFailure(error));
  }
}

export default function* signUpSaga() {
  yield takeLatest(POST_SIGN_UP_REQUEST, postSignUpSaga);
}
