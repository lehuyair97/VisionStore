// lib/common/config/api_endpoints.dart
import 'package:flutter_web/common/Services/config.dart';

class ApiEndpoints {
  static const String login = "${Config.baseUrl}/login";
  static const String getBrand = "${Config.baseUrl}/brands";
  static String getBrandId(String brandId) =>
      "${Config.baseUrl}/brands/$brandId";
  static const String getCategory = "${Config.baseUrl}/category";
  static const String subcategory =
      "${Config.baseUrl}/subcategory/type/components";

  // products
  static const String products = "${Config.baseUrl}/products";
  static const String productPagination =
      "${Config.baseUrl}/products/pagination";
  static String getProductById(String productId) =>
      "${Config.baseUrl}/products/$productId";
  static String updateProduct(String productId) =>
      "${Config.baseUrl}/products/$productId";
  static String deleteProduct(String productId) =>
      "${Config.baseUrl}/products/$productId";

  // user
  static const String users = "${Config.baseUrl}/users";

  // orders
  static const String orders = "${Config.baseUrl}/orders";
  static const String searchProduct = "${Config.baseUrl}/products/search";

  // voucher
  static const String voucher = "${Config.baseUrl}/voucher";
}
