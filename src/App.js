import React, { Fragment, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { generateRandomData } from './data';
import { transactionColumns, monthColumns, calculateRewardsData } from './utils';

function ExpandedComponent(props) {
  return (
    <DataTable
      title="Transactions"
      columns={transactionColumns}
      data={props.data.children}
      theme="solarized"
      dense={true}
    />
  );
}

function App() {
  const [customersData, setCustomerData] = useState([]);

  useEffect(() => {
    (async function getCustomerTransactionData() {
      const transactionData = await generateRandomData();
      const rewardsDataByCustomer = calculateRewardsData(transactionData);

      setCustomerData(rewardsDataByCustomer);
    })();
  }, []);

  const { pointsPerCustomerByMonth, pointsPerCustomerByName } = customersData;

  return (
    <Fragment>
      <DataTable
        title="Customer Transactions by Month"
        columns={monthColumns}
        data={pointsPerCustomerByMonth}
        theme="solarized"
        expandableRows={true}
        fixedHeader={true}
        pagination={true}
        dense={true}
        fixedHeaderScrollHeight="35vh"
        expandableRowsComponent={<ExpandedComponent />}
      />

      <DataTable
        title="Customer Transactions by Name"
        columns={monthColumns}
        data={pointsPerCustomerByName}
        theme="solarized"
        expandableRows={true}
        fixedHeader={true}
        pagination={true}
        dense={true}
        fixedHeaderScrollHeight="35vh"
        expandableRowsComponent={<ExpandedComponent />}
      />
    </Fragment>
  );
}

export default App;