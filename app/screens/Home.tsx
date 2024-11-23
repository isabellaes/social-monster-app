import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import MonsterAvatar from "../components/Monster";
import { switchCurrentMonster } from "../context/monsterSlice";
import { Monster } from "../utils/types";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
const Home = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  const dispatch = useDispatch<AppDispatch>();

  function chooseMonster(monster: Monster) {
    dispatch(switchCurrentMonster(monster));
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to Monster social app</Text>
      <Image source={require("../assets/avatars/monster4.png")} />
      <Text>Select a monster to enter app</Text>
      {monsters.map((monster) => (
        <Pressable onPress={() => chooseMonster(monster)} key={monster.id}>
          <MonsterAvatar monster={monster} />
          <Text>Name: {monster.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#83F01D",
    fontFamily: "Irish grover",
  },
});
