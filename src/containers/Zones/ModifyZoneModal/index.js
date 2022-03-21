import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal, Input } from 'antd';

import {
  selectModifyZoneModalVisible,
  selectModifyZoneModalLoading,
  makeSelectTitle,
  makeSelectDescription,
} from '../zones.selectors';
import {
  handleModifyZoneModalCancelAction,
  onChangeTitleAction,
  onChangeDescriptionAction,
  modifyZonesAction,
} from '../zones.actions';

function ModifyZoneModal(props) {
  React.useEffect(() => {
    console.log('modifyingId', props.modifyingId);
  }, [props.modifyingId]);
  return (
    <Modal
      title="ModifyZone"
      visible={props.modifyZoneModalVisible}
      onOk={() => props.modifyZones(props.modifyingId)}
      confirmLoading={props.modifyZoneModalLoading}
      onCancel={props.handleModifyZoneModalCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Title" onChange={props.onChangeTitle} value={props.title} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Description" onChange={props.onChangeDescription} value={props.descrpiton} />
      </div>
    </Modal>
  );
}

ModifyZoneModal.propTypes = {
  modifyingId: PropTypes.number,
  modifyZoneModalVisible: PropTypes.bool,
  modifyZoneModalLoading: PropTypes.bool,
  title: PropTypes.string,
  descrpiton: PropTypes.string,

  modifyZones: PropTypes.func,
  handleModifyZoneModalCancel: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  modifyZoneModalVisible: selectModifyZoneModalVisible,
  modifyZoneModalLoading: selectModifyZoneModalLoading,
  title: makeSelectTitle,
  descrpiton: makeSelectDescription,
});

const mapDispatchToProps = dispatch => ({
  modifyZones: id => dispatch(modifyZonesAction(id)),
  handleModifyZoneModalCancel: () => dispatch(handleModifyZoneModalCancelAction()),
  onChangeTitle: e => dispatch(onChangeTitleAction(e.target.value)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e.target.value)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ModifyZoneModal);
