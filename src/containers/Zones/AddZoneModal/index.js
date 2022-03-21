import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal, Input } from 'antd';

import {
  selectAddZoneModalVisible,
  selectAddZoneModalLoading,
  makeSelectTitle,
  makeSelectDescription,
  makeSelectPoints,
} from '../zones.selectors';
import {
  handleAddZoneModalCancelAction,
  onChangeTitleAction,
  onChangeDescriptionAction,
  onChangePointsAction,
  addZonesAction,
} from '../zones.actions';

function AddZoneModal(props) {
  return (
    <Modal
      title="AddZone"
      visible={props.addZoneModalVisible}
      onOk={props.addZone}
      confirmLoading={props.addZoneModalLoading}
      onCancel={props.handleAddZoneModalCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Title" onChange={props.onChangeTitle} value={props.title} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Description" onChange={props.onChangeDescription} value={props.description} />
      </div>
    </Modal>
  );
}

AddZoneModal.propTypes = {
  addZoneModalVisible: PropTypes.bool,
  addZoneModalLoading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  addZone: PropTypes.func,
  handleAddZoneModalCancel: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addZoneModalVisible: selectAddZoneModalVisible,
  addZoneModalLoading: selectAddZoneModalLoading,
  title: makeSelectTitle,
  description: makeSelectDescription,
  points: makeSelectPoints,
});

const mapDispatchToProps = dispatch => ({
  addZone: () => dispatch(addZonesAction()),
  handleAddZoneModalCancel: () => dispatch(handleAddZoneModalCancelAction()),
  onChangeTitle: e => dispatch(onChangeTitleAction(e.target.value)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e.target.value)),
  onChangePoints: e => dispatch(onChangePointsAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AddZoneModal);
