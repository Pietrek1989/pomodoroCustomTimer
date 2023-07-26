import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput as RNTextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton.js";
import { scaleButton, spacing, scaleFont } from "../utils/sizes";
import { FontAwesome } from "@expo/vector-icons";
import { FocusHistory } from "./FocusHistory.js";

const TextInput = ({ onChangeText, numberInput, ...props }) => {
  return (
    <RNTextInput
      style={styles.textInput}
      onChangeText={(text) =>
        numberInput ? onChangeText(parseFloat(text)) : onChangeText(text)
      }
      theme={{
        colors: {
          primary: "red",
          text: "red",
          placeholder: "gray",
        },
      }}
      {...props}
    />
  );
};

export const Focus = ({
  addSubject,
  setOnMainPage,
  history,
  onHistoryItemPress,
}) => {
  const [subject, setSubject] = useState("");
  const [focusTime, setFocusTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [bigBreakTime, setBigBreakTime] = useState(30);

  const handleSubmit = () => {
    addSubject({
      subject,
      focusTime,
      restTime,
      bigBreakTime,
    });
  };

  const handleGoBack = () => {
    setOnMainPage(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={setSubject} label="Name of the task" />
        <TextInput
          numberInput
          onChangeText={setFocusTime}
          label="Focus Time (minutes)"
          keyboardType="number-pad"
        />
        <TextInput
          numberInput
          onChangeText={setRestTime}
          label="Short Break Time (minutes)"
          keyboardType="number-pad"
        />
        <TextInput
          numberInput
          onChangeText={setBigBreakTime}
          label="Big Break Time (minutes)"
          keyboardType="number-pad"
        />

        <View style={styles.button}>
          <RoundedButton
            title="GO !"
            size={scaleButton(150)}
            onPress={handleSubmit}
          />
        </View>
        <View style={styles.backButton}>
          <FontAwesome
            name="arrow-left"
            size={scaleButton(30)}
            color="red"
            onPress={handleGoBack}
          />
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: scaleFont(20),
            }}
            onPress={handleGoBack}
          >
            BACK
          </Text>
        </View>
        <FocusHistory
          history={history}
          onHistoryItemPress={onHistoryItemPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 0.5,
    padding: spacing.lg,
    justifyContent: "flex-start",
    marginTop: spacing.lg,
  },
  textInput: {
    margin: spacing.sm,
    fontSize: scaleFont(18),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    marginTop: spacing.xxl,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: spacing.sm,
  },
});
