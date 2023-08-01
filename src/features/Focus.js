import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
      placeholder={`Enter ${props.label.toLowerCase()}`}
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
          onChangeText={(text) => {
            if (parseFloat(text) === 0) {
              Alert.alert("Invalid Input", "The value cannot be 0.");
              return;
            }
            setFocusTime(parseFloat(text));
          }}
          label="Focus Time (minutes)"
          keyboardType="number-pad"
        />
        <TextInput
          numberInput
          onChangeText={(text) => {
            if (parseFloat(text) === 0) {
              Alert.alert("Invalid Input", "The value cannot be 0.");
              return;
            }
            setRestTime(parseFloat(text));
          }}
          label="Short Break Time (minutes)"
          keyboardType="number-pad"
        />
        <TextInput
          numberInput
          onChangeText={(text) => {
            if (parseFloat(text) === 0) {
              Alert.alert("Invalid Input", "The value cannot be 0.");
              return;
            }
            setBigBreakTime(parseFloat(text));
          }}
          label="Big Break Time (minutes)"
          keyboardType="number-pad"
        />

        <View style={styles.button}>
          <RoundedButton
            title="GO !"
            size={scaleButton(150)}
            onPress={handleSubmit}
            accessibilityLabel="Start the timer"
          />
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          accessibilityLabel="Go back to the main page"
        >
          <FontAwesome name="arrow-left" size={scaleButton(30)} color="red" />
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: scaleFont(20),
            }}
          >
            BACK
          </Text>
        </TouchableOpacity>

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
