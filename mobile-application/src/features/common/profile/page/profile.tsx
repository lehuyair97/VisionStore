import { MainContainer } from "@components";
import Block from "@components/block";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { ScrollView, StyleSheet } from "react-native";
import FeaturesProfile from "../component/features_profile";
import HeaderProfile from "../component/header_profile";
import OrderManagement from "../component/order_management_bar";
import Trademark from "../component/trademark";
import { useAuth } from "@hooks/auth";
import useGetBrand from "@hooks/common/use-get-brand";
import { shipingStatus } from "@utils/containts";
import { useRef } from "react";
import { RBSheetRef } from "@features/common/components/bottom-sheet";
import ProfileActions from "../component/profile-bottom-sheet";

export default function Profile() {
  const { userInfo } = useAuth();
  const { data: brands } = useGetBrand();
  const refRBSheet = useRef<RBSheetRef>();
  const toglleOpenSetting = () => {
    if (refRBSheet?.current?.close) {
      refRBSheet.current.open();
      return;
    }
    refRBSheet.current.close();
  };

  return (
    <MainContainer
      edges={EDGES.LEFT_RIGHT}
      style={{ backgroundColor: Colors.container, paddingHorizontal: 16 }}
    >
      <ScrollView>
        <HeaderProfile
          onPressSetting={toglleOpenSetting}
          avatar={userInfo?.avatar}
          displayName={userInfo?.display_name}
          email={userInfo?.email}
        />
        <Block mt={"_12"} />
        <OrderManagement data={shipingStatus} />
        <Block mt={"_12"} />
        <Trademark data={brands} />
        <Block mt={"_12"} />
        <FeaturesProfile />
      </ScrollView>
      <ProfileActions
        refRBSheet={refRBSheet}
        height={250}
        onClose={() => refRBSheet.current.close()}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
