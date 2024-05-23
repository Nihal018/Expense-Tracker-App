import { View, StyleSheet, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { EXPENSES } from "../data/dummy-data";

export default function ExpenseList() {
  const List = EXPENSES; // will add logic for checking dates

  const renderListItem = ({ item }) => {
    const ExpenseItemProps = {
      id: item.id,
      title: item.title,
      date: item.date,
      cost: item.cost,
    };

    return <ExpenseItem {...ExpenseItemProps} />;
  };

  return (
    <View className={"w-auto mx-2 pl-2"} style={styles.listItemContainer}>
      <FlatList
        data={List}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => renderListItem(itemData)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {},
});
