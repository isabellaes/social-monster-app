import * as React from "react";
import { Drawer, Portal, Modal } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootNavigator";

type FeedNavigationProp = NativeStackNavigationProp<RootStackParamList, "Feed">;
type MenuDrawerProps = {
  visible: boolean;
  hideModal: () => void;
};
const MenuDrawer = (props: MenuDrawerProps) => {
  const navigation = useNavigation<FeedNavigationProp>();

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modalContainer}
        visible={props.visible}
        onDismiss={props.hideModal}
      >
        <Drawer.Section title="Monster menu">
          <Drawer.Item
            label="Switch user"
            onPress={() => navigation.navigate("SwitchMonster")}
          />
          <Drawer.Item
            label="Feed"
            onPress={() => navigation.navigate("Feed")}
          />
          <Drawer.Item
            label="Monsters"
            onPress={() => navigation.navigate("Monsters")}
          />
        </Drawer.Section>
      </Modal>
    </Portal>
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
