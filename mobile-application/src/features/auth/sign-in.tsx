import { localImages } from "@assets/icons/images";
import { Block, Button, Input, MainContainer, Row, Text } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useSignIn } from "@hooks/auth";
import useSignInGoogle from "@hooks/auth/use-signin-google";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { signInForm } from "@navigation/config/types";
import messaging from "@react-native-firebase/messaging";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import theme from "@theme";
import { EDGES } from "@utils/helper";
import { validateUser } from "@utils/validate";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Image } from "react-native";

function Signin({ navigation }) {
  const { handleLoginSuccess, errorSignin } = useAuth();
  const { submit, submitting } = useSignIn();
  const { submit: signInByGoogle, submitting: googleSubmitting } =
    useSignInGoogle();
  const {
    control,
    getValues,
    setError,
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
    setError("password", {
      type: "manual",
      message: errorSignin,
    });
    console.log('value ', errorSignin)
  }, [errorSignin]);
  const handleSignIn = async (type: "normal" | "google") => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    const token = await messaging().getToken();
    const data = getValues();
    const userForm = { ...data, ...{ device_token: token } };

    const { accessToken, isSuccess, refreshToken, user } =
      type === "normal" ? await submit(userForm) : await signInByGoogle(token);
    if (isSuccess) {
      navigate(ROUTES.Home);
      handleLoginSuccess({
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      });
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
          onPress={() => navigation.navigate(ROUTES.Home)}
          label="Trải nghiệm ngay mà không cần đăng ký"
          noneStyle
          buttonStyle={{ alignSelf: "center", marginTop: 20 }}
          textStyle={{
            color: theme.colors.primary,
            fontWeight: "bold",
            textAlign: "center",
            fontStyle: "italic",
          }}
        />
        <Button
          buttonStyle={{ marginTop: 20 }}
          label="Đăng nhập"
          textStyle={{ color: "white" }}
          onPress={() => handleSignIn("normal")}
          isLoadding={submitting}
        />

        <Button
          leadingImage={localImages().ic_google}
          noneStyle
          buttonStyle={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderWidth: 1,
            height: 48,
            borderColor: theme.colors.grayB8,
            marginTop: 10,
          }}
          label="Đăng nhập bằng Google"
          onPress={() => handleSignIn("google")}
          isLoadding={googleSubmitting}
          textStyle={{ color: "black" }}
        />

        <Row justifyContent="center" marginVertical={"_20"}>
          <Text
            fontWeight="bold"
            textAlign="center"
            color="black"
            fontSize={14}
          >
            Bạn chưa có tài khoản?
          </Text>
          <Button
            onPress={() => navigation.navigate(ROUTES.SignUp)}
            label="Đăng ký"
            noneStyle
            textStyle={{ color: theme.colors.primary, fontWeight: "bold" }}
          />
        </Row>
      </Block>
    </MainContainer>
  );
}

export default memo(Signin);
