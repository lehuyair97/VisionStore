import { memo } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { validateUser } from "@utils/validate";
import { useAuth, useSignUp } from "@hooks/auth";
import { localImages } from "@assets/icons/images";
import { ROUTES } from "@navigation/config/routes";
import { navigate } from "@navigation/config/navigation-service";
import theme from "@theme";

import { MainContainer, Block, Input, Button, Row } from "@components";
import Text from "@components/text";

import { signUpForm } from "@navigation/config/types";

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
          accessToken,
          refreshToken,
          user,
        });
      }
    } else {
      console.log("Errors:", errors);
    }
  };

  return (
    <MainContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={20}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Block flex={1} mx="l" gap="_10" my="_40">
              <Image
                style={{
                  width: "50%",
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
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
                name="email"
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
                secureTextEntry
              />
              <Input
                name="re_password"
                label="Re_Password"
                placeholder="Nhập lại mật khẩu"
                labelStyle={{ fontSize: 14 }}
                control={control}
                error={errors.re_password?.message}
                showError={!!errors.re_password?.message}
                secureTextEntry
              />
              <Button
                buttonStyle={{ marginTop: 30 }}
                label="Đăng Ký"
                textStyle={{ color: "white" }}
                onPress={handleSignUp}
              />
            </Block>
            <Row justifyContent="center" marginVertical="_20">
              <Text
                fontWeight="bold"
                textAlign="center"
                color="black"
                fontSize={14}
              >
                Bạn đã có tài khoản?
              </Text>
              <Button
                onPress={() => navigate(ROUTES.Signin)}
                label="Đăng nhập"
                noneStyle
                textStyle={{ color: theme.colors.primary, fontWeight: "bold" }}
              />
            </Row>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </MainContainer>
  );
};

export default memo(SignUp);
