import { MainContainer, Row } from "@components";
import { commonStyles } from "../styles/styles";
import Text from "@components/text";
import { EDGES } from "@utils/helper";
import Colors from "@theme/colors";
import Block from "@components/block";
import EachFeature from "./each_feature";

const featuresData = [
    { icon: "history", title: "Lịch sử giao dịch", onPress: () => {} },
    { icon: "gift", title: "Kho Voucher", onPress: () => {} },
    { icon: "star", title: "Đánh giá", onPress: () => {} },
  ];
  
  const notificationsData = [
    { icon: "bell", title: "Quản lý Thông Báo", onPress: () => {} },
    { icon: "credit-card", title: "Quản lý Thanh Toán", onPress: () => {} },
    { icon: "sign-out", title: "Đăng xuất", onPress: () => {} },
  ];
  const FeaturesProfile = () => {
    return (
      <MainContainer edges={EDGES.LEFT_RIGHT} style={[commonStyles.container, { borderTopEndRadius: 30, borderTopStartRadius: 30 }]}>
        <Text style={commonStyles.title}>Bạn quan tâm</Text>
        <Block mt={"_10"} />
        {featuresData.map((feature, index) => (
          <EachFeature key={index} icon={feature.icon} title={feature.title} onPress={feature.onPress} />
        ))}
        <Block mt={"_10"} />
        <Text style={commonStyles.title}>Thông báo</Text>
        <Block mt={"_10"} />
        {notificationsData.map((notification, index) => (
          <EachFeature key={index} icon={notification.icon} title={notification.title} onPress={notification.onPress} />
        ))}
      </MainContainer>
    );
  }

export default FeaturesProfile;