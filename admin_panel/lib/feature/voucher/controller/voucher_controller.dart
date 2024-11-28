import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/feature/voucher/model/voucher_model.dart';
import 'package:get/get.dart';

class VoucherController extends GetxController {
  Dio dio = Dio();
  final vouchers = <Voucher>[].obs;
  final isLoading = false.obs;
  final searchController = TextEditingController().obs;

  @override
  void onInit() {
    super.onInit();
    fetchVouchers();
  }

Future<void> fetchVouchers() async {
  try {
    isLoading.value = true;
    final response = await dio.get(ApiEndpoints.voucher);

    // Kiểm tra nếu response.data là một danh sách
    if (response.data is List) {
      vouchers.value = (response.data as List)
          .map((e) => Voucher.fromJson(e as Map<String, dynamic>))
          .toList();
    } else {
      // Xử lý trường hợp response.data không phải là danh sách
      print("Unexpected data format: ${response.data}");
    }

    isLoading.value = false;
  } catch (e) {
    isLoading.value = false;
    print(e);
  }
}
}
