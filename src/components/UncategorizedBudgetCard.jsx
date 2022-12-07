import BudgetCard from './BudgetCard';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetsContext';

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();

  // Adds up all uncategorized expenses and renders data on card
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  // Will not show Uncategorized if there is no anount in that category
  if (amount === 0) return null;
  return <BudgetCard amount={amount} name="Uncategorized" {...props} />;
}
