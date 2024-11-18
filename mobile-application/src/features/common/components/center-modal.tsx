import { Image, Modal } from "react-native";
import { Block, Button, Row, Text } from "@components";
import { SCREEN_WIDTH } from "@utils/helper";
import theme from "@theme";
import { memo } from "react";
export type modalYesNoProp = {
  isOpen?: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  isCheckError?: boolean;
  title?: string;
  description?: string;
  labelText: string;
  icon?: any;
  children?: any;
};
const ModalCustom = (props: modalYesNoProp) => {
  const { isOpen, handleClose, handleSubmit, icon, children } = props;
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <Block
        flex={1}
        justifyContent={"center"}
        gap={"m"}
        alignItems={"center"}
        bg={"black18"}
      >
        <Block
          width={SCREEN_WIDTH * 0.86}
          pt="_25"
          alignItems="center"
          g="_10"
          bg="container"
          borderRadius="l"
        >
          <Block
            borderTopLeftRadius={"l"}
            borderTopRightRadius={"l"}
            position={"absolute"}
            width={"100%"}
            height={"100%"}
            style={{ backgroundColor: "#20496D", opacity: 0.02 }}
          />
          {icon && (
            <Image
              source={props.icon}
              style={{ width: 60, height: 60, marginTop: -50 }}
            />
          )}
          <Block alignItems="center" gap={"_12"}>
            <Text fontSize={18} fontWeight={"bold"} color={"black"}>
              {props.title}
            </Text>
            <Text
              fontSize={14}
              color={"gray136"}
              textAlign={"justify"}
              paddingHorizontal={"_32"}
            >
              {props.description}
            </Text>
          </Block>
          {children}
          <Row
            mt={"_30"}
            pb={"_15"}
            width={"100%"}
            gap={"_14"}
            backgroundColor={"container"}
            borderBottomLeftRadius={"l"}
            borderBottomRightRadius={"l"}
          >
            <Block flex={1} alignSelf={"center"}>
              <Button
                noneStyle
                buttonStyle={{
                  width: 80,
                  backgroundColor: "transparent",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  marginTop: 10,
                }}
                label="Hủy"
                textStyle={{ color: "black" }}
                onPress={handleClose}
              />
            </Block>
            <Button
              buttonStyle={{
                width: props.isCheckError ? 120 : 110,
                borderColor: props.isCheckError
                  ? theme.colors.blue_400
                  : theme.colors.primary,
                borderWidth: 1,
                borderRadius: 40,
                marginRight: 30,
              }}
              isOutline
              label={props.labelText}
              textStyle={{
                color: props.isCheckError
                  ? theme.colors.blue_400
                  : theme.colors.primary,
              }}
              onPress={handleSubmit}
            />
          </Row>
        </Block>
      </Block>
    </Modal>
  );
};
export default memo(ModalCustom);
