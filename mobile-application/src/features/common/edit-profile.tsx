import { Button, Input, MainContainer } from "@components";
import Block from "@components/block";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AppBar from "./components/appbar";
import { localImages } from "@assets/icons/images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateEditProfile } from "@utils/validate";
import { useAuth } from "@hooks/auth";
import useEditProfile from "@hooks/common/use-edit-profile";
export default function EditProfile() {
  const { userInfo } = useAuth();
  const { editProfile, isPending } = useEditProfile(userInfo?._id);
  const hasAvatar = userInfo?.avatar && userInfo?.avatar;
  
  interface EditProfile {
    display_name: string;
    email: string;
    phone_number: string;
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfile>({
    mode: "onChange",
    resolver: zodResolver(validateEditProfile),
    defaultValues: {
      email: userInfo?.email,
      display_name: userInfo?.display_name,
      phone_number:'0'+ userInfo?.phoneNumber.toString(),
    },
  });

  const handleEditProfile = async (data: EditProfile) => {
    await editProfile({
      display_name: data.display_name,
      phoneNumber: data.phone_number,
    }).then((data) => {
      if(data?.isSuccess){
        
      }
    });
  };

  return (
    <MainContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Block bg={"primary"} width={"100%"} height={180}>
              <AppBar title="Chỉnh sửa trang cá nhân" />
            </Block>
            <Block mx={"l"}>
              <Image
                style={{
                  marginTop: -80,
                  resizeMode: "contain",
                  width: 160,
                  height: 160,
                  alignSelf: "center",
                  borderRadius: 160,
                }}
                source={
                  hasAvatar ? { uri: hasAvatar } : localImages().default_avatar
                }
              />
              <Input
                containerStyle={{ marginVertical: 20 }}
                name="display_name"
                label="Họ và tên"
                placeholder="Nhập tên hiển thị"
                labelStyle={{ fontSize: 14 }}
                control={control}
                error={errors.display_name?.message}
                showError={!!errors.display_name?.message}
              />
              <Input
                containerStyle={{ marginBottom: 20 }}
                name="email"
                label="Email"
                placeholder="Nhập email"
                labelStyle={{ fontSize: 14 }}
                control={control}
                error={errors.email?.message}
                showError={!!errors.email?.message}
                editable={false}
              />
              <Input
                containerStyle={{ marginBottom: 20 }}
                name="phone_number"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                labelStyle={{ fontSize: 14 }}
                control={control}
                error={errors.phone_number?.message}
                showError={!!errors.phone_number?.message}
              />
              <Button
                buttonStyle={{ marginTop: 30 }}
                label="Cập nhật"
                textStyle={{ color: "white" }}
                isLoadding={isPending}
                onPress={handleSubmit(handleEditProfile)}
              />
            </Block>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
