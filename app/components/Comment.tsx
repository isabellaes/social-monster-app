import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { PostComment, PostCommentDTO } from "../utils/types";
import MonsterAvatar from "../components/MonsterAvatar";

type PostCommentProps = {
  postComment: PostCommentDTO;
};

const PostCommentView = (props: PostCommentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {props.postComment.authorId ? (
          <>
            <MonsterAvatar size="small" monster={props.postComment.authorId} />
            <Text variant="titleMedium">
              Monster {props.postComment.authorId.name}
            </Text>
          </>
        ) : (
          <></>
        )}
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
