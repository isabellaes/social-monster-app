import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, View, StyleSheet } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import PostView from "../components/Post";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import { useState } from "react";
import { addPost } from "../context/postSlice";
import { useToggle } from "../hooks/useToggle";
import GenericModal from "../components/GenericModal";
import { generateRandomNumber } from "../utils/functions";

type FeedNavigationProp = NativeStackNavigationProp<RootStackParamList, "Feed">;

const Feed = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { open, show, hide } = useToggle(false);
  const navigation = useNavigation<FeedNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const monster = useSelector(
    (state: RootState) => state.monster.currentMonster
  );
  const posts = useSelector((state: RootState) => state.post.posts);

  function addNewPost() {
    dispatch(
      addPost({
        id: generateRandomNumber(),
        title: title,
        text: text,
        authorId: monster?.id || 0,
        comments: [],
        likes: 0,
      })
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ backgroundColor: "lightgrey" }}>
        {posts.map((p) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Post", { postId: p.id.toString() })
            }
            key={p.id}
            style={{ backgroundColor: "white", margin: 5, padding: 5 }}
          >
            <PostView post={p} />
            <Text style={{ padding: 7 }}>Comments: {p.comments.length}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <GenericModal visible={open} hideModal={hide}>
        <View style={styles.createpostModal}>
          <IconButton icon={"close"} onPress={hide} />
          <Text variant="titleMedium" style={{ textAlign: "center" }}>
            New post
          </Text>
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
              hide();
              addNewPost();
            }}
          >
            Create Post
          </Button>
        </View>
      </GenericModal>
      <FAB icon="plus" style={styles.fab} onPress={show} />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  createpostModal: {
    padding: 10,
    backgroundColor: "white",
    gap: 10,
  },
});
