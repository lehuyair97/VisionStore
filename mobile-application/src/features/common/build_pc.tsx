import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MainContainer } from "@components";
import { EDGES, Helper } from "@utils/helper";

export default function BuildPC() {
  return (
    <MainContainer edges={EDGES.FULL}>
      <Text>build_pc</Text>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
