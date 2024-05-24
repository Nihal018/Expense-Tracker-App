import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButtons";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/exoenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;
  const ExpensesCxt = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditting]);

  const selectedExpense = ExpensesCxt.expenses.find((expense) => {
    return expense.id === editedExpenseId;
  });

  function confirmHandler(expenseData) {
    if (isEditting) ExpensesCxt.updateExpense(editedExpenseId, expenseData);
    else ExpensesCxt.addExpense(expenseData);

    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function deletePressHandler() {
    ExpensesCxt.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditting ? "Update" : "Add"}
        selectedExpense={selectedExpense}
      />

      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deletePressHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
