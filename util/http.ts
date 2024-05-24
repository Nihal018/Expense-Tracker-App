import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-d60fc-default-rtdb.asia-southeast1.firebasedatabase.app/";

export function storeExpense(expenseData) {
  axios.post(BACKEND_URL + "expenses.json", expenseData);
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      title: response.data[key].title,
      date: new Date(response.data[key].date),
      cost: response.data[key].cost,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
