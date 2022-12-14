import { useState } from 'react';
import Logo from './assets/images/puppy.png';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import Footer from './components/Footer';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './context/BudgetsContext';

function App() {
  const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function showAddExpenseModal(budgetId) {
    setOpenAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <div className="bg-[#192049] w-full h-screen overflow-auto ">
        {/* Container */}
        <div className="container max-w-screen-xl mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            {/* Logo */}
            <div className="flex justify-center items-center">
              <h1 className="text-xl me-auto uppercase font-bold text-slate-200 md:text-3xl">
                Budget Buddy
              </h1>
              <img
                src={Logo}
                className="h-28 w-34 mr-20 md:mr-0"
                alt="dog-logo"
              />
            </div>

            {/* Buttons */}
            <div
              className="flex flex-col gap-2 md:gap-4 md:flex-row
        "
            >
              <button
                type="button"
                className="bg-[#FF1659] text-white font-semibold rounded-md px-5 py-2.5 text-center mb-2 duration-300 hover:bg-opacity-80 focus:outline-none"
                onClick={() => setOpenAddBudgetModal(true)}
              >
                Add Budget
              </button>
              <button
                type="button"
                className="bg-slate-200 text-[#192049] font-semibold rounded-md px-5 py-2.5 text-center mb-2 duration-300 hover:bg-opacity-80 focus:outline-none"
                onClick={showAddExpenseModal}
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
              alignItems: 'flex-start',
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );
              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => showAddExpenseModal(budget.id)}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(budget.id)
                  }
                />
              );
            })}
            <UncategorizedBudgetCard
              onAddExpenseClick={showAddExpenseModal}
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
              }
            />
            <TotalBudgetCard />
          </div>
        </div>
      </div>
      <Footer />
      <AddBudgetModal
        open={openAddBudgetModal}
        handleCloseModal={() => setOpenAddBudgetModal(false)}
      />
      <AddExpenseModal
        open={openAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleCloseModal={() => setOpenAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}

export default App;
