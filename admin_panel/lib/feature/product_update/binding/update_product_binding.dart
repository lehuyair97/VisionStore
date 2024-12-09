import 'package:flutter_web/feature/product_update/controller/update_product_controller.dart';
import 'package:get/get.dart';

class UpdateProductBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => UpdateProductController());
  }
}
