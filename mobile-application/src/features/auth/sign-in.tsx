import { Image } from "react-native";
import { memo } from "react";
import { MainContainer, Input, Block, Button, Text, Row } from "@components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateUser } from "@utils/validate";
import { signInForm } from "@navigation/config/types";
import { EDGES } from "@utils/helper";
import { localImages } from "@assets/icons/images";
import { useAuth, useSignIn } from "@hooks/auth";
import theme from "@theme";

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

function Signin() {
  const { handleLoginSuccess } = useAuth();
  const { submit, submitting } = useSignIn();
  

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<signInForm>({
    resolver: zodResolver(validateUser),
    mode: "onChange",
    defaultValues: {
      email: __DEV__ ? "lehuyair@gmail.com" : "",
      password: __DEV__ ? "123" : "",
    },
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "796239183008-229vcarahasokpb1hm3nnve5jl3s5vse.apps.googleusercontent.com", // Sử dụng client_id từ Firebase
    });
  }, []);

  const signin = async () => {
    console.log("Attempting to sign in...");
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log("User data: ", user);
    } catch (e) {
      console.error("Sign in error: ", e);
    }
  };


  const handleSignIn = async () => {
    const data = getValues();
    console.log(data);
    if (Object.keys(errors).length === 0) {
      const { accessToken, isSuccess, refreshToken, user } = await submit(data);
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
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block flex={1} mx="l" gap="_10" my={"_100"}>
        <Image
          style={{ width: "50%", resizeMode: "contain", alignSelf: "center" }}
          source={localImages().logo}
        />
        <Input
          name="email"
          label="Username"
          placeholder="Nhập email"
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
        <Button
          buttonStyle={{ marginTop: 30 }}
          label="Đăng nhập"
          textStyle={{ color: "white" }}
          onPress={handleSignIn}
          isLoadding={submitting}
        />
        <Row center alignSelf="center" gap={"_20"} my={"_30"}>
          <Button noneStyle>
            <Image
              style={{
                width: 55,
                height: 55,
                resizeMode: "stretch",
                borderRadius: 55,
              }}
              source={localImages().ic_google}
            />
          </Button>
          <Button noneStyle>
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: 55,
                resizeMode: "stretch",
              }}
              source={localImages().ic_facebook}
            />
          </Button>
        </Row>
        <Row justifyContent="center">
          <Text
            fontWeight="bold"
            textAlign="center"
            color="black"
            fontSize={14}
          >
            Bạn đã có tài khoản?
          </Text>
          <Button
            label="Đăng ký"
            noneStyle
            textStyle={{ color: theme.colors.primary, fontWeight: "bold" }}
          />
        </Row>
              <GoogleSigninButton
           size={GoogleSigninButton.Size.Standard}
           color={GoogleSigninButton.Color.Dark}
           onPress={signin}
         />
      </Block>
    </MainContainer>
  );
}

export default memo(Signin);
