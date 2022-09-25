import { createSelector } from 'reselect';
import { find, sortBy } from 'lodash';
import { initialState } from './rules.reducer';

const selectRulesDomain = state => state?.rules || initialState;

const selectRulesList = createSelector(selectRulesDomain, substate => {
  return sortBy(substate.rulesList, ['id']);
});

const makeSelectRulesById = id =>
  createSelector(selectRulesList, rulesList => {
    return find(rulesList, { id: id });
  });

export { selectRulesDomain, selectRulesList, makeSelectRulesById };
