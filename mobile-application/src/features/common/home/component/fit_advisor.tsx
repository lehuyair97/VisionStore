import Block from "@components/block";
import Colors from "@theme/colors";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";



interface FitAdvisorProps {
    data: any[];
  }

const FitAdvisor = ({ data }: FitAdvisorProps) => {
    const [selectedId, setSelectedId] = React.useState(null); // State để lưu ID của mục được chọn

    const renderItem = ({ item,index }) => (
        <TouchableOpacity 
            onPress={() => setSelectedId(item.id)}
            style={{paddingLeft: index === 0 ? 0 : 5, paddingRight:5, alignContent: 'center', alignItems: 'center'}}
        >
            <Block style={{
                paddingHorizontal: 17, height: 35, backgroundColor: selectedId === item.id ? Colors.primary : Colors.background_fit_finder, borderRadius: 13, justifyContent: 'center', alignItems: "flex-start"}}>
            <Text style={{ 
                color: selectedId === item.id ? Colors.whiteF3 : Colors.black, // Đổi màu chữ nếu được chọn
                fontSize: 12,
                fontWeight: '500'
            }}>
                {item.title}
            </Text>
            </Block>
           
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "flex-start" }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal // Đặt FlatList thành dạng ngang
            />
        </View>
    );
}

export default FitAdvisor;