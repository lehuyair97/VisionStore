import { MainContainer } from "@components";
import MainNavigation from "@navigation/scenes";
import { commonStyles } from "../styles/styles";
import Text from "@components/text";
import { EDGES } from "@utils/helper";
import { FlatList, View } from "react-native";
import Block from "@components/block";
import RenderItem from "@features/common/profile/component/renderitem";
import { useState } from "react";


interface TrademarkProps {
    data: any;
}

const Trademark = ({ data }: TrademarkProps) => {
    const [selectedId, setSelectedId] = useState(null);
    return (
        <MainContainer edges={EDGES.LEFT_RIGHT} style={commonStyles.container}>
            <Text style={commonStyles.title}> Bạn quan  tâm</Text>
            <Block mt="_10" />
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <RenderItem
                            item={item}
                            index={index}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}

                        />
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 0 }}
                />
            </View>
        </MainContainer>
    );
}

export default Trademark;