import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/feature/create_product/controller/create_product_controller.dart';
import 'package:flutter_web/feature/create_product/model/brand_model.dart';
import 'package:get/get.dart';

class BrandController extends GetxController {
  final controller = Get.put(CreateProductController());
  Dio dio = Dio();
  final isLoading = false.obs;
  final brandDataSource = <Brand>[].obs;
  final searchController = TextEditingController().obs;

  @override
  void onInit() {
    super.onInit();
    getBrand();
  }

  Future<void> getBrand() async {
    try {
      isLoading.value = true;
      final response = await dio.get(ApiEndpoints.getBrand);

      brandDataSource.clear();
      // Giả sử response.data là một danh sách JSON
      List<dynamic> brandListJson = response.data;

      // Chuyển đổi từng phần tử trong danh sách thành Brand
      List<Brand> brands = brandListJson.map((e) => Brand.fromJson(e)).toList();

      // Cập nhật brandDataSource với danh sách mới
      brandDataSource.value = brands;
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }
}
