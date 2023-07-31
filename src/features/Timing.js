import React from "react";
import { View, StyleSheet } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import { scaleButton } from "../utils/sizes";

export const Timing = ({ onChangeTime, onSkip }) => {
  return (
    <>
      <View style={styles.timingButton} accessibilityLabel="add 5 minutes">
        <RoundedButton
          size={scaleButton(75)}
          title="+ 5"
          onPress={() => onChangeTime(5)}
        />
      </View>
      <View
        style={styles.timingButton}
        accessibilityLabel="skip to the next stage"
      >
        <RoundedButton size={scaleButton(75)} title="Skip" onPress={onSkip} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: "center",
  },
});
