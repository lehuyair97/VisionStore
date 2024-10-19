import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import Block from '@components/block';
import { Icon } from '@components';
import Colors from '@theme/colors';

interface RenderItemProps {
  item: any;
  index: number;
  selectedId: any;
  color?: string;
  colorHover?: string;
  colorIcon?: string;
  setSelectedId: (id: any) => void;
}

const RenderItem = ({ item, index, selectedId, color, colorHover, colorIcon, setSelectedId }: RenderItemProps) => (
  <TouchableOpacity onPress={() => setSelectedId(item.id)}>
    <View style={{ paddingLeft: index === 0 ? 0 : 8, paddingRight: 9, alignContent: 'center', alignItems: 'center' }}>
      <Block style={{
        width: 80, height: 85,
        backgroundColor: selectedId === item.id ? colorHover : color,
        borderRadius: 13, justifyContent: 'center', alignItems: 'center'
      }}>
        {item.icon 
        ? <Icon type="fontAwesome" name={item.icon} size={24} color={selectedId === item.id ? colorIcon??Colors.black : Colors.black} /> 
        :  <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 100 }} />}
        <Block mt="_15" />
        <Text style={{ color: selectedId === item.id ? colorIcon : Colors.black, fontSize: 12, fontWeight: '500', textAlign: 'center' }}>{item.title}</Text>
      </Block>
    </View>
  </TouchableOpacity>
);

export default RenderItem;