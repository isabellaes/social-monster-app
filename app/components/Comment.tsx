import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { PostComment } from "../utils/types";
import { RootState } from "../context/store";
import { useSelector } from "react-redux";
import MonsterAvatar from "../components/MonsterAvatar";

type PostCommentProps = {
  postComment: PostComment;
};

const PostCommentView = (props: PostCommentProps) => {
  const monsters = useSelector((state: RootState) => state.monster.monsters);

  function getMonster(id: string) {
    const monster = monsters.find((m) => m._id === id);
    return monster;
  }

  const monster = getMonster(props.postComment.authorId);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {monster ? <MonsterAvatar size="small" monster={monster} /> : <></>}
        <Text variant="titleMedium">Monster {monster?.name}</Text>
      </View>
      <Text>{props.postComment.text}</Text>
    </View>
  );
};

export default PostCommentView;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: "white",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  avatar: {
    flexDirection: "row",
    alignItems: "center",
  },
});
