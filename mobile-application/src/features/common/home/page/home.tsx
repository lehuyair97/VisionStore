import { Block, Button, Icon, MainContainer, Row, Text } from "@components";
import { EDGES } from "@utils/helper";
import TextHome from "../component/text_home";
import AppBar from "../component/appbar";
import Banner from "../component/banner";
import FitFinder from "../component/fit_finder";
import FitAdvisor from "../component/fit_advisor";
import ListMac from "../component/list_mac";
import { ScrollView } from "react-native-virtualized-view";
import useCategory, { Category } from "@hooks/common/use-category";
import useGetProductGrouped from "@hooks/common/use-get-products-grouped";
import { ProductResponse } from "@hooks/common/use-get-product-by-brand";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "@navigation/config/routes";

const images = [
  require("../../../../assets/icons/banner.png"),
  require("../../../../assets/icons/banner2.png"),
  require("../../../../assets/icons/banner.png"),
];

const iconMap: { [key: string]: string } = {
  Laptop: "home",
  PC: "desktop",
  "Linh  kiện": "microchip",
  "Phụ kiện": "headphones",
};

const datafitAdvisor = [
  // Tạo dữ liệu cho FlatList
  { id: "1", title: "Tất cả" },
  { id: "2", title: "Macbook" },
  { id: "3", title: "Mac mini" },
  { id: "4", title: "Mac pro" },
];

export default function Home() {
  const { data: category, isLoading, error } = useCategory();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
const navigation = useNavigation();

const handleNavigateToDetailProduct = () => {
  navigation.navigate(ROUTES.DetailProduct as never);
};

  
  const { data: dataProducts } = useGetProductGrouped(selectedId || (category && category[0]._id));


  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!category || category.length === 0) return <Text>No categories available</Text>;

  const data = category.map((item: Category) => ({
    id: item._id,
    title: item.name,
    icon: iconMap[item.name] || "home",
  }));

  const products = (dataProducts as unknown as { brand: string; products: any[] }[]) || [];
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}
      >
        <AppBar />
        <Block mt="_20" />
        <Banner images={images} />
        <Block mt="_20" />
        <FitFinder data={data} onPress={
          (id: string) => {
            setSelectedId(id);
          }
        } />
        <Block mt="_15" />
        <FitAdvisor data={datafitAdvisor} />
        <Block mt="_15" />
        <ListMac data={products} 
        handleNavigateToDetailProduct={handleNavigateToDetailProduct} />
        <Block mt="_15" />

      </ScrollView>
    </MainContainer>
  );
}
