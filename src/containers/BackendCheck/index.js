import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import request from 'utils/request';
import dayjs from 'dayjs';

const status = {
  Good: 'Good',
  Checking: 'Checking',
  Bad: 'Bad',
};

function BackendCheck() {
  const [healthyState, setHealthyState] = useState(status.Checking);
  const [latency, setLatency] = useState(null);

  const checkHealth = async () => {
    const t1 = dayjs().valueOf();
    setHealthyState(status.Checking);
    try {
      const res = await request.get(`v1/healthCheck`);
      if (res && res.data.healthStatus === 'healthy') {
        setHealthyState(status.Good);
      } else {
        setHealthyState(status.Bad);
      }
    } catch (e) {
      setHealthyState(status.Bad);
    }
    setLatency(dayjs().valueOf() - t1);
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <Result
      status={healthyState === status.Good ? 'success' : 'warning'}
      title={`Backend Status is ${healthyState}`}
      subTitle={`API address is ${process.env.REACT_APP_BASE_URL}, latency is ${latency} ms`}
      extra={
        <Button type="primary" disabled={healthyState === status.Checking} onClick={() => checkHealth()}>
          Check Again
        </Button>
      }
    />
  );
}

export default BackendCheck;
