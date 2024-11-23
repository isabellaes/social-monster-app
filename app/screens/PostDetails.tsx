import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../context/store";
import PostView from "../components/Post";
import { RouteProp } from "@react-navigation/native";
import PostCommentView from "../components/Comment";

type PostDetailsNavigationProp = RouteProp<RootStackParamList, "Post">;
type Props = {
  route: PostDetailsNavigationProp;
};
const PostDetails = (props: Props) => {
  const { postId } = props.route.params;

  const posts = useSelector((state: RootState) => state.post.posts);
  const post = posts.find((p) => p.id === Number(postId));

  return (
    <ScrollView>
      {post ? (
        <>
          <PostView post={post} />
          <Text variant="titleLarge">Comments: </Text>
          {post.comments.map((c) => (
            <View key={c.id}>
              <PostCommentView postComment={c} />
            </View>
          ))}
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default PostDetails;
