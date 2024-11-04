import { Icon, Row } from "@components";
import TextHome from "./text_home";
import Block from "@components/block";
import Colors from "@theme/colors";
import { TouchableOpacity } from "react-native";
import { navigate } from "@navigation/config/navigation-service";
import Search from "@features/common/search/page/search";
import { ROUTES } from "@navigation/config/routes";

const AppBar = () => {
  return (
    <Row between>
      <TextHome>Vision Store</TextHome>
      <Row>
        <TouchableOpacity onPress={() => navigate(ROUTES.Search)}>
          <Icon
            type="fontAwesome"
            name="search"
            size={20}
            color={Colors.black2A}
          />
        </TouchableOpacity>
        <Block width={20} />
        <Icon type="fontAwesome" name="bell" size={20} color={Colors.black2A} />
      </Row>
    </Row>
  );
};

export default AppBar;
