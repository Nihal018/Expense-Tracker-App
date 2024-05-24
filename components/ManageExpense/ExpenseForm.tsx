import { View, StyleSheet, Text } from "react-native";

import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({
  onCancel,
  submitButtonLabel,
  onSubmit,
  selectedExpense,
}) {
  const [inputs, setInputs] = useState({
    cost: {
      value: selectedExpense ? selectedExpense.cost.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense ? getFormattedDate(selectedExpense.date) : "",
      isValid: true,
    },
    title: {
      value: selectedExpense ? selectedExpense.title : "",
      isValid: true,
    },
  });

  function InputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentState) => {
      return {
        ...currentState,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      cost: +inputs.cost.value,
      title: inputs.title.value,
      date: new Date(inputs.date.value),
    };
    const amountIsValid = !isNaN(expenseData.cost) && expenseData.cost > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInputs) => {
        return {
          cost: { value: curInputs.cost.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          title: {
            value: curInputs.title.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.cost.isValid || !inputs.date.isValid || !inputs.title.isValid;

  return (
    <View style={styles.FormContainer}>
      <View style={styles.InputRow}>
        <Input
          label="Amount"
          invalid={!inputs.cost.isValid}
          style={styles.RowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: InputChangeHandler.bind(this, "cost"),
            value: inputs.cost.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.RowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: InputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        style={{ marginTop: 5 }}
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: InputChangeHandler.bind(this, "title"),
          value: inputs.title.value,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} mode="" onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  InputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  RowInput: {
    flex: 1,
  },
  FormContainer: {
    marginTop: 30,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
