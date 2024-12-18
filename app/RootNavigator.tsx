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
import { Pressable } from "react-native";
import { Text } from "react-native-paper";
import Monsters from "./screens/Monsters";
import MonsterDetails from "./screens/MonsterDetails";
import SwitchMonster from "./screens/SwitchMonster";
import { createDrawerNavigator } from "@react-navigation/drawer";

export type RootStackParamList = {
  Home: undefined;
  Feed: undefined;
  Post: { postId: string };
  SwitchMonster: undefined;
  MonsterDetails: { monsterId: string };
  Monsters: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const FeedStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Feed"
      options={{ headerShown: false }}
      component={Feed}
    />
    <Stack.Screen name="Post" component={PostDetails} />
  </Stack.Navigator>
);

const MonsterStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Monsters"
      options={{ headerShown: false }}
      component={Monsters}
    />
    <Stack.Screen name="MonsterDetails" component={MonsterDetails} />
  </Stack.Navigator>
);

const RootStackNavigator = () => {
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
        <Drawer.Navigator
          initialRouteName="Feed"
          screenOptions={({ route, navigation }) => ({
            headerStyle: { backgroundColor: "#83F01D" },
            headerTintColor: "black",
            headerRight: () => {
              return (
                <Pressable
                  style={{
                    margin: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 15,
                  }}
                >
                  <Text variant="titleLarge">{currentMonster.name}</Text>
                  <MonsterAvatar size="small" monster={currentMonster} />
                </Pressable>
              );
            },
          })}
        >
          <Drawer.Screen name="Feed" component={FeedStack} />
          <Drawer.Screen name="SwitchMonster" component={SwitchMonster} />
          <Drawer.Screen
            name="Monsters"
            component={MonsterStack}
            options={{ title: "Monsters" }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#83F01D" },
            headerTintColor: "black",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootStackNavigator;
