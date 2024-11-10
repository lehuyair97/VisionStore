import { Icon } from "@components";
import Colors from "@theme/colors";
import { Row } from "@components";
import { TextInput } from "react-native";
import Block from "@components/block";
import InputSearch from "./input_search";
import { TouchableOpacity } from "react-native-gesture-handler";
import { goBack } from "@navigation/config/navigation-service";


const AppBarSearch = ({searchTerm, setSearchTerm, onSearch}: {searchTerm: string, setSearchTerm: (searchTerm: string) => void, onSearch: () => void}) => {
    return (
        <Row  center style={{backgroundColor:Colors.white255,paddingHorizontal:20}}>
            <TouchableOpacity onPress={() => goBack()}>
                <Icon type="fontAwesome" name="chevron-left" size={20} color={Colors.black2A} />
            </TouchableOpacity>
            <Block width={"3%"}/>
            <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch} />
        </Row>
    );
}

export default AppBarSearch;