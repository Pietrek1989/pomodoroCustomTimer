import { useState } from "react";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const usePomodoroTimer = (focusSubject, onTimerEnd) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(
    focusSubject ? parseFloat(focusSubject.focusTime) : 0.1
  );
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isFocus, setIsFocus] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  const updateTime = (changeAmount) => {
    setMinutes(currentTime + changeAmount);
  };

  const skipPhase = () => {
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

  return {
    isStarted,
    setIsStarted,
    progress,
    minutes,
    cyclesCompleted,
    isFocus,
    showModal,
    setShowModal,
    onEnd,
    updateTime,
    skipPhase,
    getCurrentStage,
    continueNextPhase,
    extendTime,
  };
};
