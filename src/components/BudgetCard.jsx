import React from 'react';
import { currencyFormatter } from '../utils';

const BudgetCard = ({ budgetName, amount, max }) => {
  return (
    <div class=" p-6 bg-gray-200 border border-gray-400 rounded-md shadow-md mb-4 md:max-w-md">
      {/* Card Body */}
      <div>
        {/* Card Info */}
        <div>{budgetName}</div>
        <div>
          {currencyFormatter.format(amount)} / {currencyFormatter.format(max)}
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
