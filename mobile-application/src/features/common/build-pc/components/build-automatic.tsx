import { StyleSheet, Text, View } from "react-native";
import SearchAppBar from "./search-app-bar";
import Block from "@components/block";
export default function BuildAutomatic() {
  return (
    <Block flex={1} p={'_20'}>
      <SearchAppBar
        textPlaceHolder="Nhập giá tiền bạn muốn build"
        onValueChange={() => {}}
        textValue=""
        buttonTitle="Build"
      />
    </Block>
  );
}

const styles = StyleSheet.create({});
