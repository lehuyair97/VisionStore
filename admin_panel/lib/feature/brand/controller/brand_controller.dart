import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
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
    brandDataSource.value = controller.brandList;
  }

}
