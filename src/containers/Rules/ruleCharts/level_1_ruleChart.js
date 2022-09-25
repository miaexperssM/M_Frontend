import React, { useState } from 'react';
import AddRuleModal from '../components/AddRuleModal';
import ModifyRuleModal from '../components/ModifyRuleModal';
import RuleCard from '../components/RuleCard';

export default function Level_1_RuleChart(props) {
  const [isAddModalVisiable, setIsAddModalVisiable] = useState(false);
  const [isEditModalVisiable, setIsEditModalVisiable] = useState(false);
  const [currentPort, setCurrentPort] = useState(0);
  const [editRule, setEditRule] = useState();

  const onAddRuleOK = rule => {
    props.addRules(rule);
    setIsAddModalVisiable(false);
  };

  const onEditRuleOK = rule => {
    props.modifyRules(rule);
    setIsEditModalVisiable(false);
  };

  const onModifyDisplay = rule => {
    setEditRule(rule);
    setIsEditModalVisiable(true);
  };

  const positionList = [
    { id: 1, top: '90%', left: '60%' },
    { id: 2, top: '54%', left: '80%' },
    { id: 3, top: '77%', left: '46%' },
    { id: 4, top: '43%', left: '70%' },
    { id: 5, top: '63%', left: '33%' },
    { id: 6, top: '32%', left: '60%' },
    { id: 7, top: '49%', left: '21%' },
    { id: 8, top: '21%', left: '50%' },
    { id: 9, top: '28%', left: '12%' },
    { id: 10, top: '10%', left: '43%' },
    { id: 11, top: '8%', left: '5%' },
    { id: 12, top: '75%', left: '89%' },
  ];

  return (
    <div>
      <div>
        <div style={{ position: 'absolute', width: 1200, height: 700 }}>
          <img
            src="./Port_distribution.png"
            width="1200"
            height="700"
            style={{ paddingLeft: 200, paddingRight: 100 }}
          />
          {positionList.map(position => {
            return (
              <RuleCard
                key={position.id}
                levle={1}
                position={position}
                setAddRulePort={setCurrentPort}
                setIsAddModalVisiable={setIsAddModalVisiable}
                rulesList={props.rulesList}
                modifyRules={onModifyDisplay}
                delRules={props.delRules}
              ></RuleCard>
            );
          })}
        </div>
      </div>
      <AddRuleModal
        isVisiable={isAddModalVisiable}
        level={1}
        port={currentPort}
        handleCancel={() => setIsAddModalVisiable(false)}
        handleOK={onAddRuleOK}
      />
      <ModifyRuleModal
        isVisiable={isEditModalVisiable}
        rule={editRule}
        handleCancel={() => setIsEditModalVisiable(false)}
        handleOK={onEditRuleOK}
      />
    </div>
  );
}
