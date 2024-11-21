import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import MonsterAvatar from "../components/Monster";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootNavigator";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import { Monster } from "../utils/types";
import { switchCurrentMonster } from "../context/MonsterSlice";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  const dispatch = useDispatch<AppDispatch>();

  function onPressNavigate(monster: Monster) {
    dispatch(switchCurrentMonster(monster));
    navigation.navigate("Feed", { monsterId: monster.id.toString() });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge">Welcome to social monster app 👹</Text>
      <Text variant="titleSmall">Choose your Monster to enter the app</Text>
      {monsters.map((monster) => (
        <MonsterAvatar
          monster={monster}
          key={monster.id}
          onPressNavigation={() => onPressNavigate(monster)}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5,
  },
});
