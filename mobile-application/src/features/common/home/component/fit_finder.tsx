
import { Icon } from '@components';
import Block from '@components/block';
import Colors from '@theme/colors';
import React from 'react';
import { FlatList, View,Text,TouchableOpacity } from 'react-native'; // Thêm import FlatList

const data = [ // Tạo dữ liệu cho FlatList
    { id: '1', title: 'Laptop', icon: 'home' },
    { id: '2', title: 'Pc', icon: 'desktop' },
    { id: '3', title: 'Linh Kiện', icon: 'microchip' },
    { id: '4', title: 'Phụ kiện', icon: 'headphones' },
    // Thêm các mục khác nếu cần
  ];
  

const FitFinder = () => {
    const [selectedId, setSelectedId] = React.useState(null); 
    
    const renderItem = ({ item ,index}) => ( // Hàm render cho từng mục
        <TouchableOpacity onPress={() => setSelectedId(item.id)}>
        <View style={{paddingLeft: index === 0 ? 0 : 8, paddingRight:9, alignContent: 'center', alignItems: 'center'}}>
         <Block style={{width: 80, height: 80,
             backgroundColor:selectedId === item.id ? Colors.primary : Colors.background_fit_finder, borderRadius: 13, justifyContent: 'center', alignItems: 'center'}}>
     
         <Icon type="fontAwesome" name={item.icon} size={24} color={selectedId === item.id ? Colors.whiteF3 : Colors.black} />
         <Block mt="_10"/>
         <Text style={{color: selectedId === item.id ? Colors.whiteF3 : Colors.black, fontSize: 12, fontWeight: '500'}}>{item.title}</Text>
         </Block>
        </View>
    </TouchableOpacity>
        
       );
    return (
        <View style={{  justifyContent: 'center', alignItems: 'flex-start' }}>
       <FlatList // Thêm FlatList để hiển thị dữ liệu
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal // Đặt FlatList thành dạng ngang
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 0 }} // Đảm bảo không có padding

      />
        </View>
 
    );
}

export default FitFinder;