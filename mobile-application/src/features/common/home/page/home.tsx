import { Block, Button, Icon, MainContainer, Row, Text } from "@components";
import { EDGES } from "@utils/helper";
import TextHome from "../component/text_home";
import AppBar from "../component/appbar";
import Banner from "../component/banner";
import FitFinder from "../component/fit_finder";
import FitAdvisor from "../component/fit_advisor";
import ListMac from "../component/list_mac";
import { ScrollView } from 'react-native-virtualized-view'

const images = [
  require('../../../../assets/icons/banner.png'),
  require('../../../../assets/icons/banner2.png'),
  require('../../../../assets/icons/banner.png'),
];
const data = [ // Tạo dữ liệu cho FlatList
  { id: '1', title: 'Laptop', icon: 'home' },
  { id: '2', title: 'Pc', icon: 'desktop' },
  { id: '3', title: 'Linh Kiện', icon: 'microchip' },
  { id: '4', title: 'Phụ kiện', icon: 'headphones' },
  // Thêm các mục khác nếu cần
];

const datafitAdvisor = [ // Tạo dữ liệu cho FlatList
  { id: '1', title: 'Tất cả' },
  { id: '2', title: 'Macbook' },
  { id: '3', title: 'Mac mini' },
  { id: '4', title: 'Mac pro' },
];

const dataListMac = [ // Tạo dữ liệu cho FlatList
  { id: '1', name: 'MacBook Pro', year: '2021', price: '$129,009', image: require('../../../../assets/icons/mac.png') },
  { id: '2', name: 'MacBook Air', year: '2020', price: '$99,900', image: require('../../../../assets/icons/mac.png') },
  { id: '3', name: 'iMac', year: '2021', price: '$179,009', image: require('../../../../assets/icons/mac.png') },
  { id: '4', name: 'Mac Mini', year: '2020', price: '$69,900', image: require('../../../../assets/icons/mac.png') },
  // Thêm các mục khác nếu cần
];

export default function Home() {
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}>
        <AppBar />
        <Block mt="_20"/>
        <Banner images={images}/>
        <Block mt="_20"/>
        <FitFinder data={data} />
        <Block mt="_15"/>
        <FitAdvisor data={datafitAdvisor} />
        <Block mt="_15"/>
        <ListMac data={dataListMac} />
        <Block mt="_15"/>
        <ListMac data={dataListMac} />
        <Block mt="_15"/>
        <ListMac data={dataListMac} />
      </ScrollView>
    </MainContainer>
  );
}