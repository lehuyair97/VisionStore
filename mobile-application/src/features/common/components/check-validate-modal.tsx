import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CenterModal from "./center-modal";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import useCommon from "@hooks/common/use-common";
export default function CheckValidateModal() {
  const { isOpenValidate, closeValidateModal } = useCommon();
  return (
    <CenterModal
      isOpen={isOpenValidate}
      handleClose={closeValidateModal}
      handleSubmit={() => {
        closeValidateModal(), navigate(ROUTES.Signin);
      }}
      title="Tính năng không khả dụng"
      labelText="Đăng nhập"
      description="Bạn cần đăng nhập để có thể sử dụng tính năng này"
    />
  );
}

const styles = StyleSheet.create({});
