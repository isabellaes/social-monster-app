import { StyleSheet, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import MonsterAvatar from "../components/MonsterAvatar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import { Monster } from "../utils/types";
import { switchCurrentMonster } from "../context/monsterSlice";

type SwitchMonsterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SwitchMonster"
>;

const SwitchMonster = () => {
  const navigation = useNavigation<SwitchMonsterNavigationProp>();
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  const dispatch = useDispatch<AppDispatch>();

  function onPressNavigate(monster: Monster) {
    dispatch(switchCurrentMonster(monster));
    navigation.navigate("Feed");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.content}>
        {monsters.map((monster) => (
          <Pressable
            style={{ padding: 15 }}
            onPress={() => onPressNavigate(monster)}
            key={monster.id}
          >
            <MonsterAvatar monster={monster} />
            <Text>Name: {monster.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SwitchMonster;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    gap: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    gap: 5,
    margin: 2,
  },
});
