import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:get/get.dart';

class VoucherCreateController extends GetxController {
  Dio dio = Dio();
  final discount = TextEditingController();
  final expirationDate = TextEditingController();
  String voucherType = "discount";
  
  final title = TextEditingController();
  final description = TextEditingController();

  final isLoading = false.obs;

  final controllerBrand = Get.put(BrandController());

  List<String> type = ["discount","shipping"];

  Future<void> createVoucher() async {
    isLoading.value = true;
    try {
      final response = await dio.post(ApiEndpoints.voucher, data: {
        'discount': discount.text,
        'expiration_date': DateTime.now().toIso8601String(),
        'type': voucherType,
        'title': title.text,
        'description': description.text,
      });
      print(response.data);
      if (response.statusCode != HttpStatusCodes.STATUS_CODE_CREATED) return;
      Get.back();
      controllerBrand.getBrand();
      Get.snackbar('Thành công', 'Voucher đã được tạo thành công');
    } catch (e) {
      print(e);
    } finally {
      isLoading.value = false;
    }
  }
}
