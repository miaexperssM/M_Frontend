import produce from 'immer';
import {
  GET_RULES_REQUEST,
  GET_RULES_SUCCESS,
  GET_RULES_FAILURE,
  ADD_RULES_REQUEST,
  ADD_RULES_SUCCESS,
  ADD_RULES_FAILURE,
  MODIFY_RULES_REQUEST,
  MODIFY_RULES_SUCCESS,
  MODIFY_RULES_FAILURE,
} from './rules.constants';

export const initialState = {
  rulesList: [],
};

/* eslint-disable default-case, no-param-reassign */
const rulesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_RULES_SUCCESS:
        draft.rulesList = action.payload.data;
        break;
      case ADD_RULES_REQUEST:
        break;
      case ADD_RULES_SUCCESS:
        draft.rulesList.push(action.payload.data);
        break;
      case ADD_RULES_FAILURE:
        break;
      case MODIFY_RULES_REQUEST:
        break;
      case MODIFY_RULES_SUCCESS:
        const index = draft.rulesList.map(rule => rule.id).indexOf(action.payload.data.id);
        if (index > -1) {
          draft.rulesList.splice(index, 1);
          draft.rulesList.push(action.payload.data);
        }
        break;
      case MODIFY_RULES_FAILURE:
        break;
    }
  });

export default rulesReducer;
