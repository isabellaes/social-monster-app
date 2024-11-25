import { View, Image, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import mapImages from "../utils/imageMapper";
import { Monster, Post, PostComment } from "../utils/types";
import { RootState, AppDispatch } from "../context/store";
import { useDispatch, useSelector } from "react-redux";
import MonsterAvatar from "../components/Monster";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootNavigator";

type PostProps = {
  post: Post;
};
type FeedNavigationProp = NativeStackNavigationProp<RootStackParamList, "Feed">;

const PostView = (props: PostProps) => {
  const monsters = useSelector((state: RootState) => state.monster.monsters);
  const navigation = useNavigation<FeedNavigationProp>();
  function getMonster(id: number) {
    const monster = monsters.find((m) => m.id === id);
    return monster;
  }

  const monster = getMonster(props.post.authorId);

  return (
    <View style={styles.container}>
      {monster ? <MonsterAvatar monster={monster} /> : <></>}
      <Pressable
        onPress={() =>
          navigation.navigate("User", {
            monsterId: monster?.id.toString() || "0",
          })
        }
      >
        <Text variant="titleLarge">Monster {monster?.name}</Text>
      </Pressable>
      <Text>{props.post.title}</Text>
      <Text>{props.post.text}</Text>
      <Text>Likes: {props.post.likes}</Text>
    </View>
  );
};

export default PostView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
