import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

type FeedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Feed"
>;

const FeedScreen = () => {
  const monster = useSelector(
    (state: RootState) => state.monster.currentMonster
  );
  return (
    <View>
      <Text>Feed</Text>
      <Text>Currentmonster: {monster?.name}</Text>
    </View>
  );
};

export default FeedScreen;
