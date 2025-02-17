import Block from "@components/block";
import Text from "@components/text";
import RenderProduct from "@features/common/common/render_product";
import { FlatList } from "react-native";
import RowTow from "./row_tow";
import Colors from "@theme/colors";
import { Cart } from "@hooks/common/use-get-cart";


interface ItemProductProps {
    selectedProducts: Cart[];
}

const ItemProduct = ({ selectedProducts }: ItemProductProps) => {
    return (
        <Block backgroundColor={"container"}>
            <FlatList
                data={selectedProducts}
                keyExtractor={item => item._id}
                renderItem={({item}) => <RenderProduct item={item} />}
                style={{ paddingHorizontal: 20}}
            />
        </Block>
    );
}

export default ItemProduct;
