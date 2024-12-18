import 'package:flutter_web/feature/brand_detail/controller/brand_detail_controller.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:get/get.dart';

class BrandDetailBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => BrandDetailController());
  }
}
