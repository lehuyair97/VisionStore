import { StyleSheet, Text, View,ScrollView } from "react-native";
import React from "react";
import HeaderProfile from "../component/header_profile";
import { MainContainer } from "@components";
import { EDGES } from "@utils/helper";
import Block from "@components/block";

const avatar = "https://yt3.googleusercontent.com/nWSdA9GftPmUUpr9p7-uRmzaBpXJPosI-m7anrP040ixXZdMScrMdyordtkR7XBDtewPancSjZo=s900-c-k-c0x00ffffff-no-rj";
export default function Profile() {
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} >
      <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 40}}>
        <HeaderProfile avatar={avatar} />
      </ScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
