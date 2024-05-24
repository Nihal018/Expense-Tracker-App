import { View, StyleSheet, Text, StatusBar } from "react-native";
import Header from "../components/Header";
import ExpenseList from "../components/ExpenseList";
import { useContext } from "react";
import { ExpensesContext } from "../store/exoenses-context";
import { getDateMinusDays } from "../util/date";

function RecentScreen({ navigation }) {
  const ExpenseCxt = useContext(ExpensesContext);

  const recentExpenses = ExpenseCxt.expenses.filter((expense) => {
    const today = new Date();
    const weekAgo = getDateMinusDays(today, 7);
    return expense.date >= weekAgo && expense.date <= today;
  });

  const expensesSum = recentExpenses.reduce((sum, expense) => {
    return sum + expense.cost;
  }, 0);

  let content = (
    <Text className="text-center m-12">No Expenses during last week</Text>
  );

  if (recentExpenses.length > 0)
    content = <ExpenseList list={recentExpenses} />;

  return (
    <View className="bg-indigo-800 h-full w-full ">
      <StatusBar style="auto" />
      <Header />

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

export default RecentScreen;

const styles = StyleSheet.create({
  pressedModalButton: {
    borderColor: "rgb(79, 70, 229)",
    backgroundColor: "rgb(79, 70, 229)",
    borderWidth: 2,
    borderRadius: 8,
  },
});
