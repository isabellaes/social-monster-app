import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, View } from "react-native";
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
    <ScrollView contentContainerStyle={{ backgroundColor: "#9ef53b" }}>
      <View style={{ margin: 5, flexDirection: "row", alignItems: "center" }}>
        <Text variant="titleLarge">Monster {monster?.name}s feed</Text>
      </View>

      {posts.map((p) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Post", { postId: p.id.toString() })
          }
          key={p.id}
          style={{ backgroundColor: "white", margin: 5 }}
        >
          <PostView post={p} />
          <Text>Comments: {p.comments.length}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Feed;
