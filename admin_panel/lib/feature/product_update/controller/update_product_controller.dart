import 'dart:io';
import 'dart:ui_web';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/common/Services/api_endpoints.dart';
import 'package:flutter_web/common/constants/http_status_codes.dart';
import 'package:flutter_web/common/repositoty/dio_api.dart';
import 'package:flutter_web/feature/accessory/controller/accessory_controller.dart';
import 'package:flutter_web/feature/computer_accessories/controller/computer_accessories_controller.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/product_create/model/brand_model.dart';
import 'package:flutter_web/feature/product_create/model/categoty_model.dart';
import 'package:flutter_web/feature/accessory/model/sub_category_model.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:get/get.dart';
import 'package:mongo_dart/mongo_dart.dart';

class UpdateProductController extends GetxController {
  final controller = Get.put(CreateProductController());
  final productsController = Get.put(ProductsController());
  final accessoryController = Get.put(AccessoryController());
  final computerAccessoriesController = Get.put(ComputerAccessoriesController());
  final DioApi dioApi = DioApi();
  final Dio dio = Dio();
  final isLoading = false.obs;
  final List<ProductItem> productList = [];
  final List<Brand> brandList = [];
  final List<CategoryModel> categoryList = [];
  final List<SubCategory> subCategoryList = [];
  Map<String, dynamic> option = {};

  final TextEditingController brandId = TextEditingController();
  final TextEditingController categoryId = TextEditingController();
  final TextEditingController subCategoryId = TextEditingController();

  final TextEditingController name = TextEditingController();
  final TextEditingController price = TextEditingController();
  final TextEditingController description = TextEditingController();
  final TextEditingController warrantyPeriod = TextEditingController();
  final TextEditingController stock = TextEditingController();
  final TextEditingController image = TextEditingController();
  final TextEditingController descriptions = TextEditingController();
  final TextEditingController sku = TextEditingController();
  final TextEditingController weight = TextEditingController();

  var imageobs = ''.obs;

  @override
  void onInit() {
    super.onInit();
    brandList.addAll(controller.brandList);
    categoryList.addAll(controller.categoryList);
    subCategoryList.addAll(controller.subCategoryList);
        image.addListener(() {
      imageobs.value = image.text;
    });
    
  }

  Future<void> getProduct(String productId) async {
    try {
      isLoading.value = true;
      final response = await dioApi.get(
        ApiEndpoints.getProductById(productId),
      );
      final product = ProductItem.fromJson(response.data);
      if (product == null) return;
      productList.add(product);
      setProductData(product);
      print("product: ${productList.first.brand}");
    } catch (e) {
      print("error: $e");
    } finally {
      isLoading.value = false;
    }
  }

  void setProductData(ProductItem product) {
    print("${productList.first.option}");

    name.text = product.name ?? "";
    price.text = product.price?.toString() ?? "";
    description.text = product.description ?? "";
    descriptions.text = product.descriptions ?? "";
    warrantyPeriod.text = product.warrantyPeriod ?? "";
    stock.text = product.stock.toString() ?? "";
    weight.text = product.weight.toString() ?? "";
    image.text = product.image ?? "";
    imageobs.value = product.image ?? "";
    sku.text = product.sku ?? "";
    brandId.text = product.brand?.toString() ?? "";
    categoryId.text = product.categoryId?.toString() ?? "";
    subCategoryId.text = product.subCategoryId?.toString() ??   "";
    option = product.option as Map<String, dynamic> ?? {};
  }

  Future<void> postUpdateProduct(String productId, String key) async {
    try {
      isLoading.value = true;
      final response = await dioApi.put(
        ApiEndpoints.updateProduct(productId),
        data: _buildProductData(),
      );
      print("response: ${response.data}");
      if (response.statusCode != HttpStatusCodes.STATUS_CODE_OK) {
        Get.snackbar("Thông báo", "Cập nhật sản phẩm thất bại");
        return;
      }
      if(key == 'phu-kien') { computerAccessoriesController.fetch_sub_product(computerAccessoriesController.subCateId.value);}

      if(key == 'linh-kien'){accessoryController.fetch_sub_product(accessoryController.subCateId.value);}

       productsController.fetchProductsGroupedByBrand(categoryId.text);
       
      Get.back();
      Get.snackbar("Thông báo", "Cập nhật sản phẩm thành công");
    } catch (e) {
      print("error: $e");
    } finally {
      isLoading.value = false;
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
      "image": image.text,
      "category_id": categoryId.text.length == 24
          ? ObjectId.fromHexString(categoryId.text)
          : null,
      "sub_category_id":
          subCategoryId.text.isNotEmpty && subCategoryId.text.length == 24
              ? ObjectId.fromHexString(subCategoryId.text)
              : null,
      "option_id": brandId.text.length == 24
          ? ObjectId.fromHexString(brandId.text)
          : null,
      "create_date": DateTime.now().toIso8601String(),
      "stock": int.tryParse(stock.text) ?? 0,
      "warrantyPeriod":
          warrantyPeriod.text.isNotEmpty ? warrantyPeriod.text : "",
      "description": description.text,
      "brand": brandId.text.length == 24
          ? ObjectId.fromHexString(brandId.text)
          : null,
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
