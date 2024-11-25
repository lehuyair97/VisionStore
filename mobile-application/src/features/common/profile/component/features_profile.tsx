import { MainContainer, Row } from "@components";
import { commonStyles } from "../styles/styles";
import Text from "@components/text";
import { EDGES } from "@utils/helper";
import Block from "@components/block";
import EachFeature from "./each_feature";
import { useAuth } from "@hooks/auth";
import { ROUTES } from "@navigation/config/routes";
import { navigate } from "@navigation/config/navigation-service";

const FeaturesProfile = () => {
  const { logout } = useAuth();
  const featuresData = [
    {
      icon: "clock-o",
      title: "Xem gần đây",
      onPress: () => navigate(ROUTES.RecentProducts),
    },
    {
      icon: "star",
      title: "Đánh giá",
      onPress: () => navigate(ROUTES.UserReviewProduct),
    },
  ];
  const profiles = [
    {
      icon: "location-arrow",
      title: "Địa chỉ giao hàng",
      onPress: () => navigate(ROUTES.DeliveryManagerment),
    },
    {
      icon: "credit-card",
      title: "Quản lý Thanh Toán",
      onPress: () => navigate(ROUTES.PaymentManagerment),
    },
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
