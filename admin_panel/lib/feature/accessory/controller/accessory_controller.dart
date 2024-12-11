import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/accessory/model/sub_category_model.dart';
import 'package:flutter_web/feature/accessory/widget/accessory_gridRow.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:get/get.dart';

class AccessoryController extends GetxController {
  DioApi dioApi = DioApi();
  Dio dio = Dio();
  final subCategoryList = <SubCategory>[].obs;
  final productSup = <ProductItem>[].obs;
  final searchController = TextEditingController();
  final subCateId = ''.obs;
  ProductGridDataSource productGridDataSource =
      ProductGridDataSource(products: []);

  final String sunCateId = "";
  final isLoading = false.obs;

  int get currentPage => 0;

  @override
  void onInit() {
    super.onInit();
    fetch_sub_product(subCateId.value);
  }

  Future<void> fetch_sub_product(String sunCateId) async {
    if (isLoading.value) return;
    try {
      isLoading.value = true;
      final response = await dio.get(ApiEndpoints.productSub(sunCateId));

      if (response.statusCode ==
          HttpStatusCodes.STATUS_CODE_TOO_MANY_REQUESTS) {
        Get.snackbar(
            'Lỗi', 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau');
        return;
      }

      if (response.statusCode != HttpStatusCodes.STATUS_CODE_OK) {
        return;
      }

      List<dynamic> productListJson = response.data;
      List<ProductItem> products =
          productListJson.map((item) => ProductItem.fromJson(item)).toList();

      if (products.isEmpty) {
        return;
      }
      productSup.clear();
      
      productGridDataSource.notifyListeners();

      productSup.value = products;
      if (products.isNotEmpty) {
        subCateId.value = products.first.subCategoryId ?? '';
    }
      productGridDataSource = ProductGridDataSource(products: productSup);
      productGridDataSource.notifyListeners();
    } catch (e) {
      print("Error fetching products: $e");
    } finally {
      isLoading.value = false;
    }
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


    Future<void> searchProduct(String searchText) async {
    if (isLoading.value) return;
    if (searchText.isEmpty) {
      fetch_sub_product(subCateId.value);
      return;
    }
    try {
      isLoading.value = true;
      final response = await dio.post(ApiEndpoints.searchProduct, data: {
        'name': searchText,
      });
      productSup.clear();

      List<dynamic> productListJson = response.data;

      List<ProductItem> products =
          productListJson.map((item) => ProductItem.fromJson(item)).toList();

      if (products.isEmpty) {
        print("Dữ liệu sản phẩm là null");
        return;
      }
      productSup.value = products;
      productGridDataSource = ProductGridDataSource(products: productSup);
      productGridDataSource.notifyListeners();
    } catch (e) {
      print("Error searching products: $e");
    } finally {
      isLoading.value = false;
    }
  }

  void onPageChanged(int pageIndex) {
    pageIndex = pageIndex;
  }
}
