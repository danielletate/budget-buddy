import { AiOutlineClose } from 'react-icons/ai';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetsContext';
import { currencyFormatter } from '../utils';

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  // Get all expenses for individual budget
  const expenses = getBudgetExpenses(budgetId);

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  if (!budgetId) return null;
  return (
    <>
      {/* Modal */}
      <div className="flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-lg">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none">
            {/* Header */}
            <div className="flex justify-between p-6 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold capitalize">
                Expenses - {budget?.name}
              </h3>
              {/* Renders delete button only if it is not the uncategorized budget */}
              {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <button
                  className="bg-transparent mr-20 text-sm font-medium text-slate-400 rounded-md px-3 py-2 text-center mb-2 border-2 border-slate-400 hover:bg-slate-400 hover:text-white duration-300"
                  onClick={() => {
                    deleteBudget(budget);
                    handleClose();
                  }}
                >
                  Delete
                </button>
              )}
              <button className="text-[#FF1659] text-2xl" onClick={handleClose}>
                <AiOutlineClose />
              </button>
            </div>

            {/* Card Body */}
            <div className="flex flex-col p-6 max-w-auto">
              {expenses.map((expense) => (
                <div className="flex justify-between mb-3 ">
                  <div className="capitalize text-2xl">
                    {expense.description}
                  </div>
                  <div className="flex gap-4">
                    <div className="text-xl">
                      {currencyFormatter.format(expense.amount)}
                    </div>
                    <button
                      className="border border-slate-400 h-6 w-6 text-slate-400 rounded-sm hover:bg-[#FF1659] hover:border-[#FF1659] hover:text-white duration-300"
                      onClick={() => {
                        deleteExpense(expense);
                      }}
                    >
                      <div className="">&times;</div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
