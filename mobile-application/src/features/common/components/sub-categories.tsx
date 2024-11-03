import { Block, Row, Text } from "@components";
import BottomSheet, { RBSheetRef } from "./bottom-sheet";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
type SubCategoriesProp = {
  subCategories: any;
  refRBSheet: React.RefObject<RBSheetRef>;
  onPress: () => void;
};
const SubCategories = ({
  subCategories,
  refRBSheet,
  onPress,
}: SubCategoriesProp) => {
  return (
    <BottomSheet refRBSheet={refRBSheet} height={500}>
      <Block>
        {subCategories.map((sub) => {
          return (
            <TouchableOpacity onPress={onPress}>
              <Row center>
                <Image
                  source={{ uri: sub?.image }}
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                />
                <Text>{sub.name}</Text>
              </Row>
            </TouchableOpacity>
          );
        })}
      </Block>
    </BottomSheet>
  );
};
export default SubCategories;
