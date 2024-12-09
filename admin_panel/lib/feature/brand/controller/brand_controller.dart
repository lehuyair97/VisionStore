import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/product_create/model/brand_model.dart';
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
      List<dynamic> brandListJson = response.data;

      List<Brand> brands = brandListJson.map((e) => Brand.fromJson(e)).toList();

      brandDataSource.value = brands;
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> deleteBrand(String id) async {
    CustomDialog()
        .showConfirmationDialog(
      height: 0.3,
      'Xóa thương hiệu',
      'Bạn có chắc chắn muốn xóa thương hiệu này không?',
    )
        .then((value) async {
      if (value != null && value) {
        await dio.delete(ApiEndpoints.deleteBrand(id));
        getBrand();
      }
    });
  }
}
