import { memo } from "react";
import { Image } from "react-native";
import { validateUser } from "@utils/validate";

import { MainContainer, Block, Input, Button } from "@components";
import { localImages } from "@assets/icons/images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpForm } from "@navigation/config/types";
import { useAuth, useSignUp } from "@hooks/auth";

const SignUp = () => {
  const { submit: submitSignUp } = useSignUp();
  const { handleLoginSuccess } = useAuth();

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<signUpForm>({
    resolver: zodResolver(validateUser),
    mode: "onChange",
    defaultValues: {
      display_name: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  const handleSignUp = async () => {
    const data = getValues();
    const { re_password, ...newData } = data;
    if (Object.keys(errors).length === 0) {
      const { accessToken, isSuccess, refreshToken, user } = await submitSignUp(
        newData
      );
      if (isSuccess) {
        handleLoginSuccess({
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        });
      }
    } else {
      console.log("Errors:", errors);
    }
  };

  return (
    <MainContainer>
      <Block flex={1} mx="l" gap="_10" my={"_40"}>
        <Image
          style={{ width: "50%", resizeMode: "contain", alignSelf: "center" }}
          source={localImages().logo}
        />
        <Input
          name="display_name"
          label="Display name"
          placeholder="Nhập tên của bạn"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.display_name?.message}
          showError={!!errors.display_name?.message}
        />
        <Input
          name="username"
          label="Email"
          placeholder="Nhập email của bạn"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.email?.message}
          showError={!!errors.email?.message}
        />
        <Input
          name="password"
          label="Password"
          placeholder="Nhập mật khẩu"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.password?.message}
          showError={!!errors.password?.message}
          secureTextEntry={true}
        />
        <Input
          name="re_password"
          label="Re_Password"
          placeholder="Nhập mật khẩu"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.re_password?.message}
          showError={!!errors.re_password?.message}
          secureTextEntry={true}
        />
        <Button
          buttonStyle={{ marginTop: 30 }}
          label="Đăng Ký"
          textStyle={{ color: "white" }}
          onPress={handleSignUp}
        />
      </Block>
    </MainContainer>
  );
};

export default memo(SignUp);
