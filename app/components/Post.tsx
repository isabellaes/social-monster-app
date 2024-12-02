import { View, StyleSheet, Pressable } from "react-native";
import { Text, Icon } from "react-native-paper";
import { Post } from "../utils/types";
import { AppDispatch, RootState } from "../context/store";
import { useDispatch, useSelector } from "react-redux";
import MonsterAvatar from "../components/MonsterAvatar";
import { addLike } from "../context/postSlice";

type PostProps = {
  post: Post;
};

const PostView = (props: PostProps) => {
  const monsters = useSelector((state: RootState) => state.monster.monsters);
  const dispatch = useDispatch<AppDispatch>();
  function getMonster(id: number) {
    const monster = monsters.find((m) => m.id === id);
    return monster;
  }

  function addLikeToPost() {
    dispatch(addLike(props.post.id || 0));
  }

  const monster = getMonster(props.post.authorId);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {monster ? <MonsterAvatar size="small" monster={monster} /> : <></>}
        <Text variant="titleMedium">Monster {monster?.name}</Text>
      </View>
      <Text variant="titleSmall">{props.post.title}</Text>
      <Text>{props.post.text}</Text>
      <View style={styles.icons}>
        <Pressable onPress={() => addLikeToPost()}>
          <Icon source="heart" size={20} />
        </Pressable>
        <Text>{props.post.likes}</Text>
        <Icon source="message-outline" size={20} />
        <Text>{props.post.comments.length}</Text>
      </View>
    </View>
  );
};

export default PostView;

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
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
