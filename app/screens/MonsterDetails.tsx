import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import mapImages from "../utils/imageMapper";

type MonsterDetailsNavigationProp = RouteProp<
  RootStackParamList,
  "MonsterDetails"
>;
type Props = {
  route: MonsterDetailsNavigationProp;
};

const MonsterDetails = (props: Props) => {
  const { monsterId } = props.route.params;
  const monsters = useSelector((state: RootState) => state.monster.monsters);
  const posts = useSelector((state: RootState) =>
    state.post.posts.filter((p) => p.authorId === Number(monsterId))
  );
  const monster = monsters.find((m) => m.id === Number(monsterId));

  return (
    <View style={[styles.container, { backgroundColor: monster?.color }]}>
      {monster ? (
        <View key={monster.id}>
          <Image style={styles.image} source={mapImages[monster.img]} />
          <Text>Name: {monster.name}</Text>
          <Text>Eyes: {monster.eyes}</Text>
          <Text>Color: {monster.color}</Text>
          <Text>Posts: {posts.length}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default MonsterDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 5,
    paddingTop: 5,
  },
  image: {
    margin: 2,
  },
});
