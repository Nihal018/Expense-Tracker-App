import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButtons";
import { ExpensesContext } from "../store/exoenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

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

  async function confirmHandler(expenseData) {
    setIsSending(true);
    try {
      if (isEditting) {
        ExpensesCxt.updateExpense(editedExpenseId, expenseData);

        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        ExpensesCxt.addExpense({ ...expenseData, id: id });
      }

      navigation.goBack();
    } catch (error) {
      setError("Could not send data - please try again later");
      setIsSending(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function deletePressHandler() {
    setIsSending(true);
    try {
      await deleteExpense(editedExpenseId);
      ExpensesCxt.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete the expense - please try again later");
      setIsSending(false);
    }
  }

  if (isSending) return <LoadingOverlay />;

  if (error && !isSending) return <ErrorOverlay message={error} />;

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
