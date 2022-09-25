import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  getRulesAction,
  getRulesSuccess,
  getRulesFailure,
  addRulesFailure,
  addRulesSuccess,
  delRulesFailure,
  delRulesSuccess,
  modifyRulesSuccess,
  modifyRulesFailure,
} from './rules.actions';
import { GET_RULES_REQUEST, ADD_RULES_REQUEST, DEL_RULES_REQUEST, MODIFY_RULES_REQUEST } from './rules.constants';
import { postRulesAPI, putRulesAPI, delRulesAPI, getRulesByLevelAPI } from './rules.api';

export function* getRulesSaga({ payload: level }) {
  try {
    const levelRuleList = yield call(getRulesByLevelAPI, level);
    yield put(getRulesSuccess(levelRuleList));
  } catch (error) {
    yield put(getRulesFailure(error));
  }
}

export function* postRulesSaga({ payload: rule }) {
  try {
    const res = yield call(postRulesAPI, rule);
    yield put(addRulesSuccess(res));
  } catch (error) {
    yield put(addRulesFailure(error));
  }
}

export function* putRulesSaga({ payload: rule }) {
  try {
    const res = yield call(putRulesAPI, rule);
    yield put(modifyRulesSuccess(res));
  } catch (error) {
    yield put(modifyRulesFailure(error));
  }
}

export function* delRulesSaga({ payload: rule }) {
  try {
    const id = rule.id;
    yield call(delRulesAPI, { id });
    yield put(delRulesSuccess());
    yield put(getRulesAction(rule.pickLevel));
  } catch (error) {
    yield put(delRulesFailure(error));
  }
}

export default function* usersSaga() {
  yield takeLatest(GET_RULES_REQUEST, getRulesSaga);
  yield takeLatest(ADD_RULES_REQUEST, postRulesSaga);
  yield takeLatest(MODIFY_RULES_REQUEST, putRulesSaga);
  yield takeLatest(DEL_RULES_REQUEST, delRulesSaga);
}
