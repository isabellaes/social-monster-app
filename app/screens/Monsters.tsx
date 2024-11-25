import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import MonsterAvatar from "../components/Monster";
import { Monster } from "../utils/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootNavigator";
import { Text } from "react-native-paper";

type MonstersNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Monsters"
>;

const Monsters = () => {
  const monsters = useSelector((state: RootState) => state.monster.monsters);
  const navigation = useNavigation<MonstersNavigationProp>();
  function onPressNavigate(monster: Monster) {
    navigation.navigate("User", { monsterId: monster.id.toString() });
  }
  return (
    <View>
      <Text variant="titleLarge">Monsters</Text>
      <View style={styles.container}>
        {monsters.map((monster) => (
          <Pressable onPress={() => onPressNavigate(monster)} key={monster.id}>
            <MonsterAvatar monster={monster} />
            <Text>Name: {monster.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Monsters;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F3FF0D",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
});
