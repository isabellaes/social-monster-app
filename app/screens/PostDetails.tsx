import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import PostView from "../components/Post";
import { RouteProp } from "@react-navigation/native";
import PostCommentView from "../components/Comment";
import { useState } from "react";
import { addComment, addLike } from "../context/postSlice";
import { generateRandomNumber } from "../utils/functions";

type PostDetailsNavigationProp = RouteProp<RootStackParamList, "Post">;
type Props = {
  route: PostDetailsNavigationProp;
};

const PostDetails = (props: Props) => {
  const { postId } = props.route.params;
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.post.posts);
  const currentMonster = useSelector(
    (state: RootState) => state.monster.currentMonster
  );
  const post = posts.find((p) => p.id === Number(postId));
  const [text, setText] = useState("");

  function addLikeToPost() {
    dispatch(addLike(post?.id || 0));
  }
  function addNewComment() {
    dispatch(
      addComment({
        comment: {
          id: generateRandomNumber(),
          text: text,
          authorId: currentMonster?.id || 0,
        },
        postId: post?.id || 0,
      })
    );
  }

  return (
    <View style={styles.container}>
      {post ? (
        <ScrollView>
          <PostView post={post} />
          <Button mode="contained" onPress={() => addLikeToPost()}>
            Like
          </Button>
          <Text variant="titleMedium">Comments: </Text>
          {post.comments.map((c) => (
            <View key={c.id}>
              <PostCommentView postComment={c} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
      <View style={styles.commentView}>
        <Text variant="titleMedium">Add comment</Text>
        <TextInput
          label="Text"
          value={text}
          mode="outlined"
          onChangeText={(text) => setText(text)}
        />
        <Button mode="contained" onPress={() => addNewComment()}>
          Send
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 2,
    padding: 2,
  },
  postView: {
    gap: 5,
    margin: 2,
  },
  commentView: {
    margin: 2,
    padding: 2,
    gap: 5,
    marginBottom: 15,
  },
});

export default PostDetails;
