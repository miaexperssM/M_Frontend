import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Popconfirm, Button } from 'antd';
import { selectZonesList } from '../zones.selectors';
import { makeSelectUser } from 'global.selectors';
import {
  handleModifyZoneModalCancelAction,
  onChangeDescriptionAction,
  onChangeTitleAction,
  onChangePointsAction,
  modifyZonesAction,
  delZonesAction,
} from '../zones.actions';
import { Admin } from 'utils/enum';
import { calCenter } from 'utils/calCenter';

function ZonesTable(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (value, record) => renderViewButton(value, record),
    },
    ,
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
  const renderViewButton = (value, record) => {
    return <Button onClick={() => handelView(value, record)}>View</Button>;
  };
  const handelView = (value, record) => {
    props.setLatitude(record.points[0].lat);
    props.setLongtidue(record.points[0].lng);
    setTimeout(() => {
      props.onCoordsSearch(12, calCenter(record.points) || { lng: record.points[0].lng, lat: record.points[0].lat });
      props.setTabsKey('1');
    }, 50);
  };

  const renderEditModal = (value, record) => {
    props.onModifyZones();
    props.setModifyingId(record.id);
    props.onChangeTitle(record.title);
    props.onChangeDescription(record.description);
    props.onChangePoints(record.points);
  };

  const renderDeleteButton = (value, record) => {
    return (
      <Popconfirm
        title="Are you sure to delete this zone?"
        onConfirm={() => handleDelete(record.id)}
        okText="Yes"
        cancelText="No"
        disabled={props.user.permissions !== Admin}
      >
        <Button disabled={props.user.permissions !== Admin}>Delete</Button>
      </Popconfirm>
    );
  };

  const handleDelete = id => {
    props.delZones(id);
  };

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return <Table dataSource={props.zonesList} columns={columns} />;
}

ZonesTable.propTypes = {
  zonesList: PropTypes.array,
  onModifyZoneModalShow: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangePoints: PropTypes.func,
  setModifyingId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  zonesList: selectZonesList,
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  modifyZones: id => dispatch(modifyZonesAction(id)),
  handleModifyZoneModalCancel: () => dispatch(handleModifyZoneModalCancelAction()),
  onChangeTitle: e => dispatch(onChangeTitleAction(e)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e)),
  onChangePoints: e => dispatch(onChangePointsAction(e)),
  delZones: id => dispatch(delZonesAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ZonesTable);
