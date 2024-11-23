import { View, Image, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import mapImages from "../utils/imageMapper";
import { Monster } from "../utils/types";

type MonsterAvatarProps = {
  monster: Monster;
};

const MonsterAvatar = (props: MonsterAvatarProps) => {
  function getImageAvatar(avatar: string) {
    return (
      <Image style={{ width: 50, height: 50 }} source={mapImages[avatar]} />
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
        size={60}
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
