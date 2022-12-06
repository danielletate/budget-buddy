import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

// Creates context
const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

// Gives all app components access to values and functions located within context wrapper
export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  // Adds expense to specifited budget category (or uncategorized)
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  // Takes array of current budgets and adds a new budget with unique id, name, and max values
  function addBudget({ name, max }) {
    setBudgets((...prevBudgets) => {
      // Will not add a budget with the same name as an exisiting budget
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  // Deletes budget item that does not have the current id being passed in
  function deleteBudget({ id }) {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}{' '}
    </BudgetsContext.Provider>
  );
};
