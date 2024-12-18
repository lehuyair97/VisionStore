import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/home/model/health_model.dart';
import 'package:flutter_web/feature/home/model/product_top10_model.dart';
import 'package:flutter_web/feature/home/model/revenue_model.dart';
import 'package:flutter_web/feature/home/model/revenue_month.dart';
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
  final type = RxString("year");
  final isloadingtop = RxBool(false);

  List<ProductTop10Model>? productTop10Model;

  RevenueMonth? revenueMonth;

  RevenueData? revenueData;

  @override
  void onInit() {
    super.onInit();
    getRevenue(type.value);
    getRevenueMonth();
    getProductsTop();
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
    isloadingtop.value = true;
    try {
      final response = await dio.get(ApiEndpoints.productTop10);
      List<dynamic> dataList = response.data['data'];
      productTop10Model = dataList.map((e) => ProductTop10Model.fromJson(e)).toList();
      print("productTop10Model: $productTop10Model");
    } catch (e) {
      print("Lỗi khi gọi API: $e");
    } finally {
      isloadingtop.value = false;
    }
  }


  Future<void> getRevenue(String? type) async {
    try {
      final response = await dio.get(ApiEndpoints.total(type ?? "year"));
       print("$response");
       if(response.statusCode != HttpStatusCodes.STATUS_CODE_OK) { print("error"); return; }
       revenueData = RevenueData.fromJson(response.data);
       print("revenueData: ${revenueData?.revenue}");
    } catch (e) {
      print(e);
    }
  }


    Future<void> getRevenueMonth() async {
    try {
      final response = await dio.get(ApiEndpoints.totalMonth);
       print("$response");
       if(response.statusCode != HttpStatusCodes.STATUS_CODE_OK) { print("error"); return; }
       revenueMonth = RevenueMonth.fromJson(response.data);
    } catch (e) {
      print(e);
    }
  }
  
}
