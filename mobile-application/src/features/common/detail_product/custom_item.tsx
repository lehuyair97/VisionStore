import { Row } from "@components";
import Block from "@components/block"
import Text from "@components/text"
import Colors from "@theme/colors";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";


interface CustomItemProps {
    isRow?: boolean;
    title?: string;
    selected: string;
    onSelect?: (item: {
        color?: string;
        name: string;
    }) => void;
   data: {
    color?: string;
    name: string;
   }[];
}
const CustomItem = ({ data, isRow = false, title = "WARNA", selected, onSelect }: CustomItemProps) => {
    return (
        <Block marginTop={"_20"}>
            <Text fontSize={16} fontWeight={"bold"} color="black2A">
            {title}
            </Text>
            <Block marginTop={"_10"}/>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => {
                    const paddingHorizontal = isRow ? 15 : 22; 
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onSelect?.(item);
                            }}
                            style={{
                                borderWidth: selected === item.name ? 1 : 0,
                                borderColor: "gray_200",
                                borderRadius: 20,
                                paddingVertical: 10,
                                paddingHorizontal: paddingHorizontal, 
                                backgroundColor: Colors.gray_300,
                            }}
                        >
                            <Row>
                                {isRow && (
                                    <Block
                                        width={25}
                                        height={25}
                                        style={{
                                            borderRadius: 12.5, 
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

