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

export type RootStackParamList = {
  Home: undefined;
  Feed: { monsterId: string };
  Post: { postId: string };
  SwitchUser: undefined;
  User: { monsterId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Navigator
          initialRouteName="Feed"
          screenOptions={{
            headerStyle: { backgroundColor: "#2e003e" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Post" component={PostDetails} />
          <Stack.Screen name="SwitchUser" component={SwitchUser} />
          <Stack.Screen name="User" component={UserDetails} />
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
