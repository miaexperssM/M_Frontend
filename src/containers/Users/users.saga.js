import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  getUsersSuccess,
  getUsersFailure,
  addUsersFailure,
  addUsersSuccess,
  delUsersSuccess,
  delUsersFailure,
  getUsersAction,
  modifyUsersSuccess,
  modifyUsersFailure,
} from './users.actions';
import { GET_USERS_REQUEST, ADD_USERS_REQUEST, MODIFY_USERS_REQUEST, DEL_USERS_REQUEST } from './users.constants';
import { getUsersAPI, postUsersAPI, putUsersAPI, delUsersAPI } from './users.api';
import {
  makeSelectAccountId,
  makeSelectName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectPermissions,
} from './users.selectors';

export function* getUsersSaga() {
  try {
    const usersList = yield call(getUsersAPI);
    yield put(getUsersSuccess(usersList));
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

export function* postUsersSaga() {
  const accountId = yield select(makeSelectAccountId);
  const name = yield select(makeSelectName);
  const email = yield select(makeSelectEmail);
  const password = yield select(makeSelectPassword);
  const permissions = yield select(makeSelectPermissions);

  try {
    yield call(postUsersAPI, { accountId, name, email, password, permissions });
    yield put(addUsersSuccess());
    yield put(getUsersAction());
  } catch (error) {
    yield put(addUsersFailure(error));
  }
}

export function* putUsersSaga({ payload: id }) {
  const accountId = yield select(makeSelectAccountId);
  const name = yield select(makeSelectName);
  const email = yield select(makeSelectEmail);
  const password = yield select(makeSelectPassword);
  const permissions = yield select(makeSelectPermissions);

  try {
    yield call(putUsersAPI, { id, accountId, name, email, password, permissions });
    yield put(modifyUsersSuccess());
    yield put(getUsersAction());
  } catch (error) {
    yield put(modifyUsersFailure(error));
  }
}

export function* delUsersSaga({ payload: id }) {
  try {
    yield call(delUsersAPI, { id });
    yield put(delUsersSuccess());
    yield put(getUsersAction());
  } catch (error) {
    yield put(delUsersFailure(error));
  }
}

export default function* usersSaga() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ADD_USERS_REQUEST, postUsersSaga);
  yield takeLatest(MODIFY_USERS_REQUEST, putUsersSaga);
  yield takeLatest(DEL_USERS_REQUEST, delUsersSaga);
}
