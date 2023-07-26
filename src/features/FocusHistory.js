import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../utils/colors";
import { scaleFont, spacing } from "../utils/sizes";
import { Badge } from "react-native-paper";

export const FocusHistory = ({ history, onHistoryItemPress }) => {
  if (!history || !history.length) return null;

  const filteredHistory = history
    .filter((item) => item.subject !== "Standard Pomodoro")
    .reverse()
    .slice(0, 5);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.list}
      onPress={() => onHistoryItemPress(item)}
    >
      <View>
        <Text style={styles.taskName}>
          🍅 {item && item.subject ? item.subject : "No Subject"}
        </Text>
      </View>
      <View style={styles.allBadges}>
        <Badge style={[styles.badge, styles.badgeBlue]}>{item.focusTime}</Badge>
        <Badge style={[styles.badge, styles.badgeYellow]}>
          {item.restTime}
        </Badge>
        <Badge style={[styles.badge, styles.badgeGreen]}>
          {item.bigBreakTime}
        </Badge>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Tasks:</Text>

      <FlatList
        data={filteredHistory}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.subject + index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },

  title: {
    color: colors.black,
    fontSize: scaleFont(16),
    fontWeight: "bold",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: spacing.sm,
    justifyContent: "space-between",
  },
  badge: {
    marginHorizontal: 5,
    color: "#fff",
  },
  badgeBlue: {
    backgroundColor: "blue",
  },
  badgeYellow: {
    backgroundColor: "red",
  },
  badgeGreen: {
    backgroundColor: "green",
  },
  allBadges: {
    flexDirection: "row",
  },
  taskName: {
    fontWeight: "bold",
    fontSize: scaleFont(15),
  },
});
