import { View, StyleSheet, Pressable } from "react-native";
import { Text, Icon } from "react-native-paper";
import { Post, PostDTO } from "../utils/types";
import { AppDispatch, RootState } from "../context/store";
import { useDispatch, useSelector } from "react-redux";
import MonsterAvatar from "../components/MonsterAvatar";
import { updateLikesOnPost } from "../context/postSlice";

type PostProps = {
  post: PostDTO;
};

const PostView = (props: PostProps) => {
  const dispatch = useDispatch<AppDispatch>();

  function addLikeToPost() {
    dispatch(updateLikesOnPost(props.post._id));
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {props.post.authorId ? (
          <>
            <MonsterAvatar size="small" monster={props.post.authorId} />
            <Text variant="titleMedium">
              Monster {props.post.authorId.name}
            </Text>
          </>
        ) : (
          <></>
        )}
      </View>
      <Text variant="titleSmall">{props.post.title}</Text>
      <Text>{props.post.text}</Text>
      <View style={styles.icons}>
        <Pressable onPress={() => addLikeToPost()}>
          <Icon source="heart" size={20} />
        </Pressable>
        <Text>{props.post.likes}</Text>
        <Icon source="message-outline" size={20} />
        <Text>{props.post.comments?.length || 0}</Text>
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
