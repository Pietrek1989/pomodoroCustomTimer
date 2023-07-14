import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const imageSize = width * 0.5;

const WelcomeText = () => {
  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dvagn6szo/image/upload/v1688751395/Layer_2_ydux1g.png",
        }}
        style={{ width: imageSize, height: imageSize, padding: 0, margin: 0 }}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>Choose classic pomodoro(25-5-30)</Text>
      <Text style={styles.headerText}>
        Or create your own custom learning technique!
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    flex: 0.4,
    marginBottom: 300,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4A90E2",
    textShadowColor: "#ECF0F1",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textShadowColor: "#ECF0F1",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textAlign: "center",
  },
});

export default WelcomeText;
