import Block from "@components/block";
import useBuildAutomatic from "@hooks/common/use-build-automatic";
import { Alert, StyleSheet } from "react-native";
import SearchAppBar from "./search-app-bar";
import ConfigSelector from "./config-type";
import { Row } from "@components";
import { useState } from "react";
import BuildItem from "./build-item";
import Text from "@components/text";
export default function BuildAutomatic() {
  const { build } = useBuildAutomatic();
  const [PCs, setPCs] = useState();
  const [selectedConfig, setSelectedConfig] = useState<string>("developer");
  const [budget, setBudget] = useState<string>("");
  const [isNoneData, setNoneData] = useState<boolean>(false);
  const handleBuildPC = async () => {
    if (!selectedConfig || !budget) {
      Alert.alert("Vui lòng nhạp giá tiền bạn muốn build! ");
      return;
    }
    const res = await build({
      configType: selectedConfig,
      totalBudget: parseFloat(budget),
    });
    if (res?.suggest?.length > 0 && res.suggest[0]?.CPU) {
      setPCs(res.suggest);
    } else {
      setNoneData(true);
    }
  };
  return (
    <Block flex={1} p={"_20"}>
      <ConfigSelector
        selectedConfig={selectedConfig}
        setSelectedConfig={setSelectedConfig}
      />
      <SearchAppBar
        textPlaceHolder="Nhập giá tiền bạn muốn build"
        onValueChange={setBudget}
        textValue={budget}
        buttonTitle="Build"
        onPress={handleBuildPC}
      />
      {isNoneData && (
        <Block
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          mt={"_60"}
        >
          <Text textAlign={"center"} color={"black"}>
            Xin lỗi, hiện tại cửa hàng chưa có sản phẩm phù hợp!
          </Text>
        </Block>
      )}
      <BuildItem data={PCs} />
    </Block>
  );
}

const styles = StyleSheet.create({});
