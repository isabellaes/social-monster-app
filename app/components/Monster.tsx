import { View, Image, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import mapImages from "../utils/imageMapper";
import { Monster } from "../utils/types";

type MonsterAvatarProps = {
  monster: Monster;
  onPressNavigation: () => void;
};

const MonsterAvatar = (props: MonsterAvatarProps) => {
  function getImageAvatar(avatar: string) {
    return (
      <Image style={{ width: 100, height: 100 }} source={mapImages[avatar]} />
    );
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={() => props.onPressNavigation()}>
        <Avatar.Image
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: props.monster.color,
          }}
          size={130}
          source={() => getImageAvatar(props.monster.img)}
        />
        <Text style={styles.text}>{props.monster.name}</Text>
      </Pressable>
    </View>
  );
};

export default MonsterAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
