import * as React from "react";
import { Drawer, Portal, Modal } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootNavigator";
import GenericModal from "./GenericModal";

type FeedNavigationProp = NativeStackNavigationProp<RootStackParamList, "Feed">;
type MenuDrawerProps = {
  visible: boolean;
  hideModal: () => void;
};
const MenuDrawer = (props: MenuDrawerProps) => {
  const navigation = useNavigation<FeedNavigationProp>();

  return (
    <GenericModal visible={props.visible} hideModal={props.hideModal}>
      <Drawer.Section title="Monster menu" style={styles.modalContainer}>
        <Drawer.Item
          label="Switch user"
          onPress={() => {
            props.hideModal();
            navigation.navigate("SwitchMonster");
          }}
        />
        <Drawer.Item
          label="Feed"
          onPress={() => {
            props.hideModal();
            navigation.navigate("Feed");
          }}
        />
        <Drawer.Item
          label="Monsters"
          onPress={() => {
            props.hideModal();
            navigation.navigate("Monsters");
          }}
        />
      </Drawer.Section>
    </GenericModal>
  );
};

export default MenuDrawer;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 150,
    padding: 10,
    height: "auto",
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  monster: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
});
