import { Button, Input, MainContainer } from "@components";
import Block from "@components/block";
import { Image, StyleSheet } from "react-native";
import AppBar from "./components/appbar";
import { localImages } from "@assets/icons/images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateEditProfile } from "@utils/validate";

export default function EditProfile() {
  interface EditProfile {
    display_name: string;
    email: string;
    phone_number: string;
    address: string;
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfile>({
    mode: "onChange",
    resolver: zodResolver(validateEditProfile),
  });
  return (
    <MainContainer>
      <Block bg={"primary"} width={"100%"} height={200}>
        <AppBar title="Chỉnh sửa trang cá nhân" />
      </Block>
      <Block mx={'l'}>
        <Image
          style={{
            marginTop: -80,
            resizeMode: "contain",
            width: 160,
            height: 160,
            alignSelf: "center",
          }}
          source={localImages().logo}
        />
        <Input
          name="display_name"
          label="Họ và tên"
          placeholder="Nhập tên hiển thị"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.display_name?.message}
          showError={!!errors.display_name?.message}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Nhập email"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.email?.message}
          showError={!!errors.email?.message}
        />
        <Input
          name="phone_number"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.phone_number?.message}
          showError={!!errors.phone_number?.message}
        />
        <Input
          name="address"
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.phone_number?.message}
          showError={!!errors.phone_number?.message}
        />
        <Button
          buttonStyle={{ marginTop: 30 }}
          label="Cập nhật"
          textStyle={{ color: "white" }}
          onPress={() => {
            handleSubmit((data) => {
              console.log("handleSubmit called with data: ", data);
            })();
          }}
        />
      </Block>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
