import {
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  Pressable,
  StatusBar,
} from "react-native";
import Header from "../components/Header";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";

function RecentScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const setModal = () => {
    setModalVisible(true);
  };
  const addPress = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View className="bg-indigo-800 h-full w-full ">
      <StatusBar style="auto" />
      <Header addPress={addPress} />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center align-middle">
          <View className=" ">
            <Text className="text-white text-lg">Add Expense</Text>
          </View>
          <View className="flex-row justify-center align-middle mt-2">
            <Pressable
              className="mx-2 "
              onPress={() => addPress}
              style={({ pressed }) =>
                pressed ? styles.pressedModalButton : null
              }
            >
              <Text className="text-white">Cancel</Text>
            </Pressable>

            <Pressable
              className="mx-2 "
              onPress={() => addPress}
              style={({ pressed }) =>
                pressed ? styles.pressedModalButton : null
              }
            >
              <Text className="text-white">Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View className="h-auto py-2 px-4 flex-row bg-pink-100 justify-between align-baseline rounded-lg my-4 mx-4 ">
        <Text className="text-purple-500 text-md pt-1">Last Week</Text>
        <Text className="text-lg text-purple-500 font-bold ">$ 67.89</Text>
      </View>
      <ExpenseList />
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
