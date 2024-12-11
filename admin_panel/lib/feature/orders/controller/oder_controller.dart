import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/orders/model/oders_model.dart';
import 'package:flutter_web/feature/orders/widget/orders_gridRow.dart';
import 'package:get/get.dart';

class OrderController extends GetxController {
  Dio dio = Dio();
  final searchController = TextEditingController().obs;
  final orders = <Order>[].obs;
  final isLoading = true.obs;
  OrdersGridDataSource ordersGridDataSource =
      OrdersGridDataSource(orders: []);
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

        ordersGridDataSource =
            OrdersGridDataSource(orders: orders.value);
        ordersGridDataSource.notifyListeners();
      } else {
        print("Unexpected data format");
      }
    } catch (e) {
      print("Error fetching orders: $e");
    } finally {
      isLoading.value = false;
    }
  }
    Future<void> deleteOrder(String id) async {
    CustomDialog()
        .showConfirmationDialog(
      height: 0.3,
      'Xóa đơn hàng',
      'Bạn có chắc chắn muốn xóa đơn hàng này không?',
    )
        .then((value) async {
      if (value != null && value) {
        await dio.delete(ApiEndpoints.deleteOrdersByUserId(id));
        fetchOrders();
      }
    });
  }
}
