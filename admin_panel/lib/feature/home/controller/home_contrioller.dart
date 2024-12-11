import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/home/model/health_model.dart';
import 'package:flutter_web/feature/orders/controller/oder_controller.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_web/feature/user/controller/user_controller.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  Dio dio = Dio();
  final searchController = TextEditingController();
  final products = RxList<ProductItem>();
  final productTop = RxList<ProductItem>();
  final orderController = Get.put(OrderController());
  final userController = Get.put(UserController());
  final brandController = Get.put(BrandController());
  final isLoading = RxBool(false);
  final productsController = Get.put(ProductsController());

  @override
  void onInit() {
    super.onInit();
  }

  Future<void> getProducts() async {
    isLoading.value = true;
    try {
      final response = await dio.get(ApiEndpoints.productPagination(1, 10));

      print("getProductsresponse: ${response.data['products']}");

      // Kiểm tra và chuyển đổi dữ liệu
      if (response.data['products'] != null) {
        // Sử dụng List.from để chuyển đổi kiểu dữ liệu
        final List<dynamic> productList = List.from(response.data['products']);
        final List<ProductItem> data =
            productList.map((e) => ProductItem.fromJson(e)).toList();
        products.value = data;
        print("products: ${products.value.length}");
      } else {
        print("Không có sản phẩm.");
      }
    } catch (e) {
      print("Lỗi khi gọi API: $e");
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> getProductsTop() async {
    isLoading.value = true;
    try {
      final response = await dio.get(ApiEndpoints.productPagination(3, 10));

      print("getProductsresponse: ${response.data['products']}");

      // Kiểm tra và chuyển đổi dữ liệu
      if (response.data['products'] != null) {
        // Sử dụng List.from để chuyển đổi kiểu dữ liệu
        final List<dynamic> productList = List.from(response.data['products']);
        final List<ProductItem> data =
            productList.map((e) => ProductItem.fromJson(e)).toList();
        productTop.value = data;
      } else {
        print("Không có sản phẩm.");
      }
    } catch (e) {
      print("Lỗi khi gọi API: $e");
    } finally {
      isLoading.value = false;
    }
  }
}
