import React, { useEffect, useState, memo } from 'react';
import { Modal, Input, Space, Select } from 'antd';
import { selectRulesList } from '../rules.selectors';
import { getZonesAPI } from 'containers/Zones/zones.api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const { Option } = Select;

function AddRuleModal(props) {
  const [comunaName, setComunaName] = useState('');
  const [zoneId, setZoneId] = useState(-1);
  const [zoneList, setZoneList] = useState([]);

  const onComunaChange = e => {
    setComunaName(e.target.value);
  };

  const onZoneChange = key => {
    setZoneId(key);
  };

  const onAddRule = () => {
    const body = {
      pickLevel: props.level,
      port: props.port,
      comunaName,
      zoneId,
    };
    props.handleOK(body);
  };

  const init = async level => {
    if (level == 2) {
      const res = await Promise.resolve(getZonesAPI());
      if (res.status == 200) {
        setZoneList(res.data);
      }
    }
  };

  useEffect(() => {
    if (props.isVisiable === true) {
      init(props.level);
    }
    setComunaName('');
    setZoneId(-1);
  }, [props.isVisiable]);

  return (
    <Modal
      title={`Add Rule in Level ${props.level} at Port ${props.port}`}
      visible={props.isVisiable}
      onOk={onAddRule}
      onCancel={props.handleCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Space direction="horizontal">
          <Input addonBefore={'Level'} value={props.level} disabled />
          <Input addonBefore={'Port'} value={props.port} disabled />
        </Space>
      </div>
      {props.level == 1 ? (
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore={'Comuna'} onChange={e => onComunaChange(e)} value={comunaName} />
        </div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={onZoneChange}
            optionFilterProp="children"
            value={zoneList.find(zone => zone.id == zoneId)?.title || ''}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {zoneList.map(zone => {
              return (
                <Option key={zone.id} value={zone.id} title={zone.title}>
                  {zone.title}
                </Option>
              );
            })}
          </Select>
        </div>
      )}
    </Modal>
  );
}

AddRuleModal.propTypes = {
  isVisible: PropTypes.bool,
  level: PropTypes.number,
  handleCancel: PropTypes.func,
  handleOK: PropTypes.func,
  port: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  rulesList: selectRulesList,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(AddRuleModal);
