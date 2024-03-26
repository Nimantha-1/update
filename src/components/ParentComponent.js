/* // ParentComponent.js
import React, { useState } from 'react';
import Order from './order';
import Dashboard from './dashboard';

function ParentComponent() {
  const [rowData, setRowData] = useState([]);

  const updateRowData = (data) => {
    setRowData(data);
  };

  return (
    <div>
      <Order updateRowData={updateRowData} />
      <Dashboard rowData={rowData} />
    </div>
  );
}

export default ParentComponent;
 */