import { Icon, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import { User } from "@hooks/auth/use-sign-in";
import { Cart } from "@hooks/common/use-get-cart";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import Colors from "@theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AddressProps {
  address: Cart;
}

const UserInfo = ({ userInfo }: { userInfo: User }) => {
  return (
    <Block paddingHorizontal={"_20"} paddingVertical={"_15"} bg={"container"}>
      <Row between center>
        <Row>
          <Icon
            type="fontAwesome"
            name="map-marker"
            size={24}
            color={Colors.primary}
          />
          <Block m={"_15"} />
          <Block>
            <Text color={"black"}>Địa chỉ nhận hàng</Text>
            <Block width={"85%"}>
              <Text color={"black"}>
                {userInfo?.userName ?? userInfo.email} | 0
                {userInfo?.phoneNumber ?? "----------"}
              </Text>
            </Block>
            <Block width={"85%"}>
              <Text color={"black"} numberOfLines={2}>
                {`${userInfo?.addressSelected?.detail ?? "-------"} - ${
                  userInfo?.addressSelected?.location ?? "-------"
                } `}
              </Text>
            </Block>
          </Block>
        </Row>
        <TouchableOpacity onPress={() => navigate(ROUTES.DeliveryManagerment)}>
          <Icon
            type="fontAwesome"
            name="arrow-right"
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </Row>
    </Block>
  );
};

export default UserInfo;
