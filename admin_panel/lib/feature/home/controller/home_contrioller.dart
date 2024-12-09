import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/model/health_model.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  Dio dio = Dio();
  final searchController = TextEditingController();
  final products = RxList<ProductItem>();
  final isLoading = RxBool(false);


  final List<HealthModel> healthDetails = [
    HealthModel(
        icon: 'assets/svg/burn.svg',
        value: "1,200",
        title: "Người dùng hoạt động",
        color: AppColors.backgroundCard),
    HealthModel(
        icon: 'assets/svg/steps.svg',
        value: "\$15,000",
        title: "Tổng doanh thu",
        color: AppColors.backgroundCard),
    HealthModel(
        icon: 'assets/svg/distance.svg',
        value: "350",
        title: "Đơn hàng mới",
        color: AppColors.backgroundCard),
    HealthModel(
        icon: 'assets/svg/sleep.svg',
        value: "85%",
        title: "Phản hồi tích cực",
        color: AppColors.backgroundCard),
  ];

  Future<void> getProducts() async {
    isLoading.value = true;
    try {
      final response = await dio.get(ApiEndpoints.productPagination(1, 10));

      print("getProductsresponse: ${response.data['products'] }");

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
}
