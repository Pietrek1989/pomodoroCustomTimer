import { Dimensions } from "react-native";

export const fontSizes = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 80,
};

export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 80,
};

const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;
const isTablet = aspectRatio < 1.6;

const phoneScaleFactor = 1;
const tabletScaleFactor = 1.3; // For instance, make fonts 20% larger on tablets

export const scaleFont = (size) => {
  const scaleFactor = isTablet ? tabletScaleFactor : phoneScaleFactor;
  return size * scaleFactor;
};
export const scaleButton = (size) => {
  const scaleFactor = isTablet ? tabletScaleFactor : phoneScaleFactor;
  return size * scaleFactor;
};
