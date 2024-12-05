import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/accessory/model/sub_category_model.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_web/feature/products/widget/product_gridRow.dart';
import 'package:get/get.dart';

class ComputerAccessoriesController extends GetxController {
  DioApi dioApi = DioApi();
  Dio dio = Dio();
  final productSup = <ProductItem>[].obs;
  final searchController = TextEditingController();
  final subCateId = ''.obs;
  ProductGridDataSource productGridDataSource =
      ProductGridDataSource(products: []);
  final List<SubCategory> accessoriesList = [];

  final String sunCateId = "";
  final isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetch_accessories();
  }

  Future<void> fetch_sub_product(String sunCateId) async {
    print("sunCateIda$sunCateId");
    if (isLoading.value) return;
    print("loading...");
    try {
      isLoading.value = true;
      // if (productSup != '') {
      //   productGridDataSource.clearColumnGroups();
      // }
      final response = await dio.get(ApiEndpoints.productSub(sunCateId));
      print("fetch_sub: ${response.data}");
      if (response.statusCode ==
          HttpStatusCodes.STATUS_CODE_TOO_MANY_REQUESTS) {
        Get.snackbar(
            'Lỗi', 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau');
        return;
      }

      if (response.statusCode != HttpStatusCodes.STATUS_CODE_OK) {
        print("Lỗi khi lấy dữ liệu sản phẩm");
        return;
      }

      
      if (response.data.isEmpty) {
        print("Dữ liệu sản phẩm là null");
        return;
      }
      List<dynamic> productListJson = response.data;
      List<ProductItem> products =
          productListJson.map((item) => ProductItem.fromJson(item)).toList();


      productSup.value = products;
      productGridDataSource = ProductGridDataSource(products: productSup);
      productGridDataSource.notifyListeners();
    } catch (e) {
      print("Error fetching products: $e");
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> fetch_accessories() async {
    try {
      final response = await dio.get(ApiEndpoints.accessories);
      accessoriesList.addAll(
        List<SubCategory>.from((response.data['sub_category_list'] as List)
            .map((e) => SubCategory.fromJson(e))),
      );
    } catch (e) {}
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
          fetch_sub_product(subCateId.value);
        });
      }
    });
  }

  void onPageChanged(int pageIndex) {
    pageIndex = pageIndex;
  }
}
