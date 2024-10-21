import { memo } from "react";
import { Image } from "react-native";
import { validateUser } from "@utils/validate";

import { MainContainer, Block, Input, Button } from "@components";
import { localImages } from "@assets/icons/images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpForm } from "@navigation/config/types";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpForm>({
    resolver: zodResolver(validateUser),
    mode: "onChange",
    defaultValues: {
      display_name: "",
      username: "",
      password: "",
      re_password: "",
    },
  });

  const handleSignUp = () => {};

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
          error={errors.username?.message}
          showError={!!errors.username?.message}
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
          onPress={handleSubmit(handleSignUp)}
        />
      </Block>
    </MainContainer>
  );
};

export default memo(SignUp);

