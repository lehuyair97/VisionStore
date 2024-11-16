import { MainContainer, Row } from "@components";
import { commonStyles } from "../styles/styles";
import Text from "@components/text";
import { EDGES } from "@utils/helper";
import Block from "@components/block";
import EachFeature from "./each_feature";
import { useAuth } from "@hooks/auth";



const FeaturesProfile = () => {
  const { logout } = useAuth();
  const featuresData = [
    { icon: "clock-o", title: "Xem gần đây", onPress: () => {} },
    { icon: "star", title: "Đánh giá", onPress: () => {} },
  ];
  const profiles = [
    { icon: "location-arrow", title: "Địa chỉ giao hàng", onPress: () => {} },
    { icon: "credit-card", title: "Quản lý Thanh Toán", onPress: () => {} },
    {
      icon: "sign-out",
      title: "Đăng xuất",
      onPress: () => {
        logout();
      },
    },
  ];
  return (
    <MainContainer
      edges={EDGES.LEFT_RIGHT}
      style={[
        commonStyles.container,
        { borderTopEndRadius: 30, borderTopStartRadius: 30 },
      ]}
    >
      <Text style={commonStyles.title}>Bạn quan tâm</Text>
      <Block mt={"_10"} />
      {featuresData.map((feature, index) => (
        <EachFeature
          key={index}
          icon={feature.icon}
          title={feature.title}
          onPress={feature.onPress}
        />
      ))}
      <Block mt={"_10"} />
      <Text style={commonStyles.title}>Cá nhân</Text>
      <Block mt={"_10"} />
      {profiles.map((notification, index) => (
        <EachFeature
          key={index}
          icon={notification.icon}
          title={notification.title}
          onPress={notification.onPress}
        />
      ))}
    </MainContainer>
  );
};

export default FeaturesProfile;
