import Block from "@components/block";
import Text from "@components/text";
import RenderProduct from "@features/common/common/render_product";
import { FlatList } from "react-native";
import RowTow from "./row_tow";
import Colors from "@theme/colors";

const ItemProduct = () => {
    const data = [
        { id: '1', name: 'USB 3.0 SanDisk CZ73 Ultra Flair 512GB 150Mb/s (Bạc) - Nhất Tín Chính Hãng', capacity: '512 GB', speed: '150Mb/s', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9uWRAuTwzHZXLCKjD_p-DrJqLbYcjQVlKg&s' },
        { id: '2', name: 'USB 3.0 SanDisk CZ73 Ultra Flair 512GB 150Mb/s (Bạc) - Nhất Tín Chính Hãng', capacity: '512 GB', speed: '150Mb/s', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9uWRAuTwzHZXLCKjD_p-DrJqLbYcjQVlKg&s' },
    ];

    return (
        <Block backgroundColor={"container"}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => <RenderProduct item={item} />}
                style={{ paddingHorizontal: 20}}
            />
            <RowTow title="Voucher" icon="ticket" title_method="Miễn phí vận chuyển " color_title_method={Colors.green_300} />
            <RowTow title="Voucher" icon="ticket" title_method="Miễn phí vận chuyển " color_title_method={Colors.green_300} />

        </Block>
    );
}

export default ItemProduct;
