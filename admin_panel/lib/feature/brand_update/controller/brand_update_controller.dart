import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/product_create/model/brand_model.dart';

import 'package:get/get.dart';

class BrandUpdateController extends GetxController {
  Dio dio = Dio();
  final name = TextEditingController();
  final description = TextEditingController();
  final logo = TextEditingController();
  final brandType = TextEditingController();
  final banner = TextEditingController();
  final isLoading = false.obs;
  final brand = Rx<Brand?>(null);
  final isLoadingFetch = false.obs;
  final controllerBrand = Get.put(BrandController());
  var imageobs = ''.obs;
  
  @override
  void onInit() {
    super.onInit();
    logo.addListener((){
      imageobs.value = logo.text;
    });
  }

  Future<void> updateBrand(String brandId) async {
    try {
      isLoading.value = true;
      final response = await dio.put(ApiEndpoints.getBrandId(brandId), data: {
        'name': name.text,
        'description': description.text,
        'logo': logo.text,
        'banner': banner.text,
      });
      Get.back();
      controllerBrand.getBrand();
      Get.snackbar('Thành công', 'Thương hiệu đã được cập nhật thành công');
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> fetchBrandId(String brandId) async {
    isLoadingFetch.value = true;
    try {
      final response = await dio.get(ApiEndpoints.getBrandId(brandId));
      brand.value = Brand.fromJson(response.data);
      name.text = brand.value?.name ?? '';
      description.text = brand.value?.description ?? '';
      logo.text = brand.value?.logo ?? '';
      banner.text = brand.value?.banner ?? '';
    } catch (e) {
      print(e);
    } finally {
      isLoadingFetch.value = false;
    }
  }
}
