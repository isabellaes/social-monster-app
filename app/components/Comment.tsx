import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { PostComment } from "../utils/types";
import { RootState } from "../context/store";
import { useSelector } from "react-redux";
import MonsterAvatar from "../components/Monster";

type PostCommentProps = {
  postComment: PostComment;
};

const PostCommentView = (props: PostCommentProps) => {
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  function getMonster(id: number) {
    const monster = monsters.find((m) => m.id === id);
    return monster;
  }

  const monster = getMonster(props.postComment.authorId);

  return (
    <View style={styles.container}>
      {monster ? <MonsterAvatar monster={monster} /> : <></>}
      <Text variant="titleLarge">Monster {monster?.name}</Text>
      <Text>{props.postComment.text}</Text>
    </View>
  );
};

export default PostCommentView;

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
