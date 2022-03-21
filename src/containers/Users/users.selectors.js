import { createSelector } from 'reselect';
import { find, sortBy } from 'lodash';
import { initialState } from './users.reducer';

const selectUsersDomain = state => state?.users || initialState;

const selectUsersList = createSelector(selectUsersDomain, substate => {
  return sortBy(substate.usersList, ['id']);
});

const selectAddModalVisible = createSelector(selectUsersDomain, substate => substate.addModalVisible);
const selectAddModalLoading = createSelector(selectUsersDomain, substate => substate.addModalLoading);

const selectModifyModalVisible = createSelector(selectUsersDomain, substate => substate.modifyModalVisible);
const selectModifyModalLoading = createSelector(selectUsersDomain, substate => substate.modifyModalLoading);

const makeSelectAccountId = createSelector(selectUsersDomain, substate => substate.userForm.accountId);
const makeSelectName = createSelector(selectUsersDomain, substate => substate.userForm.name);
const makeSelectEmail = createSelector(selectUsersDomain, substate => substate.userForm.email);
const makeSelectPassword = createSelector(selectUsersDomain, substate => substate.userForm.password);
const makeSelectPermissions = createSelector(selectUsersDomain, substate => substate.userForm.permissions);

const makeSelectUsersById = id =>
  createSelector(selectUsersList, usersList => {
    return find(usersList, { id: id });
  });

export {
  selectUsersDomain,
  selectUsersList,
  selectAddModalVisible,
  selectAddModalLoading,
  selectModifyModalVisible,
  selectModifyModalLoading,
  makeSelectAccountId,
  makeSelectName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectPermissions,
  makeSelectUsersById,
};
