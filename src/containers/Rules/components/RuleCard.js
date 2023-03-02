import React, { useEffect, useState } from 'react';
import { Card, Button, Popconfirm, Divider, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

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
      style={{ position: 'absolute', top: top, left: left, width: 150, fontSize: 10, maxHeight: 300 }}
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
      <div
        id="scrollableDiv"
        style={{
          maxHeight: 230,
          overflow: 'auto',
          padding: '0',
        }}
      >
        <InfiniteScroll
          dataLength={props.rulesList.filter(rule => rule.port == props.position.id).length}
          scrollableTarget="scrollableDiv"
        >
          <List
            locale={{ emptyText: 'No Data' }}
            dataSource={props.rulesList.filter(rule => rule.port == props.position.id)}
            renderItem={rule => (
              <List.Item key={rule.id}>
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
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Card>
  );
}
