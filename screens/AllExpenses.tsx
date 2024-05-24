import { StatusBar, Text, View } from "react-native";

import { useContext } from "react";
import { ExpensesContext } from "../store/exoenses-context";
import ExpenseList from "../components/ExpenseList";

export default function AllExpenses({ navigation }) {
  const ExpenseCxt = useContext(ExpensesContext);

  const expenses = ExpenseCxt.expenses;
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.cost;
  }, 0);

  let content = (
    <Text className="text-center m-12">No Registered Expenses yet</Text>
  );

  if (expenses.length > 0) content = <ExpenseList list={expenses} />;

  return (
    <View className="bg-indigo-800 h-full w-full ">
      <StatusBar style="auto" />
      <View className="h-auto py-2 px-4 flex-row bg-pink-100 justify-between align-baseline rounded-lg my-4 mx-4 ">
        <Text className="text-purple-500 text-md pt-1">Last Week</Text>
        <Text className="text-lg text-purple-500 font-bold ">
          ${expensesSum.toFixed(2)}
        </Text>
      </View>
      {content}
    </View>
  );
}
