import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "./context/store";
import Home from "./screens/Home";
import PostDetails from "./screens/PostDetails";
import Feed from "./screens/Feed";
import { Monster } from "./utils/types";
import MonsterAvatar from "./components/MonsterAvatar";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import MenuDrawer from "./components/MenuDrawer";
import Monsters from "./screens/Monsters";
import MonsterDetails from "./screens/MonsterDetails";
import SwitchMonster from "./screens/SwitchMonster";
import { useToggle } from "./hooks/useToggle";

export type RootStackParamList = {
  Home: undefined;
  Feed: undefined;
  Post: { postId: string };
  SwitchMonster: undefined;
  MonsterDetails: { monsterId: string };
  Monsters: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const { open, show, hide } = useToggle(false);
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
                  <IconButton icon={"menu"} onPress={show} />
                  <MenuDrawer visible={open} hideModal={hide} />
                </View>
              );
            },
          })}
        >
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Post" component={PostDetails} />
          <Stack.Screen name="SwitchMonster" component={SwitchMonster} />
          <Stack.Screen name="MonsterDetails" component={MonsterDetails} />
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
