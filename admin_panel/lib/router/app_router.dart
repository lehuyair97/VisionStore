import 'package:flutter_web/feature/auth/binding/login_binding.dart';
import 'package:flutter_web/feature/auth/view/login.dart';
import 'package:flutter_web/feature/chat/view/chat_service.dart';
import 'package:flutter_web/feature/chat_supoport/view/chat_supoport.dart';
import 'package:flutter_web/feature/create_product/view/create_product.dart';
import 'package:flutter_web/feature/dashboard/dashboard.dart';
import 'package:flutter_web/feature/home/binding/home_binding.dart';
import 'package:flutter_web/feature/home/view/home.dart';
import 'package:flutter_web/feature/products/binding/products_binding.dart';
import 'package:flutter_web/feature/products/view/products.dart';
import 'package:flutter_web/feature/update_product/binding/update_product_binding.dart';
import 'package:flutter_web/feature/update_product/view/update_product.dart';
import 'package:get/get.dart';

class AppRouter {
  static final String login = '/login';
  static final String home = '/home';
  static final String products = '/products';
  static final String dashboard = '/dashboard';
  static final String createProduct = '/create-product';
  static final String updateProduct = '/update-product';
  static final String chatService = '/chat-service';
  static final String chatSupport = '/chat-support';
  static final List<GetPage> routes = [
    GetPage(name: login, page: () => LoginPage(), binding: LoginBinding()),
    GetPage(name: dashboard, page: () => Dashboard()),
    GetPage(name: home, page: () => HomeView(), binding: HomeBinding()),
    GetPage(name: products, page: () => Products(), binding: ProductsBinding()),
    GetPage(name: updateProduct, page: () => UpdateProduct(productId: ""), binding: UpdateProductBinding()),
    GetPage(name: chatService, page: () => ChatService()),
    GetPage(name: chatSupport, page: () => ChatSupport()),
  ];
}
