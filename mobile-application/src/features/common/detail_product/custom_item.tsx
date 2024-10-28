import { Row } from "@components";
import Block from "@components/block"
import Text from "@components/text"
import Colors from "@theme/colors";
import { FlatList, TouchableOpacity } from "react-native";


interface CustomItemProps {
    isRow?: boolean;
    title?: string;
   data: {
    color?: string;
    name: string;
   }[];
}
const CustomItem = ({ data, isRow = false, title = "WARNA" }: CustomItemProps) => {
    return (
        <Block>
            <Text fontSize={16} fontWeight={"bold"} color="black2A">
            {title}
            </Text>
            <Block marginTop={"_10"}/>
            <FlatList
                data={data}
                horizontal
                renderItem={({ item }) => {
                    const paddingHorizontal = isRow ? 15 : 22; // Tách logic ra ngoài
                    return (
                        <TouchableOpacity
                            style={{
                                borderWidth: 0.5,
                                borderColor: "gray_200",
                                borderRadius: 20,
                                paddingVertical: 10,
                                paddingHorizontal: paddingHorizontal, // Sử dụng biến
                                backgroundColor: Colors.gray_300,
                            }}
                        >
                            <Row>
                                {isRow && (
                                    <Block
                                        width={25}
                                        height={25}
                                        style={{
                                            borderRadius: 12.5, // Một nửa của width/height để tạo hình tròn
                                            backgroundColor: item.color,
                                        }}
                                    />
                                )}
                                <Block width={10} />
                                <Text fontSize={16} fontWeight={"300"} color="black2A">
                                    {item.name}
                                </Text>
                            </Row>
                        </TouchableOpacity>
                    );
                }}
                ItemSeparatorComponent={() => <Block style={{ width: 15 }} />} 
                contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} 


            />
        </Block>
    )
}

export default CustomItem;

