import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, View, StyleSheet } from "react-native";
import { Button, Text, Portal, Modal, TextInput } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import PostView from "../components/Post";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import { useState } from "react";
import { addPost } from "../context/postSlice";

type FeedNavigationProp = NativeStackNavigationProp<RootStackParamList, "Feed">;

const Feed = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const navigation = useNavigation<FeedNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const monster = useSelector(
    (state: RootState) => state.monster.currentMonster
  );
  const posts = useSelector((state: RootState) => state.post.posts);

  function addNewPost() {
    dispatch(
      addPost({
        id: 0,
        title: title,
        text: text,
        authorId: monster?.id || 0,
        comments: [],
        likes: 0,
      })
    );
  }

  return (
    <View>
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
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View style={{ backgroundColor: "white" }}>
            <Text>New post</Text>
            <TextInput
              label="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              label="Text"
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <Button
              onPress={() => {
                hideModal();
                addNewPost();
              }}
            >
              Create Post
            </Button>
          </View>
        </Modal>
      </Portal>
      <FAB icon="plus" style={styles.fab} onPress={() => showModal()} />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
