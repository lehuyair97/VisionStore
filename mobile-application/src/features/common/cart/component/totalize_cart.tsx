import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Block from "@components/block";
import { Icon } from '@components'; // Giả sử bạn có một component Icon
import Colors from '@theme/colors';
import { useNavigation } from '@react-navigation/native'; // Thêm dòng này


interface TotalizeCartProps {
  onPress?: () => void;
  onSelectAll?: (selectAll: boolean) => void;
  totalPrice: number;
  
  
}
const TotalizeCart = ({onPress, onSelectAll, totalPrice}: TotalizeCartProps) => {
    const navigation = useNavigation();
  const [isAllSelected, setIsAllSelected] = useState(false);

  const toggleSelectAll = () => {
    const newSelectAllState = !isAllSelected;
    setIsAllSelected(newSelectAllState);
    onSelectAll && onSelectAll(newSelectAllState);
  };

  return (
    
    <Block style={styles.container}>
      <TouchableOpacity onPress={toggleSelectAll} style={styles.checkbox}>
        <Icon
          type="fontAwesome"
          name={isAllSelected ? 'check-square' : 'square'}
          size={20}
          color={isAllSelected ? Colors.primary : Colors.text}
        />
        <Block mr={"_10"}/>
        <Text style={styles.text}>Tất cả</Text>
      </TouchableOpacity>
      <Block flex={1}/>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng: <Text style={styles.price}>{totalPrice} đ</Text></Text>
        <Block mt={"_5"}/>
        <Text style={styles.shippingText}>phí vận chuyển 0 đ</Text>
      </View>
      <Block m={"_10"}/>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:20,
    backgroundColor: '#f9f9f9',
    paddingHorizontal:20
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
    fontSize: 14,
  },
  totalContainer: {
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.primary,
  },
  shippingText: {
    fontSize: 10,
    color: 'gray',
    textAlign:"right"
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default TotalizeCart;
