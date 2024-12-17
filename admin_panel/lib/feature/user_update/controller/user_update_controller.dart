import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/auth/model/user.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/product_create/model/brand_model.dart';
import 'package:flutter_web/feature/user/controller/user_controller.dart';

import 'package:get/get.dart';

class UserUpdateController extends GetxController {
  Dio dio = Dio();
  final isLoading = false.obs;
  final user = Rx<User?>(null);
  final isLoadingFetch = false.obs;
  final name = TextEditingController();
  final email = TextEditingController();
  final phoneNumber = TextEditingController();
  final avatar = TextEditingController();
  final addressSelected = TextEditingController();
  var imageobs = ''.obs;

  final controllerUser = Get.put(UserController());

  @override
  void onInit() {
    super.onInit();
    avatar.addListener(() {
      imageobs.value = avatar.text;
    });
  }

  Future<void> updateUser(String userId) async {
    print("userId: $userId");
    try {
      isLoading.value = true;
      final response = await dio.put(ApiEndpoints.updateUser(userId), data: {
        'name': name.text,
        'email': email.text,
        'phoneNumber': phoneNumber.text,
        'avatar': avatar.text,
        'addressSelected': addressSelected.text,
      });
      print("response: ${response.statusCode}");
      if (response.statusCode == HttpStatusCodes.STATUS_CODE_OK) {
        Get.back();
        controllerUser.fetchUserList();
        Get.snackbar('Thành công', 'Người dùng đã được cập nhật thành công');
      }
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> fetchUserId(String userId) async {
    isLoadingFetch.value = true;
    try {
      final response = await dio.get(ApiEndpoints.getUserId(userId));
      user.value = User.fromJson(response.data);
      name.text = user.value?.userName ?? '';
      email.text = user.value?.email ?? '';
      phoneNumber.text = user.value?.phoneNumber ?? '';
      avatar.text = user.value?.avatar ?? '';
      addressSelected.text = user.value?.address?.first.detail ?? '';
    } catch (e) {
      print(e);
    } finally {
      isLoadingFetch.value = false;
    }
  }

  Future<void> deleteUserById(String userId) async {
    CustomDialog()
        .showConfirmationDialog(
      'Xóa sản phẩm',
      'Bạn có chắc chắn muốn xóa người dùng này không?',
      height: 0.3,
    )
        .then((value) {
      if (value ?? false) {
        dio.delete(ApiEndpoints.getUserId(userId)).then((value) {
          controllerUser.fetchUserList();
        });
      }
    });
  }
}
