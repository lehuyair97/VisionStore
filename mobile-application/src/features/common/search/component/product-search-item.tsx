import { Row, Text } from "@components";
import Colors from "@theme/colors";
import { View, Image, TouchableOpacity } from "react-native";
import Block from "@components/block";

// Định nghĩa kiểu Product dựa trên dữ liệu bạn đã cung cấp
interface Product {
  _id: string;
  brand: string;
  category_id: string;
  create_date: string;
  description: string;
  descriptions: string;
  id: string;
  image: string;
  name: string;
  option_id: string;
  parent_product_id: string | null;
  price: number;
  products_child: any[];
  sku: string;
  stock: number;
  sub_category_id: string;
  thumbnail: string;
  warrantyPeriod: string;
  weight: number;
}

interface ProductSearchItemProps {
  handleNavigateToDetailProduct: (id: string) => void;
  item: Product;
}

const ProductSearchItem = ({ item, handleNavigateToDetailProduct }: ProductSearchItemProps) => {
  return (
    <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 10}} onPress={() => handleNavigateToDetailProduct(item._id)}>
      <Row>
        {item.image  ? <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 10, resizeMode: "contain" }} /> 
        : <View style={{backgroundColor: Colors.gray136, width: 100, height: 100, borderRadius: 10 }} />}

        <Block width={14}/>
        <View>
          <Text fontSize={16} fontWeight="600" color="black2A">{item.name}</Text>
          <Block height={10}/>
          <Text fontSize={14} fontWeight="400" color="black2A">{item.price}</Text>
          <Block height={10}/>
          <Text fontSize={14} fontWeight="400" color="black2A">{item.warrantyPeriod}</Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default ProductSearchItem;