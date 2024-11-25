import * as React from "react";
import { Portal, Modal } from "react-native-paper";
import { StyleSheet } from "react-native";

type GenericModalProps = {
  visible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
};
const GenericModal = (props: GenericModalProps) => {
  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modalContainer}
        visible={props.visible}
        onDismiss={props.hideModal}
      >
        {props.children}
      </Modal>
    </Portal>
  );
};

export default GenericModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
});
