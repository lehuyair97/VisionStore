import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/brand_detail/model/product_model.dart';
import 'package:flutter_web/feature/brand_detail/widget/brand_detail_gridRow.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_web/feature/products/widget/product_gridRow.dart';
import 'package:get/get.dart';

class BrandDetailController extends GetxController {
  DioApi dioApi = DioApi();
  Dio dio = Dio();
  final searchController = TextEditingController();
 final List<ProductBrand> productBrand = <ProductBrand>[].obs; 
  BrandDetailGridRow brandDetailGridRow =   BrandDetailGridRow(products: []);
  final isLoading = false.obs;
  RxString bandID = ''.obs;
  List<dynamic> groupedProducts = [];
  BrandDetail? brandDetail;

  @override
  void onInit() {
    super.onInit();
  }

Future<void> fetchProductsGroupedByBrand(String bandID) async {
  print("bandID: $bandID");
  if (isLoading.value) return; // Prevent concurrent requests
  try {
    isLoading.value = true;
    
    final response = await dio.get(ApiEndpoints.brandDetail,
    queryParameters: {
      'brandId': bandID,});
    // Handle the "Too Many Requests" error
    if (response.statusCode == HttpStatusCodes.STATUS_CODE_TOO_MANY_REQUESTS) {
      Get.snackbar('Lỗi', 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau');
      return;
    }

    // Check if the response status code is OK (200)
    if (response.statusCode != HttpStatusCodes.STATUS_CODE_OK) {
      print("Lỗi khi lấy dữ liệu sản phẩm");
      return;
    }

    brandDetail = BrandDetail.fromJson(response.data['data']['brand']);

    // Parse the response data
    if (response.data != null && response.data['data']['products'] != null) {
      // Clear the current list before adding new data
      productBrand.clear();

      // Map the products data to ProductBrand models
      List<ProductBrand> products = (response.data['data']['products'] as List)
          .map((product) => ProductBrand.fromJson(product))
          .toList();

      // Add the parsed products to the productBrand list
      productBrand.addAll(products);

      brandDetailGridRow = BrandDetailGridRow(products: productBrand);
      brandDetailGridRow.notifyListeners();
    }
  } catch (e) {
    print("Error fetching products: $e");
    Get.snackbar('Lỗi', 'Đã có lỗi xảy ra khi tải dữ liệu');
  } finally {
    isLoading.value = false;
  }
}


  Future<void> deleteProduct(String productId) async {
    await dio.delete(ApiEndpoints.deleteProduct(productId));
    fetchProductsGroupedByBrand(bandID.value);
  }

  Future<void> deleteProductById(String productId) async {
    CustomDialog()
        .showConfirmationDialog(
      'Xóa sản phẩm',
      'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      height: 0.3,
    )
        .then((value) {
      if (value ?? false) {
        dio.delete(ApiEndpoints.deleteProduct(productId)).then((value) {
          fetchProductsGroupedByBrand(bandID.value);
        });
      }
    });
  }


}
