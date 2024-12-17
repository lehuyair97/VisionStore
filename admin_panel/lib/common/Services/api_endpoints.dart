// lib/common/config/api_endpoints.dart
import 'package:flutter_web/common/Services/config.dart';

class ApiEndpoints {
  static const String login = "${Config.baseUrl}/login";

  // brand
  static const String getBrand = "${Config.baseUrl}/brands";
  static String getBrandId(String brandId) =>
      "${Config.baseUrl}/brands/$brandId";

  static String deleteBrand(String brandId) =>
      "${Config.baseUrl}/brands/$brandId";

      static String brandDetail = "${Config.baseUrl}/products-brands";
  // category
  static const String getCategory = "${Config.baseUrl}/category";
  static const String subcategory =
      "${Config.baseUrl}/subcategory/type/components";

  static const String accessories =
      "${Config.baseUrl}/subcategory/type/accessories";

  // products
  static const String products = "${Config.baseUrl}/products";

  static const String productsGroupedByBrand =
      "${Config.baseUrl}/productsgrouped";

  static String accessoriesSub(String supId) =>
      "${Config.baseUrl}/products/accessories/$supId";

  static String productSub(String supId) =>
      "${Config.baseUrl}/products/subcategory/$supId";
  static String productPagination(int page, int limit) =>
      "${Config.baseUrl}/products/pagination?page=$page&limit=$limit";
  static String getProductById(String productId) =>
      "${Config.baseUrl}/products/$productId";
  static String updateProduct(String productId) =>
      "${Config.baseUrl}/products/$productId";
  static String deleteProduct(String productId) =>
      "${Config.baseUrl}/products/$productId";

  // user
  static const String users = "${Config.baseUrl}/users";
  static String getUserId(String userId) => "${Config.baseUrl}/users/$userId";
  static String updateUser(String userId) =>
      "${Config.baseUrl}/favorites/$userId";

  static String changePassword(String userId) =>
      "${Config.baseUrl}/change_pw/$userId";

  // orders
  static const String orders = "${Config.baseUrl}/orders";
    static  String fetchOrdersID(String id) => "${Config.baseUrl}/orders/$id";

  static const String searchProduct = "${Config.baseUrl}/products/search";
  static String deleteOrdersByUserId(String userId) =>
      "${Config.baseUrl}/orders/users/$userId";
  // voucher
  static const String voucher = "${Config.baseUrl}/voucher";

  // toall
  static String total(String type) => "${Config.baseUrl}/orders/revenue/type?type=$type";

  static const String totalMonth =
      "${Config.baseUrl}/orders/compareMonthLy/revenue";
}
