import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/feature/voucher/model/voucher_model.dart';
import 'package:flutter_web/feature/voucher/widget/voucher_gridRow.dart';
import 'package:get/get.dart';

class VoucherController extends GetxController {
  Dio dio = Dio();
  final vouchers = <Voucher>[].obs;
  final isLoading = false.obs;
  final searchController = TextEditingController().obs;
  VoucherGridDataSource voucherGridDataSource = VoucherGridDataSource(vouchers: []);

  @override
  void onInit() {
    super.onInit();
    fetchVouchers();
  }

  Future<void> fetchVouchers() async {
    try {
      isLoading.value = true;
      final response = await dio.get(ApiEndpoints.voucher);
        voucherGridDataSource = VoucherGridDataSource(vouchers: []);
      if (response.data is List) {
        vouchers.value = (response.data as List)
            .map((e) => Voucher.fromJson(e as Map<String, dynamic>))
            .toList();
        voucherGridDataSource = VoucherGridDataSource(vouchers: vouchers.value);
        voucherGridDataSource.notifyListeners();
      } else {
        print("Unexpected data format: ${response.data}");
      }

      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
      print(e);
    }
  }
}
