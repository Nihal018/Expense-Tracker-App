import { createContext, useReducer } from "react";

import Expense from "../models/Expense";

const EXPENSES = [
  new Expense("1", "Pizza", 9.99, "2024-05-19"),
  new Expense("2", "Italian Suit", 500, "2024-05-19"),
  new Expense("3", "Metro Fare", 5, "2024-05-12"),
  new Expense("4", "Weekly German Classes", 20, "2024-04-09"),
  new Expense("5", "New Chair", 10, "2024-05-17"),
  new Expense("6", "Exotic Fruits", 100, "2024-05-18"),
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ date, cost, title }) => {},
  updateExpense: (id, { title, date, cost }) => {},
  deleteExpense: (id) => {},
});

function ExpensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(ExpensesReducer, EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "Add", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "delete", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "update", payload: { ...expenseData, id: id } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
