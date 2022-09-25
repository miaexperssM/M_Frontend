import React, { useEffect, useState, memo } from 'react';
import { Modal, Input, Space, Select } from 'antd';
import { selectRulesList } from '../rules.selectors';
import { getZonesAPI } from 'containers/Zones/zones.api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const { Option } = Select;

function ModifyRuleModal(props) {
  const [comunaName, setComunaName] = useState('');
  const [zoneId, setZoneId] = useState(-1);
  const [zoneList, setZoneList] = useState([]);
  const [rule, setRule] = useState();

  const onComunaChange = e => {
    setComunaName(e.target.value);
  };

  const onZoneChange = key => {
    setZoneId(key);
  };

  const onUpsertRule = () => {
    if (props.rule) {
      const body = {
        id: rule.id,
        pickLevel: props.rule.pickLevel,
        port: props.rule.port,
        comunaName,
        zoneId,
      };
      props.handleOK(body);
    }
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
    if (props.isVisiable === true && props.rule) {
      init(props.rule.pickLevel);
      setRule(props.rule);
      setComunaName(props.rule.comunaName);
      setZoneId(props.rule.zoneId);
    } else {
      setComunaName('');
      setZoneId(-1);
    }
  }, [props.isVisiable, props.rule]);

  return (
    <Modal
      title={`Edit Rule in Level ${props.rule?.pickLevel || ''} at Port ${props.rule?.port || ''}`}
      visible={props.isVisiable}
      onOk={onUpsertRule}
      onCancel={props.handleCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Space direction="horizontal">
          <Input addonBefore={'Level'} value={props.rule?.pickLevel || ''} disabled />
          <Input addonBefore={'Port'} value={props.rule?.port || ''} disabled />
        </Space>
      </div>
      {props.rule?.pickLevel == 1 ? (
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

ModifyRuleModal.propTypes = {
  isVisible: PropTypes.bool,
  rule: PropTypes.object,
  handleCancel: PropTypes.func,
  handleOK: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  rulesList: selectRulesList,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(ModifyRuleModal);
