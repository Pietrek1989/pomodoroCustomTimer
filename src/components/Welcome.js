import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scaleFont } from "../utils/sizes";

const WelcomeText = () => {
  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.headerText}>
        <Text style={styles.headerParagraph}>
          Choose classic pomodoro{" "}
          <Text style={{ fontWeight: "bold" }}>(25-5-30)</Text>
        </Text>
        <Text style={styles.headerParagraph}>
          Or create your own custom learning technique!
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    flex: 0.3,
  },
  welcomeText: {
    fontSize: scaleFont(36),
    fontWeight: "bold",
    color: "#4A90E2",
    textShadowColor: "#ECF0F1",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    color: "black",
    textShadowColor: "#ECF0F1",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textAlign: "center",
    backgroundColor: "rgba(139, 198, 62, 0.80)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  headerParagraph: {
    fontSize: scaleFont(18),
    margin: 5,
    color: "white",
  },
});

export default WelcomeText;
