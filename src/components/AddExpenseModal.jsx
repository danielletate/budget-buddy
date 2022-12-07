import { AiOutlineClose } from 'react-icons/ai';
import { useRef } from 'react';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetsContext';

export default function AddExpenseModal({
  open,
  handleCloseModal,
  defaultBudgetId,
}) {
  // References to "name" and "max" input field values
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    // Closes modal after submit
    handleCloseModal();
  }

  if (!open) return null;
  return (
    <>
      {/* Centers modal */}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        {/* Content */}
        <div className="relative w-full my-6 mx-auto max-w-sm">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none ">
            {/*Header*/}
            <div className="flex justify-between p-6 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">New Expense</h3>
              <button
                className="text-[#FF1659] text-2xl"
                onClick={handleCloseModal}
              >
                <AiOutlineClose />
              </button>
            </div>
            {/*Form*/}
            <div className="relative p-6 flex-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    className="py-1 outline outline-gray-300 rounded-sm mb-6"
                    required
                    ref={descriptionRef}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="amount" className="mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="py-1 outline outline-gray-300 rounded-sm mb-6"
                    required
                    ref={amountRef}
                    min={0}
                    step={0.01}
                  />
                </div>
                <div>
                  <label htmlFor="budget-id">Budget</label>
                  <select
                    name="budgetId"
                    className="py-1 outline outline-gray-300 rounded-sm block w-full mt-2"
                    defaultValue={defaultBudgetId}
                    ref={budgetIdRef}
                  >
                    <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                    {budgets.map((budget) => (
                      <option key={budget.id} value={budget.id}>
                        {budget.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#FF1659] text-white font-semibold rounded-md px-5 py-2.5 text-center mb-2 duration-300 hover:bg-opacity-80 focus:outline-none mt-5"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
