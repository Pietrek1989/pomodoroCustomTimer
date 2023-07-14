import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={onPress}>
      <Text style={[styles(size).text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.red,
    borderWidth: 2,
  },
  text: {
    color: colors.black,
    fontSize: size / 3,
    fontWeight: "bold",
    textShadowColor: "#ECF0F1",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
});
