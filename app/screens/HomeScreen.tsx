import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import mapImages from "../utils/imageMapper";

const HomeScreen = () => {
  function getImageAvatar(avatar: string) {
    return (
      <Image style={{ width: 100, height: 100 }} source={mapImages[avatar]} />
    );
  }
  return (
    <View>
      <Text>Welcome to social monster app 👹</Text>
      <Text>Choose your Monster to enter the app</Text>
      <Avatar.Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "yellow",
        }}
        size={130}
        source={() => getImageAvatar("../assets/avatars/monster1.png")}
      />
      <Avatar.Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "brown",
        }}
        size={130}
        source={() => getImageAvatar("../assets/avatars/monster2.png")}
      />
      <Avatar.Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "purple",
        }}
        size={130}
        source={() => getImageAvatar("../assets/avatars/monster3.png")}
      />
      <Avatar.Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "green",
        }}
        size={130}
        source={() => getImageAvatar("../assets/avatars/monster4.png")}
      />
      <Avatar.Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "blue",
        }}
        size={130}
        source={() => getImageAvatar("../assets/avatars/monster5.png")}
      />
      <Avatar.Image
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
        size={130}
        source={() => getImageAvatar("../assets/avatars/monster6.png")}
      />
    </View>
  );
};

export default HomeScreen;
