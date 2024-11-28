import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/feature/orders/model/oders_model.dart';
import 'package:get/get.dart';

class OrderController extends GetxController {
  Dio dio = Dio();
  final searchController = TextEditingController().obs;
  final orders = <Order>[].obs;
  final isLoading = true.obs;

  @override
  void onInit() {
    super.onInit();
    fetchOrders();
  }

  Future<void> fetchOrders() async {
    try {
      isLoading.value = true;
      final response = await dio.get(ApiEndpoints.orders);
      print(response.data);

      if (response.data is List) {
        orders.value = (response.data as List)
            .map((e) => Order.fromJson(e as Map<String, dynamic>))
            .toList();
      } else {
        print("Unexpected data format");
      }
    } catch (e) {
      print("Error fetching orders: $e");
    } finally {
      isLoading.value = false;
    }
  }
}
