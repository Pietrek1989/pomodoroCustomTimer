import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import Constants from "expo-constants";
import { Focus } from "./src/features/Focus.js";
import { Timer } from "./src/features/Timer";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scaleButton, scaleFont } from "./src/utils/sizes.js";
import * as Font from "expo-font";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-7787953777887576/7943510259";

const STORAGE_KEY = "@focus_history";

export default function App() {
  const [currentSubject, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);
  const [onMainPage, setOnMainPage] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading font", error);
      }
    }

    loadFont();
  }, []);
  const textStyle = fontsLoaded
    ? { fontFamily: "Roboto-Regular" }
    : { fontFamily: "System" };

  const storeFocusHistory = useCallback(async (focusHistory) => {
    try {
      const jsonValue = JSON.stringify(focusHistory);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      Alert.alert("Error", "Could not save focus history");
    }
  }, []);

  const getFocusHistory = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      Alert.alert("Error", "Could not fetch focus history");
    }
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await getFocusHistory();
      setHistory(savedHistory);
    };
    loadHistory();
  }, [getFocusHistory]);

  useEffect(() => {
    storeFocusHistory(history);
  }, [history, storeFocusHistory]);

  // Button press handlers moved outside render
  const handleHistoryItemPress = (item) => setCurrentSubject(item);

  const handleStandardPomodoroPress = () => {
    setCurrentSubject({
      subject: "Standard Pomodoro",
      focusTime: 25,
      restTime: 5,
      bigBreakTime: 30,
    });
    setOnMainPage(false);
  };

  const handleCustomTimerPress = () => setOnMainPage(false);

  const onTimerEnd = useCallback((subjectWithTimes) => {
    setHistory((prevHistory) => [...prevHistory, subjectWithTimes]);
  }, []);

  const clearSubject = useCallback(() => {
    setCurrentSubject(null);
    setOnMainPage(true);
  }, []);

  return (
    <SafeAreaView style={[styles.container, textStyle]}>
      {onMainPage ? (
        <ImageBackground
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/05/19/09/37/healthy-2325957_1280.jpg",
          }}
          style={[styles.backgroundImage, { backgroundColor: "#FFF2CD" }]}
          resizeMode="cover"
        >
          <View style={styles.mainPage}>
            {/* <WelcomeText /> */}

            <View style={styles.optionButtons}>
              <Button
                mode="contained"
                onPress={handleStandardPomodoroPress}
                color="black"
                accessibilityLabel="start the timer with classic pomodoro times"
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.buttonText}>
                  Classic Pomodoro (25m-5m-30m){" "}
                </Text>
              </Button>
            </View>
            <View style={styles.optionButtons}>
              <Button
                mode="contained"
                onPress={handleCustomTimerPress}
                accessibilityLabel="create your own custom timer"
                color="black"
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.buttonText}>Custom Timer</Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      ) : !currentSubject ? (
        <>
          <Focus
            addSubject={setCurrentSubject}
            setOnMainPage={setOnMainPage}
            history={history}
            onHistoryItemPress={handleHistoryItemPress}
          />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subjectWithTimes) => {
            setHistory((prevHistory) => [...prevHistory, subjectWithTimes]);
          }}
          clearSubject={() => {
            setCurrentSubject(null);
            setOnMainPage(true);
          }}
        />
      )}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
  },
  mainPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtons: {
    margin: scaleButton(40),
    width: scaleButton(370),
    height: scaleButton(60),
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontSize: scaleFont(20),
  },
});
