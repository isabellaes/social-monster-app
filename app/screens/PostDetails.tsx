import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import PostView from "../components/Post";
import { RouteProp } from "@react-navigation/native";
import PostCommentView from "../components/Comment";
import { TextInput } from "react-native-paper";
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
    <View style={{ flex: 1 }}>
      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        Post
      </Text>
      <View style={{ backgroundColor: "#34C5FA" }}>
        {post ? (
          <View style={{ backgroundColor: "#34C5FA" }}>
            <PostView post={post} />
            <Text variant="titleLarge">Comments: </Text>
            {post.comments.map((c) => (
              <View key={c.id}>
                <PostCommentView postComment={c} />
              </View>
            ))}
          </View>
        ) : (
          <></>
        )}
        <Button onPress={() => addLikeToPost()}>Like</Button>
        <Text>Add comment +</Text>
        <TextInput
          label="Text"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button onPress={() => addNewComment()}>Send</Button>
      </View>
    </View>
  );
};

export default PostDetails;
