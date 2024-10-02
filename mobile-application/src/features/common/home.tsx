import { Block, Button, Icon, MainContainer, Row, Text } from "@components";

import { EDGES } from "@utils/helper";

export default function Home() {
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block flex={1} mt="_40">
        <Text>Hello</Text>
      </Block>
    </MainContainer>
  );
}
