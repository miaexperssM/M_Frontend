import { createSelector } from 'reselect';
import { find, sortBy } from 'lodash';
import { initialState } from './zones.reducer';

const selectZonesDomain = state => state?.zones || initialState;

const selectZonesList = createSelector(selectZonesDomain, substate => {
  return sortBy(substate.zonesList, ['id']);
});

const selectAddZoneModalVisible = createSelector(selectZonesDomain, substate => substate.addZoneModalVisible);
const selectAddZoneModalLoading = createSelector(selectZonesDomain, substate => substate.addZoneModalLoading);

const selectModifyZoneModalVisible = createSelector(selectZonesDomain, substate => substate.modifyZoneModalVisible);
const selectModifyZoneModalLoading = createSelector(selectZonesDomain, substate => substate.modifyZoneModalLoading);

const makeSelectTitle = createSelector(selectZonesDomain, substate => substate.zoneForm.title);
const makeSelectDescription = createSelector(selectZonesDomain, substate => substate.zoneForm.description);
const makeSelectPoints = createSelector(selectZonesDomain, substate => substate.zoneForm.points);

const makeSelectZonesById = id =>
  createSelector(selectZonesList, zonesList => {
    return find(zonesList, { id: id });
  });

export {
  selectZonesDomain,
  selectZonesList,
  selectAddZoneModalVisible,
  selectAddZoneModalLoading,
  selectModifyZoneModalVisible,
  selectModifyZoneModalLoading,
  makeSelectTitle,
  makeSelectDescription,
  makeSelectPoints,
  makeSelectZonesById,
};
