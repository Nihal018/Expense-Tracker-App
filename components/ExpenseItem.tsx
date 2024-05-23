import { View, StyleSheet, Pressable, Text } from "react-native";
import { getFormattedDate } from "../util/date";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({ id, cost, title, date }) {
  const navigation = useNavigation();
  const ItemPressHandler = () => {
    navigation.navigate("ManageExpense");
  };
  return (
    <View className=" my-2 border-1 rounded-xl bg-indigo-600 ">
      <Pressable
        onPress={() => ItemPressHandler}
        style={({ pressed }) => (pressed ? styles.pressedItem : null)}
      >
        <View className="flex-row justify-between align-middle">
          <View className="mx-2">
            <Text className="py-1 px-2 text-lg text-left font-bold  text-white">
              {title}
            </Text>
            <Text className="py-1 px-2 text-md text-left  text-white">
              {getFormattedDate(date)}
            </Text>
          </View>
          <View className="w-20  border border-white rounded-lg  bg-white my-2 mx-2 flex-row justify-center ">
            <Text className="text-purple-500 font-bold text-center pt-3">
              {cost}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressedItem: {
    opacity: 0.5,
  },
});
