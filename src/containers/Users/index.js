import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Button } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  delUsersAction,
  getUsersAction,
  handleAddModalShowAction,
  handleModifyModalShowAction,
  modifyUsersAction,
} from './users.actions';
import reducer from './users.reducer';
import saga from './users.saga';

import AddUserModal from './AddUserModal';
import ModifyUserModal from './ModifyUserModal';
import UsersTable from './UsersTable';

const key = 'users';

function Users(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.getUsers();
  }, []);

  const [modifyingId, setModifyingId] = React.useState(0);
  return (
    <>
      <Helmet>
        <title>Users List</title>
        <meta name="Users" content="Users List" />
      </Helmet>

      <div style={{ marginLeft: '40px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: 'x-large' }}> Users List </h1>
      </div>

      <Row>
        <Col span={24}>
          <UsersTable
            onModifyUser={props.handleModifyModalShow}
            setModifyingId={setModifyingId}
            delUsers={id => props.delUsers(id)}
          />
        </Col>
      </Row>

      <AddUserModal />
      <ModifyUserModal modifyingId={modifyingId} />
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={props.handleAddModalShow}>
          Add
        </Button>
      </div>
    </>
  );
}

Users.propTypes = {
  getUsers: PropTypes.func,
  handleAddModalShow: PropTypes.func,
  handleModifyModalShow: PropTypes.func,
  delUsers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersAction()),
  delUsers: id => dispatch(delUsersAction(id)),
  handleAddModalShow: () => dispatch(handleAddModalShowAction()),
  handleModifyModalShow: () => dispatch(handleModifyModalShowAction()),
  modifyUsers: id => dispatch(modifyUsersAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Users);
