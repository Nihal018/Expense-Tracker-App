import { View, StyleSheet, Pressable, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const navigation = useNavigation();
  const addPress = () => {
    navigation.navigate("ManageExpense");
  };

  return (
    <View className="w-full h-auto bg-indigo-600 flex-row justify-between align-baseline text-2xl ">
      <View className=" mx-6 mb-4 mt-6">
        <Text className="text-white text-lg font-extrabold">
          Recent Expenses
        </Text>
      </View>
      <View className="mx-6 mb-4 mt-6">
        <Pressable
          onPress={() => addPress}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <FontAwesome6 name="add" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

export default Header;
