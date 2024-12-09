import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_web/feature/products/widget/product_gridRow.dart';
import 'package:get/get.dart';

class ProductsController extends GetxController {
  DioApi dioApi = DioApi();
  Dio dio = Dio();
  RxList<ProductItem> productGridRows = <ProductItem>[].obs;
  final searchController = TextEditingController();
  ProductGridDataSource productGridDataSource =
      ProductGridDataSource(products: []);
  final isLoading = false.obs;
  RxInt selectedRowIndex = (-1).obs;
  RxInt currentTabIndex = 0.obs;
  List<int> selectedRowIndices = [-1, -1];
  int pageIndex = 0;
  RxString categoryId = ''.obs;

  @override
  void onInit() {
    super.onInit();
    fetchProductsGroupedByBrand(categoryId.value);
  }

  Future<void> fetchProductsGroupedByBrand(String categoryId) async {
    if (isLoading.value) return;
    try {
      isLoading.value = true;
      final response =
          await dio.get(ApiEndpoints.productsGroupedByBrand, queryParameters: {
        'categoryId': categoryId,
      });

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

      productGridRows.clear();

      // Kiểm tra dữ liệu trả về và ánh xạ nó
      final List<dynamic> groupedProducts =
          response.data; // Dữ liệu là một mảng các nhóm sản phẩm
      if (groupedProducts == null || groupedProducts.isEmpty) {
        print("Dữ liệu sản phẩm là null hoặc trống");
        return;
      }

      // Duyệt qua mỗi nhóm sản phẩm và thêm sản phẩm vào danh sách
      for (var group in groupedProducts) {
        final List<dynamic> productsList =
            group['products']; // Lấy danh sách sản phẩm trong nhóm
        if (productsList != null) {
          productGridRows.addAll(
              productsList.map((item) => ProductItem.fromJson(item)).toList());
        }
      }

      // Cập nhật dữ liệu cho grid
      productGridDataSource = ProductGridDataSource(products: productGridRows);
      productGridDataSource.notifyListeners();
    } catch (e) {
      print("Error fetching products: $e");
    } finally {
      isLoading.value = false;
    }
  }

  // Future<void> fetchProducts() async {
  //   if (isLoading.value) return;
  //   try {
  //     isLoading.value = true;
  //     final response =
  //         await dio.get(ApiEndpoints.productPagination, queryParameters: {
  //       'page': currentPage,
  //       'limit': itemsPerPage,
  //     });

  //     if (response.statusCode ==
  //         HttpStatusCodes.STATUS_CODE_TOO_MANY_REQUESTS) {
  //       Get.snackbar(
  //           'Lỗi', 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau');
  //       return;
  //     }

  //     if (response.statusCode != HttpStatusCodes.STATUS_CODE_OK) {
  //       print("Lỗi khi lấy dữ liệu sản phẩm");
  //       return;
  //     }
  //     productGridRows.clear();
  //     final productData = Product.fromJson(response.data);
  //     if (productData.products == null) {
  //       print("Dữ liệu sản phẩm là null");
  //       return;
  //     }

  //     productGridRows.value = productData.products!;
  //     totalItems = productData.totalProducts ?? 0;
  //     totalPages = (totalItems / itemsPerPage).ceil();
  //     productGridDataSource = ProductGridDataSource(products: productGridRows);
  //     productGridDataSource.notifyListeners();
  //   } catch (e) {
  //     print("Error fetching products: $e");
  //   } finally {
  //     isLoading.value = false;
  //   }
  // }

  Future<void> deleteProduct(String productId) async {
    await dio.delete(ApiEndpoints.deleteProduct(productId));
    fetchProductsGroupedByBrand(categoryId.value);
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
          fetchProductsGroupedByBrand(categoryId.value);
        });
      }
    });
  }

  Future<void> searchProduct(String searchText) async {
    if (isLoading.value) return;
    if (searchText.isEmpty) {
      fetchProductsGroupedByBrand(categoryId.value);
      return;
    }
    try {
      isLoading.value = true;
      final response = await dio.post(ApiEndpoints.searchProduct, data: {
        'name': searchText,
      });
      productGridRows.clear();

      List<dynamic> productListJson = response.data;

      List<ProductItem> products =
          productListJson.map((item) => ProductItem.fromJson(item)).toList();

      if (products.isEmpty) {
        print("Dữ liệu sản phẩm là null");
        return;
      }
      productGridRows.value = products;
      productGridDataSource = ProductGridDataSource(products: productGridRows);
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
