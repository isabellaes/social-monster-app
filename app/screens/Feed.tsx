import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import PostView from "../components/Post";
import MonsterAvatar from "../components/Monster";
import { useNavigation } from "@react-navigation/native";

type FeedNavigationProp = NativeStackNavigationProp<RootStackParamList, "Feed">;

const Feed = () => {
  const navigation = useNavigation<FeedNavigationProp>();
  const monster = useSelector(
    (state: RootState) => state.monster.currentMonster
  );
  const posts = useSelector((state: RootState) => state.post.posts);
  return (
    <ScrollView>
      <Text>Feed</Text>
      <Text>Currentmonster: {monster?.name}</Text>
      {monster ? <MonsterAvatar monster={monster} /> : <></>}

      <Button onPress={() => navigation.navigate("SwitchUser")}>
        Switch User
      </Button>
      <Button onPress={() => navigation.navigate("User", { monsterId: "1" })}>
        User Details
      </Button>

      <Text>Posts</Text>
      {posts.map((p) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Post", { postId: p.id.toString() })
          }
          key={p.id}
        >
          <PostView post={p} />
          <Text>Comments: {p.comments.length}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Feed;
