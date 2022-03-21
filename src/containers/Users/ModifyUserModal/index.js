import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal, Input, Switch } from 'antd';

import {
  selectModifyModalVisible,
  selectModifyModalLoading,
  makeSelectAccountId,
  makeSelectName,
  makeSelectPassword,
  makeSelectEmail,
  makeSelectPermissions,
} from '../users.selectors';
import {
  handleModifyModalCancelAction,
  onChangeAccountIdAction,
  onChangeEmailAction,
  onChangePasswordAction,
  onChangeNameAction,
  onChangePermissionsAction,
  modifyUsersAction,
} from '../users.actions';
import { Admin, user } from 'utils/enum';

function ModifyUserModal(props) {
  return (
    <Modal
      title="ModifyUser"
      visible={props.modifyModalVisible}
      onOk={() => props.modifyUsers(props.modifyingId)}
      confirmLoading={props.modifyModalLoading}
      onCancel={props.handleModifyModalCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="AccountId" onChange={props.onChangeAccountId} value={props.accountId} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Name" onChange={props.onChangeName} value={props.name} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Email" onChange={props.onChangeEmail} value={props.email} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Password" onChange={props.onChangePassword} value={props.password} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Switch
          checkedChildren="Admin"
          unCheckedChildren="User"
          disabled={props.modifyingId === 1}
          checked={props.permissions === user ? false : true}
          onChange={props.onChangePermissions}
        />
      </div>
    </Modal>
  );
}

ModifyUserModal.propTypes = {
  modifyingId: PropTypes.number,
  modifyModalVisible: PropTypes.bool,
  modifyModalLoading: PropTypes.bool,
  accountId: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  permissions: PropTypes.string,
  modifyUsers: PropTypes.func,
  handleAddModalCancel: PropTypes.func,
  onChangeAccountId: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePermissions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  modifyModalVisible: selectModifyModalVisible,
  modifyModalLoading: selectModifyModalLoading,
  accountId: makeSelectAccountId,
  name: makeSelectName,
  email: makeSelectEmail,
  password: makeSelectPassword,
  permissions: makeSelectPermissions,
});

const mapDispatchToProps = dispatch => ({
  modifyUsers: id => dispatch(modifyUsersAction(id)),
  handleModifyModalCancel: () => dispatch(handleModifyModalCancelAction()),
  onChangeAccountId: e => dispatch(onChangeAccountIdAction(e.target.value)),
  onChangeName: e => dispatch(onChangeNameAction(e.target.value)),
  onChangeEmail: e => dispatch(onChangeEmailAction(e.target.value)),
  onChangePassword: e => dispatch(onChangePasswordAction(e.target.value)),
  onChangePermissions: e => dispatch(onChangePermissionsAction(e === true ? Admin : user)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ModifyUserModal);
