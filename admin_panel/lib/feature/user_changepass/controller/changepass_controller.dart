import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';

import 'package:get/get.dart';

class ChangePassController extends GetxController {
  Dio dio = Dio();
  final password = TextEditingController();
  final confirmPassword = TextEditingController();

  final isLoading = false.obs;
  final isLoadingFetch = false.obs;

  @override
  void onInit() {
    super.onInit();
  }

  Future<void> changePassword(String userId) async {
    try {
      isLoading.value = true;
      final response =
          await dio.put(ApiEndpoints.changePassword(userId), data: {
        'password': password.text,
        'confirmPassword': confirmPassword.text,
      });
      if (response.statusCode != HttpStatusCodes.STATUS_CODE_OK) {
        Get.snackbar('Thất bại', 'Mật khẩu không hợp lệ');
        return;
      }

      Get.back();
      Get.snackbar('Thành công', 'Mật khẩu đã được cập nhật thành công');
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }
}
