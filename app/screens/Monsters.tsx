import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import MonsterAvatar from "../components/MonsterAvatar";
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
    navigation.navigate("MonsterDetails", { monsterId: monster.id.toString() });
  }
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        {monsters.map((monster) => (
          <Pressable
            onPress={() => onPressNavigate(monster)}
            key={monster.id}
            style={{ padding: 15 }}
          >
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
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    gap: 5,
    margin: 2,
  },
});
