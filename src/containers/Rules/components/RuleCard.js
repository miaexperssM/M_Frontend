import React, { useEffect, useState } from 'react';
import { Card, Button, Popconfirm, Space } from 'antd';

export default function RuleCard(props) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const calculateStyle = () => {
    setTop(props.position.top);
    setLeft(props.position.left);
  };

  const onEdit = rule => {
    props.modifyRules(rule);
  };

  const onDelete = rule => {
    props.delRules(rule);
  };

  useEffect(() => {
    calculateStyle();
  }, []);

  return (
    <Card
      size="small"
      title={`Port ${props.position.id}`}
      style={{ position: 'absolute', top: top, left: left, width: 120, fontSize: 10 }}
      extra={
        <Button
          style={{
            height: 31,
            width: 31,
            paddingLeft: 5,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 5,
            borderRadius: 30,
          }}
          onClick={() => {
            props.setAddRulePort(props.position.id);
            props.setIsAddModalVisiable(true);
          }}
        >
          <p style={{ paddingLeft: 4, fontSize: 19, fontWeight: 'bold' }}>+</p>
        </Button>
      }
    >
      <Space direction="vertical">
        {props.rulesList
          .filter(rule => rule.port == props.position.id)
          .map(rule => {
            return (
              <Popconfirm
                key={rule.id}
                title={`Operation ${
                  rule.zoneId == -1
                    ? rule.comunaName
                    : props.zoneList?.find(zone => zone.id == rule.zoneId)?.title || ''
                }`}
                okText="Delete"
                cancelText="Edit"
                onConfirm={() => onDelete(rule)}
                onCancel={() => onEdit(rule)}
              >
                <a href="#">
                  {rule.zoneId == -1
                    ? rule.comunaName
                    : props.zoneList?.find(zone => zone.id == rule.zoneId)?.title || ''}
                </a>
              </Popconfirm>
            );
          })}
      </Space>
    </Card>
  );
}
