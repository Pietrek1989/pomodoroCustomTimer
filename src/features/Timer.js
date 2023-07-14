import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Vibration,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";
import { useKeepAwake } from "expo-keep-awake";
import { FontAwesome } from "@expo/vector-icons";
import { TimerModal } from "../components/TimerModal";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const stages = [
    { name: "Focus Time", time: focusSubject.focusTime },
    { name: "Short Break", time: focusSubject.restTime },
    { name: "Long Break", time: focusSubject.bigBreakTime },
  ];
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(
    focusSubject ? parseFloat(focusSubject.focusTime) : 0.1
  );
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isFocus, setIsFocus] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);

  const onEnd = () => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    setShowModal(true);
    onTimerEnd({
      subject: focusSubject.subject,
      focusTime: focusSubject.focusTime,
      restTime: focusSubject.restTime,
      bigBreakTime: focusSubject.bigBreakTime,
      completedTime: currentTime,
    });
  };

  const handleChangeTime = (changeAmount) => {
    setMinutes(currentTime + changeAmount);
  };
  const handleSkip = () => {
    setIsStarted(false);
    setProgress(1);
    nextPhase();
  };
  const getCurrentStage = () => {
    if (isFocus) return "Focus Time";
    if (cyclesCompleted % 4 === 0 && !isFocus) return "Long Break";
    if (!isFocus) return "Short Break";
  };
  const nextPhase = () => {
    if (isFocus) {
      const newCyclesCompleted = cyclesCompleted + 1;
      setCyclesCompleted(newCyclesCompleted);

      if (newCyclesCompleted % 4 === 0) {
        setIsFocus(false);
        setMinutes(parseFloat(focusSubject.bigBreakTime));
      } else {
        setIsFocus(false);
        setMinutes(parseFloat(focusSubject.restTime));
      }
    } else {
      setIsFocus(true);
      setMinutes(parseFloat(focusSubject.focusTime));
    }
  };

  const continueNextPhase = () => {
    setProgress(1);
    nextPhase();
    setShowModal(false);
    setIsStarted(true);
  };

  const extendTime = () => {
    setMinutes(5);
    setIsStarted(true);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Text style={styles.title}>The task:</Text>
        <Text style={styles.task}>
          {focusSubject ? focusSubject.subject : ""}
        </Text>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
          setcurrentTime={setcurrentTime}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.stageText}>{getCurrentStage()}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.red}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={handleChangeTime} onSkip={handleSkip} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            size={150}
            onPress={() => setIsStarted(true)}
          />
        ) : (
          <RoundedButton
            title="pause"
            size={150}
            onPress={() => setIsStarted(false)}
          />
        )}
      </View>
      <View style={styles.backButton}>
        <FontAwesome
          name="arrow-left"
          size={30}
          color="red"
          onPress={clearSubject}
        />
        <Text
          style={{ color: "red", fontWeight: "bold", fontSize: 20 }}
          onPress={clearSubject}
        >
          {" "}
          BACK{" "}
        </Text>
      </View>
      <TimerModal
        visible={showModal}
        onClose={setShowModal}
        onContinue={continueNextPhase}
        onExtend={extendTime}
        getCurrentStage={getCurrentStage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },

  timingWrapper: {
    flex: 0.1,
    flexDirection: "row",
    paddingTop: spacing.xxl,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: {
    color: colors.black,
    textAlign: "center",
  },
  stageText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "limegreen",
  },
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
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    paddingHorizontal: 5,
    color: "white",
    fontSize: 22,
    backgroundColor: "rgba(46, 30, 30, 0.22)",
  },
  currentStage: {
    fontWeight: "bold",
    fontSize: 23,
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
    width: "100%",
    height: "50%",
    elevation: 30,
  },
});
