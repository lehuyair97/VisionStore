import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:get/get.dart';

class BrandCreateController extends GetxController {
  Dio dio = Dio();
  final name = TextEditingController();
  final description = TextEditingController();
  final logo = TextEditingController();
  final brandType = TextEditingController();
  final isLoading = false.obs;

  final controllerBrand = Get.put(BrandController());

  @override
  void onInit() {
    super.onInit();
  }

  Future<void> createBrand() async {
    isLoading.value = true;
    try {
      final response = await dio.post(ApiEndpoints.getBrand, data: {
        'name': name.text,
      'description': description.text,
      'logo': logo.text,
      'brandType': brandType.text,
      });
      print(response.data);
      if (response.statusCode != HttpStatusCodes.STATUS_CODE_CREATED ) return;
      controllerBrand.getBrand();
      Get.snackbar('Thành công', 'Thương hiệu đã được tạo thành công');
      Get.back();
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }
}
