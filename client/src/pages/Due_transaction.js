import React from 'react';
import { Badge, Tooltip } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';

const Due_transaction = ({ dueDate }) => {
  const isDue = new Date(dueDate) < new Date();

  return (
    <Tooltip title={`Due date: ${new Date(dueDate).toLocaleDateString()}`}>
      <Badge
        count={<ClockCircleOutlined style={{ color: isDue ? 'red' : 'green' }} />}
        style={{ backgroundColor: 'transparent' }}
      />
    </Tooltip>
  );
};

export default Due_transaction;
// import React from 'react'

// const Due_transaction = () => {
//   return (
//     <div>Due_transaction</div>
//   )
// }

// export default Due_transaction
