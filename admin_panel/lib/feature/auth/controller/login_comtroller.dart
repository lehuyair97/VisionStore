import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/feature/auth/model/user.dart';
import 'package:flutter_web/router/app_router.dart';
import 'package:get/get.dart';

class LoginController extends GetxController {
  DioApi dioApi = DioApi();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final isLoading = false.obs;

  Future<void> login() async {
    final email = emailController.text;
    final password = passwordController.text;
    try {
      isLoading.value = true;
      if (email.isEmpty || password.isEmpty) {
        Get.snackbar('Thông báo', 'Vui lòng nhập đẩy đủ thông tin');
        return;
      }
      final response = await dioApi.post(ApiEndpoints.login, data: {
        'email': email,
        'password': password,
      });
      if (response.statusCode != HttpStatusCodes.STATUS_CODE_OK) {
        Get.snackbar('Thông báo', 'Đăng nhập thất bại');
        return;
      }

      final user = User.fromJson(response.data);
      if (user.role == 'client') {
        Get.snackbar('Thông báo', 'Bạn không có quyền truy cập');
        return;
      }
      Get.offAllNamed(AppRouter.dashboard);
    } catch (e) {
      print("Lỗi: $e");
      Get.snackbar('Thông báo', 'Đăng nhập thất bại');
    } finally {
      isLoading.value = false;
    }
  }
}
