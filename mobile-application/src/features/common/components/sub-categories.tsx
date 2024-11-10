import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Block, Row, Text } from "@components";
import { Helper } from "@utils/helper";
import BottomSheet from "./bottom-sheet";

interface SubCategoryBottomSheetProps {
  height?: number;
  refRBSheet: React.RefObject<any>;
  subCategories: Array<{
    image: string;
    name: string;
    _id: string;
  }>;
  category: string;
  isFetching: boolean;
  onsubCategoryChildSelected: (subCategory:any) => void
}

const SubCategoryBottomSheet: React.FC<SubCategoryBottomSheetProps> = ({
  height = 600,
  refRBSheet,
  subCategories,
  isFetching,
  category,
  onsubCategoryChildSelected,
}) => {
  return (
    <BottomSheet height={height} refRBSheet={refRBSheet}>
      <Block p={"_20"} borderBottomWidth={1} borderColor={"primary"}>
        <Text color={"primary"} fontWeight={"bold"} fontSize={16}>
          {category === "components" ? "Linh ki ện" : "Phụ kiện"}
        </Text>
      </Block>
      {isFetching ? (
        <Block justifyContent="center" alignItems="center" flex={1}>
          <ActivityIndicator size="large" color="#000" />
        </Block>
      ) : (
        <FlatList
          data={subCategories}
          keyExtractor={Helper.getKeyExtractor}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{onsubCategoryChildSelected(item)}}>
              <Row center gap={"_20"} py={"_10"} px={"_20"} mt={"_10"}>
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 30, height: 30 }}
                />
                <Text color={"black"}>{item?.name}</Text>
              </Row>
            </TouchableOpacity>
          )}
        />
      )}
    </BottomSheet>
  );
};

export default SubCategoryBottomSheet;
