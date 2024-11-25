import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import MonsterAvatar from "../components/MonsterAvatar";
import { switchCurrentMonster } from "../context/monsterSlice";
import { Monster } from "../utils/types";
import { Platform } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { useState } from "react";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
const Home = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  const dispatch = useDispatch<AppDispatch>();

  function chooseMonster(monster: Monster) {
    dispatch(switchCurrentMonster(monster));
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: Platform.select({
            android: "IrishGrover_400Regular",
            ios: "Irish-Grover",
          }),
          fontSize: 40,
          textAlign: "center",
        }}
      >
        Welcome to MONSTER social app
      </Text>
      <Image
        style={styles.image}
        source={require("../assets/avatars/monster4.png")}
      />
      <Button mode="contained-tonal" onPress={() => showModal()}>
        Enter App
      </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View style={styles.modalContainer}>
            <Text
              style={{
                fontFamily: Platform.select({
                  android: "IrishGrover_400Regular",
                  ios: "Irish-Grover",
                }),
                fontSize: 40,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Choose a MONSTER
            </Text>
            <View style={styles.modalContent}>
              {monsters.map((monster) => (
                <Pressable
                  onPress={() => chooseMonster(monster)}
                  key={monster.id}
                  style={styles.monster}
                >
                  <MonsterAvatar monster={monster} />
                  <Text>{monster.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#83F01D",
  },
  image: {
    width: 200,
    height: 200,
  },
  modalContainer: {
    backgroundColor: "#83F01D",
    margin: 20,
    padding: 10,
    height: "auto",
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  monster: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
});
