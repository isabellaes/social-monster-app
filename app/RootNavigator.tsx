import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "./context/store";
import Home from "./screens/Home";
import PostDetails from "./screens/PostDetails";
import Feed from "./screens/Feed";
import SwitchUser from "./screens/SwitchUser";
import { Monster } from "./utils/types";
import UserDetails from "./screens/UserDetails";
import MonsterAvatar from "./components/Monster";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { IconButton } from "react-native-paper";
import MenuDrawer from "./components/MenuDrawer";
import Monsters from "./screens/Monsters";

export type RootStackParamList = {
  Home: undefined;
  Feed: undefined;
  Post: { postId: string };
  SwitchUser: undefined;
  User: { monsterId: string };
  Monsters: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [currentMonster, setCurrentMonster] = useState<Monster | null>(null);
  const monster = useSelector(
    (state: RootState) => state.monster.currentMonster
  );

  useEffect(() => {
    setCurrentMonster(monster);
  }, [monster]);

  return (
    <NavigationContainer>
      {currentMonster ? (
        <Stack.Navigator
          initialRouteName="Feed"
          screenOptions={({ route, navigation }) => ({
            headerStyle: { backgroundColor: "grey" },
            headerTintColor: "white",
            header: () => {
              return (
                <View
                  style={{
                    padding: 5,
                    margin: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      margin: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MonsterAvatar monster={currentMonster} />
                    <Text variant="titleLarge">{currentMonster.name}</Text>
                  </View>
                  <IconButton icon={"menu"} onPress={showModal} />
                  <MenuDrawer visible={visible} hideModal={hideModal} />
                </View>
              );
            },
          })}
        >
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Post" component={PostDetails} />
          <Stack.Screen name="SwitchUser" component={SwitchUser} />
          <Stack.Screen name="User" component={UserDetails} />
          <Stack.Screen name="Monsters" component={Monsters} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#2e003e" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootStackNavigator;
