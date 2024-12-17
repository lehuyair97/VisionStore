import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/feature/baner/model/baner_model.dart';
import 'package:flutter_web/feature/baner/widget/baner_gridRow.dart';
import 'package:flutter_web/feature/voucher/model/voucher_model.dart';
import 'package:flutter_web/feature/voucher/widget/voucher_gridRow.dart';
import 'package:get/get.dart';

class BannerController extends GetxController {
  Dio dio = Dio();
  final banner = <BanerModel>[].obs;
  final isLoading = false.obs;
  final searchController = TextEditingController().obs;
  BanerGridDataSource bannerGridDataSource = BanerGridDataSource(brands: []);

  @override
  void onInit() {
    super.onInit();
    fetchbanner();
  }

  Future<void> fetchbanner() async {
    try {
      isLoading.value = true;
      final response = await dio.get(ApiEndpoints.getBrand);
      print("fetchbanner ${response.data}");
        bannerGridDataSource = BanerGridDataSource(brands: []);
      if (response.data is List) {
        banner.value = (response.data as List)
            .map((e) => BanerModel.fromJson(e as Map<String, dynamic>))
            .toList();
        bannerGridDataSource = BanerGridDataSource(brands: banner.value);
        bannerGridDataSource.notifyListeners();
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
