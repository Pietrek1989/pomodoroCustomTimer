import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { scaleFont } from "../utils/sizes";

const screenWidth = Dimensions.get("window").width;
const width = screenWidth > 500 ? "50%" : "100%";

export const TimerModal = ({
  visible,
  onClose,
  onContinue,
  onExtend,
  getCurrentStage,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ImageBackground
          source={{
            uri: "https://res.cloudinary.com/dvagn6szo/image/upload/v1689249303/ai-generated-7847758_1280_qfbgan.jpg",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <Text style={styles.modalText}>
            Your <Text style={styles.currentStage}>{getCurrentStage()}</Text>{" "}
            has finished.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onContinue}>
            <Text style={styles.textStyle}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onExtend}>
            <Text style={styles.textStyle}>Add 5 more minutes</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "red",
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: scaleFont(15),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    paddingHorizontal: 5,
    color: "white",
    fontSize: scaleFont(22),
    backgroundColor: "rgba(46, 30, 30, 0.22)",
  },
  currentStage: {
    fontWeight: "bold",
    fontSize: scaleFont(23),
    color: "limegreen",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  modalView: {
    borderRadius: 200,
    alignItems: "center",
    width: width,
    height: "50%",
    elevation: 30,
  },
});
