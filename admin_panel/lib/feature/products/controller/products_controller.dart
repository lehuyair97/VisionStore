import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_web/feature/products/widget/product_gridRow.dart';
import 'package:flutter_web/feature/update_product/view/update_product.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class ProductsController extends GetxController {
  DioApi dioApi = DioApi();
  Dio dio = Dio();
  RxList<ProductItem> productGridRows = <ProductItem>[].obs;
  final searchController = TextEditingController();
  ProductGridDataSource productGridDataSource =
      ProductGridDataSource(products: []);
  final isLoading = false.obs;
  int currentPage = 1;
  RxInt selectedRowIndex = (-1).obs;
  RxInt currentTabIndex = 0.obs;
  List<int> selectedRowIndices = [-1, -1];
  int pageIndex = 0;

  int totalItems = 0;
  int totalPages = 1;
  int itemsPerPage = 10;
  @override
  void onInit() {
    super.onInit();
    fetchProducts();
  }

  Future<void> fetchProducts() async {
    if (isLoading.value) return;
    try {
      isLoading.value = true;
      final response =
          await dio.get(ApiEndpoints.productPagination, queryParameters: {
        'page': currentPage,
        'limit': itemsPerPage,
      });

      if (response.statusCode ==
          HttpStatusCodes.STATUS_CODE_TOO_MANY_REQUESTS) {
        Get.snackbar(
            'Lỗi', 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau');
        return;
      }

      if (response.statusCode == HttpStatusCodes.STATUS_CODE_OK) {
        productGridRows.clear();
        final productData = Product.fromJson(response.data);
        if (productData.products != null) {
          productGridRows.value = productData.products!;
          totalItems = productData.totalProducts ?? 0;
          totalPages = (totalItems / itemsPerPage).ceil();
          productGridDataSource =
              ProductGridDataSource(products: productGridRows);
          productGridDataSource.notifyListeners();
        } else {
          print("Dữ liệu sản phẩm là null");
        }
      }
    } catch (e) {
      print("Error fetching products: $e");
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> deleteProduct(String productId) async {
    await dio.delete(ApiEndpoints.deleteProduct(productId));
    fetchProducts();
  }

  void onCellTap(DataGridCellTapDetails details) {
    try {
      final index = details.rowColumnIndex.rowIndex - 1;

      if (index < 0 || index >= productGridDataSource.rows.length) {
        return;
      }
      while (currentTabIndex.value >= selectedRowIndices.length) {
        selectedRowIndices.add(-1);
      }

      selectedRowIndices[currentTabIndex.value] = index;

      final employeeId = (productGridDataSource.rows[index]
          .getCells()
          .firstWhere((cell) => cell.columnName == ProductGridCell.id)
          .value);

      print("Selected employeeId: $employeeId");

      if (details.column.columnName == ProductGridCell.edit) {
        Get.dialog(UpdateProduct(productId: employeeId));
      } else if (details.column.columnName == ProductGridCell.delete) {
        CustomDialog()
            .showConfirmationDialog(
          'Xóa sản phẩm',
          'Bạn có chắc chắn muốn xóa sản phẩm này không?',
          height: 0.3,
        )
            .then((value) {
          if (value ?? false) {
            deleteProduct(employeeId);
          }
        });
      }
    } catch (e) {
      print("Error: $e");
    }
  }

  void onPageChanged(int pageIndex) {
    pageIndex = pageIndex;
  }
}
