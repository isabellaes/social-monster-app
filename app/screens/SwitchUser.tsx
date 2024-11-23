import { StyleSheet, ScrollView, Pressable } from "react-native";
import { Text } from "react-native-paper";
import MonsterAvatar from "../components/Monster";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import { Monster } from "../utils/types";
import { switchCurrentMonster } from "../context/monsterSlice";

type SwitchUserNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SwitchUser"
>;

const SwitchUser = () => {
  const navigation = useNavigation<SwitchUserNavigationProp>();
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  const dispatch = useDispatch<AppDispatch>();

  function onPressNavigate(monster: Monster) {
    dispatch(switchCurrentMonster(monster));
    navigation.navigate("Feed", { monsterId: monster.id.toString() });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleSmall">Switch Monster</Text>
      {monsters.map((monster) => (
        <Pressable onPress={() => onPressNavigate(monster)} key={monster.id}>
          <MonsterAvatar monster={monster} />
          <Text>Name: {monster.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default SwitchUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F3FF0D",
    gap: 5,
  },
});
