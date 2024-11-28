import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/feature/auth/model/user.dart';
import 'package:flutter_web/feature/user/widget/user_gridRow.dart';
import 'package:get/get.dart';

class UserController extends GetxController {
  Dio dio = Dio();
  final searchController = TextEditingController();
  final userList = <User>[].obs;
  final userDataSource = <UserGridDataSource>[].obs;
  final isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchUserList();
  }

  Future<void> fetchUserList() async {
    try {
      isLoading.value = true;
      final response = await dio.get(
        ApiEndpoints.users,
      );
      if (response.statusCode == 200) {
        userList.value = (response.data as List)
            .map((userJson) => User.fromJson(userJson))
            .toList();
        userDataSource.value = [UserGridDataSource(users: userList.value)];
      }
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }
}
