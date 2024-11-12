import { MainContainer } from "@components";
import Block from "@components/block";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { ScrollView, StyleSheet } from "react-native";
import FeaturesProfile from "../component/features_profile";
import HeaderProfile from "../component/header_profile";
import OrderManagement from "../component/order_management";
import Trademark from "../component/trademark";
import { useAuth } from "@hooks/auth";
import useGetBrand from "@hooks/common/use-get-brand";
import { shipingStatus } from "@utils/containts";

export default function Profile() {
  const { userInfo } = useAuth();
  const { data: brands } = useGetBrand();

  return (
    <MainContainer
      edges={EDGES.LEFT_RIGHT}
      style={{ backgroundColor: Colors.gray_profile }}
    >
      <ScrollView>
        <HeaderProfile
          avatar={userInfo?.avatar}
          displayName={userInfo?.userName}
          email={userInfo?.email}
        />
        <Block mt={"_12"} />
        <OrderManagement data={shipingStatus} />
        <Block mt={"_12"} />
        <Trademark data={brands} />
        <Block mt={"_12"} />
        <FeaturesProfile />
      </ScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
