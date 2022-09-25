import React, { useState } from 'react';
import AddRuleModal from '../components/AddRuleModal';
import { Button } from 'antd';

export default function Level_2_RuleChart() {
  const [isAddModalVisiable, setIsAddModalVisiable] = useState(false);
  return (
    <div>
      <div style={{ height: 600, width: 800 }} className="baseImg">
        <img src="./Port_distribution.png" />
        <Button onClick={() => setIsAddModalVisiable(true)}>Add</Button>
      </div>
      <AddRuleModal
        isVisiable={isAddModalVisiable}
        level={2}
        rule={{ port: 1 }}
        handleCancel={() => setIsAddModalVisiable(false)}
      />
    </div>
  );
}
