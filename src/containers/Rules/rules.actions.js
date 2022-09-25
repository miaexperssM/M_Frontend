import {
  GET_RULES_REQUEST,
  GET_RULES_FAILURE,
  GET_RULES_SUCCESS,
  ADD_RULES_REQUEST,
  ADD_RULES_SUCCESS,
  ADD_RULES_FAILURE,
  DEL_RULES_REQUEST,
  DEL_RULES_SUCCESS,
  DEL_RULES_FAILURE,
  MODIFY_RULES_REQUEST,
  MODIFY_RULES_SUCCESS,
  MODIFY_RULES_FAILURE,
} from './rules.constants';

export const getRulesAction = payload => ({ type: GET_RULES_REQUEST, payload });
export const getRulesSuccess = payload => ({ type: GET_RULES_SUCCESS, payload });
export const getRulesFailure = payload => ({ type: GET_RULES_FAILURE, payload });

export const addRulesAction = payload => ({ type: ADD_RULES_REQUEST, payload });
export const addRulesSuccess = payload => ({ type: ADD_RULES_SUCCESS, payload });
export const addRulesFailure = payload => ({ type: ADD_RULES_FAILURE, payload });

export const delRulesAction = payload => ({ type: DEL_RULES_REQUEST, payload });
export const delRulesSuccess = payload => ({ type: DEL_RULES_SUCCESS, payload });
export const delRulesFailure = payload => ({ type: DEL_RULES_FAILURE, payload });

export const modifyRulesAction = payload => ({ type: MODIFY_RULES_REQUEST, payload });
export const modifyRulesSuccess = payload => ({ type: MODIFY_RULES_SUCCESS, payload });
export const modifyRulesFailure = payload => ({ type: MODIFY_RULES_FAILURE, payload });
