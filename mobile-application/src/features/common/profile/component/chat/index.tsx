import { Icon, MainContainer, Row } from "@components";
import Block from "@components/block";
import { TextInput } from "@components/text-input";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import theme from "@theme";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useSendMessage from "@hooks/common/use-send-message";
import { useAuth } from "@hooks/auth";
export default function Chat() {
  const [message, setMessage] = useState<string>();
  const { userInfo } = useAuth();
  const { sendMessage } = useSendMessage();
  const handleSendMessage = async () => {
    if (message) {
      await sendMessage({ idClient: userInfo._id, content: message }).then(
        (data) => console.log(data)
      );
    }
  };
  return (
    <MainContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <AppBarCustom
              title="Trung tâm hỗ trợ"
              iconLeft
              titleCenter
              isBackground
              paddingHorizontal={20}
              paddingVertical={10}
            />
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              keyboardShouldPersistTaps="handled"
            >
              <Block style={{ flex: 1 }}></Block>
            </ScrollView>

            <View style={styles.bottomInputContainer}>
              <Row center between padding={"s"} backgroundColor={"container"}>
                <TextInput
                  value={message}
                  placeholder="Type a message"
                  onChangeText={setMessage}
                  containerStyle={{ flex: 1, backgroundColor: "white" }}
                  inputContainerStyle={{
                    backgroundColor: "white",
                    borderWidth: 0,
                  }}
                />
                <TouchableOpacity hitSlop={10} onPress={handleSendMessage}>
                  <Icon
                    type="feather"
                    name="send"
                    size={24}
                    color={theme.colors.red_500}
                  />
                </TouchableOpacity>
              </Row>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Để tránh nội dung bị che bởi phần input
  },
  bottomInputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    elevation: 10, // Tạo bóng cho BottomTab
  },
});
