import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/voucher/controller/voucher_controller.dart';
import 'package:get/get.dart';

class VoucherCreateController extends GetxController {
  Dio dio = Dio();
  final discount = TextEditingController();
    Rx<DateTime> expirationDate = DateTime.now().obs;

  final title = TextEditingController();
  final description = TextEditingController();

  final isLoading = false.obs;

  final controllerVoucher = Get.put(VoucherController());

  List<String> type = ["discount","shipping"];
    String voucherType = "discount";


  Future<void> createVoucher() async {
    isLoading.value = true;
    try {
      final response = await dio.post(ApiEndpoints.voucher, data: {
        'discount': discount.text,
        'expiration_date': expirationDate.value.toIso8601String(),
        'type': voucherType,
        'title': title.text,
        'description': description.text,
      });
      print(response.data);
      if (response.statusCode != HttpStatusCodes.STATUS_CODE_CREATED) {print("error");return;}
      Get.back();
      controllerVoucher.fetchVouchers();
      Get.snackbar('Thành công', 'Voucher đã được tạo thành công');
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }

    void onDateSelected(DateTime date) {
    expirationDate.value = date;
    update();
  }
}
