import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Button, Popconfirm } from 'antd';
import { selectUsersList } from '../users.selectors';
import {
  handleModifyModalCancelAction,
  onChangeAccountIdAction,
  onChangeEmailAction,
  onChangePasswordAction,
  onChangeNameAction,
  modifyUsersAction,
  onChangePermissionsAction,
  delUsersAction,
} from '../users.actions';
import { makeSelectUser } from 'global.selectors';

import { Admin, user } from 'utils/enum';

function UsersTable(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */
  const columns = [
    {
      title: 'AccountId',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    { title: 'Permission', dataIndex: 'permissions', key: 'permissions' },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (value, record) => renderEditButton(value, record),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (value, record) => renderDeleteButton(value, record),
    },
  ];

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  const renderEditButton = (value, record) => {
    return <Button onClick={() => renderEditModal(value, record)}>Edit</Button>;
  };

  const renderDeleteButton = (value, record) => {
    return (
      <Popconfirm
        title="Are you sure to delete this user?"
        onConfirm={() => handleDelete(record.id)}
        okText="Yes"
        cancelText="No"
        disabled={record.permissions !== user || props.user.permissions !== Admin}
      >
        <Button disabled={record.permissions !== user || props.user.permissions !== Admin}>Delete</Button>
      </Popconfirm>
    );
  };

  const handleDelete = id => {
    props.delUsers(id);
  };

  const renderEditModal = (value, record) => {
    props.onModifyUser();
    props.setModifyingId(record.id);
    props.onChangeAccountId(record.accountId);
    props.onChangeEmail(record.email);
    props.onChangeName(record.name);
    props.onChangePermissions(record.permissions);
  };

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return <Table dataSource={props.usersList} columns={columns} />;
}

UsersTable.propTypes = {
  usersList: PropTypes.array,
  onDeleteUser: PropTypes.func,
  onModifyModalShow: PropTypes.func,
  onChangeAccountId: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePermissions: PropTypes.func,
  setModifyingId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  usersList: selectUsersList,
});

const mapDispatchToProps = dispatch => ({
  modifyUsers: id => dispatch(modifyUsersAction(id)),
  onDeleteUser: id => dispatch(delUsersAction(id)),
  handleModifyModalCancel: () => dispatch(handleModifyModalCancelAction()),
  onChangeAccountId: e => dispatch(onChangeAccountIdAction(e)),
  onChangeName: e => dispatch(onChangeNameAction(e)),
  onChangeEmail: e => dispatch(onChangeEmailAction(e)),
  onChangePassword: e => dispatch(onChangePasswordAction(e)),
  onChangePermissions: e => dispatch(onChangePermissionsAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UsersTable);
