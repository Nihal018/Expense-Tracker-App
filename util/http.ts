import axios from "axios";
import { BackHandler } from "react-native";

const BACKEND_URL =
  "https://react-native-course-d60fc-default-rtdb.asia-southeast1.firebasedatabase.app";
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );

  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

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

export async function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
