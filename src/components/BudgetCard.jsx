import { currencyFormatter } from '../utils';
import ProgressBar from './ProgressBar';

const BudgetCard = ({ name, amount, max, ratio }) => {
  return (
    <div className="p-6 bg-slate-200 border border-slate-600 rounded-md mb-4 md:max-w-md">
      {/* Title */}
      <div className="flex justify-between items-baseline mb-3">
        <div className="me-2 font-medium capitalize">{name}</div>
        <div className="flex items-baseline">
          {currencyFormatter.format(amount)}
          <span className="text-slate-500 text-sm ml-1">
            / {currencyFormatter.format(max)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar progressPercentage={ratio} amount={amount} max={max} />

      {/* Buttons */}
      <div
        className="flex justify-end gap-2 mt-8
        "
      >
        <button
          type="button"
          className="bg-transparent text-sm font-medium text-red-500 rounded-md px-3 py-2 text-center mb-2 border-2 border-[#FF1659] hover:bg-[#FF1659] hover:text-white duration-300"
        >
          Add Budget
        </button>
        <button
          type="button"
          className="bg-transparent text-sm font-medium text-slate-400 rounded-md px-3 py-2 text-center mb-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white duration-300"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default BudgetCard;
