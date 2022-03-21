import produce from 'immer';
import { find } from 'lodash';
import {
  GET_ZONES_REQUEST,
  GET_ZONES_SUCCESS,
  GET_ZONES_FAILURE,
  ADD_ZONES_REQUEST,
  ADD_ZONES_SUCCESS,
  ADD_ZONES_FAILURE,
  MODIFY_ZONES_REQUEST,
  MODIFY_ZONES_SUCCESS,
  MODIFY_ZONES_FAILURE,
  HANDLE_ADD_ZONE_MODAL_SHOW,
  HANDLE_ADD_ZONE_MODAL_CANCEL,
  HANDLE_MODIFY_ZONE_MODAL_SHOW,
  HANDLE_MODIFY_ZONE_MODAL_CANCEL,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_TITLE,
  ON_CHANGE_POINTS,
} from './zones.constants';

export const initialState = {
  zonesList: [],
  addZoneModalVisible: false,
  addZoneModalLoading: false,
  modifyZoneModalVisible: false,
  modifyZoneModalLoading: false,
  zoneForm: {
    title: '',
    description: '',
    points: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const zonesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ZONES_SUCCESS:
        draft.zonesList = action.payload.data;
        break;
      case ADD_ZONES_REQUEST:
        draft.addZoneModalLoading = true;
        break;
      case ADD_ZONES_SUCCESS:
        draft.addZoneModalLoading = false;
        draft.addZoneModalVisible = false;
        draft.zoneForm = {
          title: '',
          description: '',
          points: [],
        };
        break;
      case ADD_ZONES_FAILURE:
        draft.addZoneModalLoading = false;
        break;
      case MODIFY_ZONES_REQUEST:
        draft.modifyZoneModalLoading = true;
        break;
      case MODIFY_ZONES_SUCCESS:
        draft.modifyZoneModalLoading = false;
        draft.modifyZoneModalVisible = false;
        draft.zoneForm = {
          title: '',
          description: '',
          points: [],
        };
        break;
      case MODIFY_ZONES_FAILURE:
        draft.modifyZoneModalLoading = false;
      case HANDLE_ADD_ZONE_MODAL_SHOW:
        draft.addZoneModalVisible = true;
        break;
      case HANDLE_ADD_ZONE_MODAL_CANCEL:
        draft.addZoneModalLoading = false;
        draft.addZoneModalVisible = false;
        draft.zoneForm = {
          title: '',
          description: '',
          points: [],
        };
        break;
      case HANDLE_MODIFY_ZONE_MODAL_SHOW:
        draft.modifyZoneModalVisible = true;
        break;
      case HANDLE_MODIFY_ZONE_MODAL_CANCEL:
        draft.modifyZoneModalLoading = false;
        draft.modifyZoneModalVisible = false;
        draft.zoneForm = {
          title: '',
          description: '',
          points: [],
        };
        break;
      case ON_CHANGE_TITLE:
        draft.zoneForm.title = action.payload;
        break;
      case ON_CHANGE_DESCRIPTION:
        draft.zoneForm.description = action.payload;
        break;
      case ON_CHANGE_POINTS:
        draft.zoneForm.points = action.payload;
        break;
    }
  });

export default zonesReducer;
