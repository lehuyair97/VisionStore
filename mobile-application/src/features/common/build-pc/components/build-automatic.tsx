import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useRootWebSocket from "@hooks/common/use-root-web-socket";
export default function BuildAutomatic() {
  const { messages, sendMessage } = useRootWebSocket();

  
  return (
    <View>
      <Text>build-automatic</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
