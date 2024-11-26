import { View, Image, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import mapImages from "../utils/imageMapper";
import { Monster } from "../utils/types";

type MonsterAvatarProps = {
  monster: Monster;
  size?: "small" | "medium" | "large";
};

const MonsterAvatar = (props: MonsterAvatarProps) => {
  let size = 50;

  if (props.size && props.size === "small") {
    size = 30;
  }
  function getImageAvatar(avatar: string) {
    return (
      <Image style={{ width: size, height: size }} source={mapImages[avatar]} />
    );
  }
  return (
    <View style={styles.container}>
      <Avatar.Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: props.monster.color,
        }}
        size={size + 10}
        source={() => getImageAvatar(props.monster.img)}
      />
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
