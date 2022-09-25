import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Tabs } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectUser } from 'global.selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { getRulesAction, addRulesAction, delRulesAction, modifyRulesAction } from './rules.actions';
import { selectRulesList } from './rules.selectors';
import reducer from './rules.reducer';
import saga from './rules.saga';
import Level_1_RuleChart from './ruleCharts/level_1_ruleChart';
import Level_2_RuleChart from './ruleCharts/level_2_ruleChart';
import Level_3_RuleChart from './ruleCharts/level_3_ruleChart';

const key = 'rules';

function Rules(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [levelRules, setLevelRules] = useState([]);
  const [tabsKey, setTabsKey] = React.useState('1');

  useEffect(() => {
    props.getRules(tabsKey);
  }, [tabsKey]);

  useEffect(() => {
    setLevelRules(props.rulesList);
  }, [props.rulesList]);

  const { TabPane } = Tabs;

  return (
    <>
      <Helmet>
        <title>Picking Rules List</title>
        <meta name="Rules" content="Rule List" />
      </Helmet>

      <div style={{ marginLeft: '40px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: 'x-large' }}> Picking Rules List </h1>
      </div>
      <Tabs activeKey={tabsKey} onTabClick={setTabsKey}>
        <TabPane tab="Level 1" key="1" style={{ width: 1200, height: 800 }}>
          <Level_1_RuleChart
            rulesList={levelRules}
            getRules={props.getRules}
            addRules={props.addRules}
            delRules={props.deleteRules}
            modifyRules={props.modifyRules}
          />
        </TabPane>
        <TabPane tab="Level 2" key="2" style={{ width: 1200, height: 800 }}>
          <Level_3_RuleChart
            rulesList={levelRules}
            getRules={props.getRules}
            addRules={props.addRules}
            delRules={props.deleteRules}
            modifyRules={props.modifyRules}
          />
        </TabPane>
      </Tabs>
    </>
  );
}

Rules.propTypes = {
  getRules: PropTypes.func,
  user: PropTypes.object,
  rulesList: PropTypes.array,
  deleteRules: PropTypes.func,
  modifyRules: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({ user: makeSelectUser(), rulesList: selectRulesList });

const mapDispatchToProps = dispatch => ({
  getRules: level => dispatch(getRulesAction(level)),
  addRules: payload => dispatch(addRulesAction(payload)),
  deleteRules: payload => dispatch(delRulesAction(payload)),
  modifyRules: payload => dispatch(modifyRulesAction(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Rules);
