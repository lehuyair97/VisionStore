import { IconType } from "@assets/icons";
import { Icon } from "@components";
import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type ProfileActionItemProps = {
  icon: any;
  title: string;
  onPress: () => void;
};

const ProfileActionItem: React.FC<ProfileActionItemProps> = ({
  icon,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <Icon type={"fontAwesome"} name={icon} color={"black"} size={24} />
      <Text style={styles.methodName}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  methodName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default ProfileActionItem;
