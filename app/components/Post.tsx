import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Post } from "../utils/types";
import { RootState } from "../context/store";
import { useSelector } from "react-redux";
import MonsterAvatar from "../components/MonsterAvatar";

type PostProps = {
  post: Post;
};

const PostView = (props: PostProps) => {
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  function getMonster(id: number) {
    const monster = monsters.find((m) => m.id === id);
    return monster;
  }

  const monster = getMonster(props.post.authorId);

  return (
    <View style={styles.container}>
      {monster ? <MonsterAvatar monster={monster} /> : <></>}

      <Text variant="titleLarge">Monster {monster?.name}</Text>
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
