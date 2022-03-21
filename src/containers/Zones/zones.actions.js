import {
  GET_ZONES_REQUEST,
  GET_ZONES_FAILURE,
  GET_ZONES_SUCCESS,
  ADD_ZONES_REQUEST,
  ADD_ZONES_SUCCESS,
  ADD_ZONES_FAILURE,
  DEL_ZONES_REQUEST,
  DEL_ZONES_SUCCESS,
  DEL_ZONES_FAILURE,
  MODIFY_ZONES_REQUEST,
  MODIFY_ZONES_SUCCESS,
  MODIFY_ZONES_FAILURE,
  HANDLE_ADD_ZONE_MODAL_SHOW,
  HANDLE_ADD_ZONE_MODAL_CANCEL,
  HANDLE_MODIFY_ZONE_MODAL_SHOW,
  HANDLE_MODIFY_ZONE_MODAL_CANCEL,
  ON_CHANGE_TITLE,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_POINTS,
} from './zones.constants';

export const getZonesAction = payload => ({ type: GET_ZONES_REQUEST, payload });
export const getZonesSuccess = payload => ({ type: GET_ZONES_SUCCESS, payload });
export const getZonesFailure = payload => ({ type: GET_ZONES_FAILURE, payload });

export const addZonesAction = payload => ({ type: ADD_ZONES_REQUEST, payload });
export const addZonesSuccess = payload => ({ type: ADD_ZONES_SUCCESS, payload });
export const addZonesFailure = payload => ({ type: ADD_ZONES_FAILURE, payload });

export const delZonesAction = payload => ({ type: DEL_ZONES_REQUEST, payload });
export const delZonesSuccess = payload => ({ type: DEL_ZONES_SUCCESS, payload });
export const delZonesFailure = payload => ({ type: DEL_ZONES_FAILURE, payload });

export const modifyZonesAction = payload => ({ type: MODIFY_ZONES_REQUEST, payload });
export const modifyZonesSuccess = payload => ({ type: MODIFY_ZONES_SUCCESS, payload });
export const modifyZonesFailure = payload => ({ type: MODIFY_ZONES_FAILURE, payload });

export const handleAddZoneModalShowAction = payload => ({ type: HANDLE_ADD_ZONE_MODAL_SHOW, payload });
export const handleAddZoneModalCancelAction = payload => ({ type: HANDLE_ADD_ZONE_MODAL_CANCEL, payload });

export const handleModifyZoneModalShowAction = payload => ({ type: HANDLE_MODIFY_ZONE_MODAL_SHOW, payload });
export const handleModifyZoneModalCancelAction = payload => ({ type: HANDLE_MODIFY_ZONE_MODAL_CANCEL, payload });

export const onChangeTitleAction = payload => ({ type: ON_CHANGE_TITLE, payload });
export const onChangeDescriptionAction = payload => ({ type: ON_CHANGE_DESCRIPTION, payload });
export const onChangePointsAction = payload => ({ type: ON_CHANGE_POINTS, payload });
