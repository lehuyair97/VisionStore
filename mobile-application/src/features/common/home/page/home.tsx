import { Block, Button, Icon, MainContainer, Row, Text } from "@components";
import { EDGES } from "@utils/helper";
import TextHome from "../component/text_home";
import AppBar from "../component/appbar";
import Banner from "../component/banner";
import FitFinder from "../component/fit_finder";
import FitAdvisor from "../component/fit_advisor";
import ListMac from "../component/list_mac";



export default function Home() {
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block flex={1} mt="_40" style={{ paddingHorizontal: 20 }}>
        <AppBar />
        <Block mt="_20"/>
        <Banner />
        <Block mt="_20"/>
        <FitFinder />
        <Block mt="_15"/>
        <FitAdvisor />
        <Block mt="_15"/>
        <ListMac />
        
      </Block>
    </MainContainer>
  );
}
