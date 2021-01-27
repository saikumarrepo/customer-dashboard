import { format } from 'date-fns'

export const transactionColumns = [
  {
    name: 'Customer Id',
    selector: 'custId',
  },
  {
    name: 'Date',
    selector: 'date',
  },
  {
    name: 'Amount',
    selector: 'amount',
  },
  {
    name: 'Points',
    selector: 'points',
  },
];

export const monthColumns = [
  {
    name: 'Customer',
    selector: 'name',
  },
  {
    name: 'Month',
    selector: 'month',
  },
  {
    name: 'Amount',
    selector: 'amount',
  },
  {
    name: 'Points',
    selector: 'points',
  },
];

export function calculateRewardsData(transactionsData) {
  const pointsPerTransaction = transactionsData.map((transaction) => {
    const { amount, date } = transaction;

    return {
      ...transaction, 
      points: calculatePoints(amount),
      date: format(date, 'MM/dd/yyyy'),
      month: format(date, 'MMMM'),
    };
  });

  const pointsPerCustomerByMonth = pointsPerTransaction.reduce((acc, transaction) => {
    const {custId, month, amount, points} = transaction;

    if(!acc[custId]) {
      acc[custId] = {};
    }

    if(!acc[custId][month]) {
      acc[custId][month] = { ...transaction, children: [{ ...transaction }] };
    } else {
      acc[custId][month]['amount'] += amount;
      acc[custId][month]['points'] += points;
      acc[custId][month]['children'].push({ ...transaction });
    }

    return acc;
  }, {});

  const pointsPerCustomerByMonthArray = [];
  
  Object.values(pointsPerCustomerByMonth).map(month => {
    pointsPerCustomerByMonthArray.push(...Object.values(month));

    return null;
  });

  const pointsPerCustomerByName = pointsPerTransaction.reduce((acc, transaction) => {
    const {custId, amount, points} = transaction;

    if(!acc[custId]) {
      acc[custId] = {};
      acc[custId] = { ...transaction, children: [{ ...transaction }] };
    } else {
      acc[custId]['amount'] += amount;
      acc[custId]['points'] += points;
      acc[custId]['children'].push({ ...transaction });
    }

    return acc;
  }, {});

  return { 
    pointsPerCustomerByMonth: pointsPerCustomerByMonthArray,
    pointsPerCustomerByName: Object.values(pointsPerCustomerByName),
  };
}

function calculatePoints(amount) {
  let points = 0;
  
  if(amount > 50 && amount <= 100) {
    points += amount - 50;
  }

  if(amount > 100) {
    points += ((amount - 100) * 2) + 50;
  }

  return points;
}