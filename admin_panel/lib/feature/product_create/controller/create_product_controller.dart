import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/feature/accessory/controller/accessory_controller.dart';
import 'package:flutter_web/feature/computer_accessories/controller/computer_accessories_controller.dart';
import 'package:flutter_web/feature/product_create/model/brand_model.dart';
import 'package:flutter_web/feature/product_create/model/categoty_model.dart';
import 'package:flutter_web/feature/accessory/model/sub_category_model.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:get/get.dart';
import 'package:mongo_dart/mongo_dart.dart';

class CreateProductController extends GetxController {
  final DioApi dioApi = DioApi();
  final Dio dio = Dio();
  final List<Brand> brandList = [];
  final List<CategoryModel> categoryList = [];
  final List<SubCategory> subCategoryList = [];
  Map<String, dynamic> option = {};
  // // TextEditingControllers
  final TextEditingController name = TextEditingController();
  final TextEditingController price = TextEditingController();
  final TextEditingController description = TextEditingController();
  final TextEditingController brand = TextEditingController();
  final TextEditingController category = TextEditingController();
  final TextEditingController subCategory = TextEditingController();
  final TextEditingController warrantyPeriod = TextEditingController();
  final TextEditingController stock = TextEditingController();
  final TextEditingController thumbnail = TextEditingController();
  final TextEditingController image = TextEditingController();
  final TextEditingController descriptions = TextEditingController();
  final TextEditingController sku = TextEditingController();
  final TextEditingController weight = TextEditingController();
  final TextEditingController optionId = TextEditingController();
  final Rx<TextEditingController> categoryId = TextEditingController().obs;
  final TextEditingController subCategoryId = TextEditingController();

  var imageobs = "".obs;

  @override
  void onInit() {
    super.onInit();
    clearTextFields();
    Get.lazyPut<ProductsController>(() => ProductsController());
    image.addListener(() {
      imageobs.value = image.value.text;
      
    } );
  }

  void clearTextFields() {
    name.clear();
    price.clear();
    description.clear();
    descriptions.clear();
    brand.clear();
    category.clear();
    subCategory.clear();
    warrantyPeriod.clear();
    stock.clear();
    thumbnail.clear();
    image.clear();
    sku.clear();
    weight.clear();
    optionId.clear();
    categoryId.value.clear();
    subCategoryId.clear();
  }

  @override
  void dispose() {
    name.dispose();
    price.dispose();
    description.dispose();
    brand.dispose();
    category.dispose();
    subCategory.dispose();
    warrantyPeriod.dispose();
    stock.dispose();
    thumbnail.dispose();
    image.dispose();
    descriptions.dispose();
    sku.dispose();
    weight.dispose();
    optionId.dispose();
    categoryId.value.dispose();
    subCategoryId.dispose();
    super.dispose();
  }

  Future<void> getBrand() async {
    final response = await dioApi.get(ApiEndpoints.getBrand);
    brandList.addAll(
      List<Brand>.from((response.data as List).map((e) => Brand.fromJson(e))),
    );
  }

  Future<void> getCategory() async {
    final response = await dioApi.get(ApiEndpoints.getCategory);
    categoryList.addAll(
      List<CategoryModel>.from(
          (response.data as List).map((e) => CategoryModel.fromJson(e))),
    );
  }

  Future<void> getSubCategory() async {
    try {
      final response = await dioApi.get(ApiEndpoints.subcategory);
      subCategoryList.addAll(
        List<SubCategory>.from((response.data['sub_category_list'] as List)
            .map((e) => SubCategory.fromJson(e))),
      );
    } catch (e) {
      print("Lỗi khi lấy danh sách danh mục con: $e");
    }
  }

  Future<void> postAddProduct(
      ProductsController productsController,
      AccessoryController accessoryController,
      ComputerAccessoriesController computerAccessoriesController,
      String key) async {
    if (_isInputValid()) {
      try {
        _setOptionBasedOnCategory();

        final response = await dio.post(
          ApiEndpoints.products,
          data: _buildProductData(),
        );

        if (response.statusCode == HttpStatusCodes.STATUS_CODE_CREATED ||
            response.statusCode == HttpStatusCodes.STATUS_CODE_OK) {
          if (key == 'phu-kien') {
            computerAccessoriesController
                .fetch_sub_product(computerAccessoriesController.subCateId.value);
          }

          if (key == 'linh-kien') {
            accessoryController
                .fetch_sub_product(accessoryController.sunCateId);
          }
          productsController.fetchProductsGroupedByBrand(categoryId.value.text);
          Get.back();
          Get.snackbar("Thông báo", "Tạo sản phẩm thành công");
        }
      } catch (e) {
        print("Lỗi khi thêm sản phẩm: $e");
      }
    } else {
      Get.snackbar("Thông báo", "Vui lòng điền đầy đủ thông tin");
    }
  }

  bool _isInputValid() {
    return name.text.isNotEmpty &&
        price.text.isNotEmpty &&
        description.text.isNotEmpty &&
        descriptions.text.isNotEmpty &&
        brand.text.isNotEmpty &&
        categoryId.value.text.isNotEmpty &&
        warrantyPeriod.text.isNotEmpty &&
        image.value.text.isNotEmpty;
  }

  void _setOptionBasedOnCategory() {
    switch (categoryId.value.text) {
      case "6714d3183a7b110c23478edf":
        option = {
          "configuration": [
            {"ram": 8, "chip": "core i5", "extraPrice": 500},
            {"ram": 16, "chip": "core i7", "extraPrice": 800},
            {"ram": 32, "chip": "core i9", "extraPrice": 1200}
          ],
          "computer_screen": [
            {"computer_screen": "Full bô 19 inch", "extraPrice": 200},
            {"computer_screen": "LED 24 inch", "extraPrice": 300},
            {"computer_screen": "4K Ultra HD 27 inch", "extraPrice": 400}
          ]
        };
        break;

      case "6714d3203a7b110c23478ee1":
        option = {
          "configuration": [
            {"ram": 8, "chip": "core i5", "extraPrice": 500},
            {"ram": 16, "chip": "core i7", "extraPrice": 800},
            {"ram": 32, "chip": "core i9", "extraPrice": 1200}
          ],
          "color_laptop": [
            {"color": "black", "extraPrice": 200},
            {"color": "gray", "extraPrice": 300},
            {"color": "white", "extraPrice": 400}
          ]
        };
        break;

      default:
        option = {};
    }
  }

  Map<String, dynamic> _buildProductData() {
    return {
      "parent_product_id": null,
      "sku": sku.text.isNotEmpty ? sku.text : "SKU001",
      "name": name.text,
      "price": double.tryParse(price.text) ?? 0,
      "weight": double.tryParse(weight.text) ?? 0.1,
      "descriptions": descriptions.text,
      "thumbnail": thumbnail.text.isNotEmpty ? thumbnail.text : "",
      "image": image.value.text,
      "category_id": ObjectId.fromHexString(categoryId.value.text),
      "sub_category_id": subCategoryId.text.isNotEmpty
          ? ObjectId.fromHexString(subCategoryId.text)
          : null,
      "option_id": ObjectId.fromHexString(brand.text),
      "create_date": DateTime.now().toIso8601String(),
      "stock": int.tryParse(stock.text) ?? 0,
      "warrantyPeriod":
          warrantyPeriod.text.isNotEmpty ? warrantyPeriod.text : "",
      "description": description.text,
      "brand": ObjectId.fromHexString(brand.text),
      "option": option,
      "products_child": [],
      "compatible_with": {
        "memory": [],
        "processor": [],
        "motherboard": [],
        "graphics": [],
        "storage": []
      },
    };
  }
}
