import 'package:dio/dio.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/feature/orders/model/oders_model.dart';
import 'package:flutter_web/feature/orders/widget/orders_gridRow.dart';
import 'package:get/get.dart';

class OderDetailController extends GetxController {
  Dio dio = Dio();
 List<Order> order = [];
  final isLoading = true.obs;
  @override
  void onInit() {
    super.onInit();
  }

  Future<void> fetchOrdersID(String id) async {
    try {
      isLoading.value = true;
      final response = await dio.get(ApiEndpoints.fetchOrdersID(id));
 var orderData = response.data; // Giả sử response.data là đối tượng đơn
    order = [Order.fromJson(orderData as Map<String, dynamic>)];
      
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
        fetchOrdersID(id);
      }
    });
  }
}
