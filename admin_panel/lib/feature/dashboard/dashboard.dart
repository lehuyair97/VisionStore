import 'package:flutter/material.dart';
import 'package:easy_sidemenu/easy_sidemenu.dart';
import 'package:flutter_web/common/img/img.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/accessory/controller/accessory_controller.dart';
import 'package:flutter_web/feature/accessory/view/accessory.dart';
import 'package:flutter_web/feature/auth/controller/login_comtroller.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/brand/view/brand.dart';
import 'package:flutter_web/feature/brand_create/controller/brand_create_controller.dart';
import 'package:flutter_web/feature/brand_update/controller/brand_update_controller.dart';
import 'package:flutter_web/feature/chat_supoport/view/chat_supoport.dart';
import 'package:flutter_web/feature/computer_accessories/controller/computer_accessories_controller.dart';
import 'package:flutter_web/feature/computer_accessories/view/computer_accessories.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/home/controller/home_contrioller.dart';
import 'package:flutter_web/feature/home/view/home.dart';
import 'package:flutter_web/feature/orders/controller/oder_controller.dart';
import 'package:flutter_web/feature/orders/view/orders.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/feature/purchase_history/controller/purchase_history_controller.dart';
import 'package:flutter_web/feature/user/controller/user_controller.dart';
import 'package:flutter_web/feature/user/view/user.dart';
import 'package:flutter_web/feature/user_changepass/controller/changepass_controller.dart';
import 'package:flutter_web/feature/user_update/controller/user_update_controller.dart';
import 'package:flutter_web/feature/voucher/controller/voucher_controller.dart';
import 'package:flutter_web/feature/voucher/view/voucher.dart';
import 'package:flutter_web/feature/dashboard/widget/side_menu.dart';
import 'package:flutter_web/feature/products/view/products.dart';
import 'package:flutter_web/feature/voucher_create/controller/voucher_create_controller.dart';
import 'package:get/get.dart';
import 'package:responsive_builder/responsive_builder.dart';

class Dashboard extends StatefulWidget {
  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  final PageController pageController = PageController();
  final SideMenuController sideMenuController = SideMenuController();
  final CreateProductController createProductController =
      Get.put(CreateProductController());
  final ProductsController productsController = Get.put(ProductsController());
  final PurchaseHistoryController purchaseHistoryController =
      Get.put(PurchaseHistoryController());
  final HomeController homeController = Get.put(HomeController());
  final UserController userController = Get.put(UserController());
  final BrandController brandController = Get.put(BrandController());
  final OrderController orderController = Get.put(OrderController());
  final BrandUpdateController brandUpdateController =
      Get.put(BrandUpdateController());
  final BrandCreateController brandCreateController =
      Get.put(BrandCreateController());
  final VoucherController voucherController = Get.put(VoucherController());
  final AccessoryController accessoryController =
      Get.put(AccessoryController());

  final ComputerAccessoriesController cvomputerAccessories =
      Get.put(ComputerAccessoriesController());

  final VoucherCreateController voucherCreateController =
      Get.put(VoucherCreateController());

  final UserUpdateController userUpdateController =
      Get.put(UserUpdateController());
  final ChangePassController changePassController =
      Get.put(ChangePassController());
  final LoginController loginController = Get.put(LoginController());

  bool isMenuOpen = true;

  @override
  void initState() {
    super.initState();

    createProductController.getBrand();
    createProductController.getCategory();
    homeController.getProducts();
    homeController.getProductsTop();

    createProductController.getSubCategory();

    print("controler.brandList: ${createProductController.brandList.length}");

    sideMenuController.addListener((index) {
      pageController.jumpToPage(index);
    });
  }

  void toggleMenu() {
    setState(() {
      isMenuOpen = !isMenuOpen;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ResponsiveBuilder(
      builder: (context, sizingInformation) {
        bool isMobile =
            sizingInformation.deviceScreenType == DeviceScreenType.mobile;
        return Scaffold(
          appBar: isMobile
              ? AppBar(
                  leading: IconButton(
                    icon: Icon(isMenuOpen ? Icons.menu_open : Icons.menu),
                    onPressed: toggleMenu,
                  ),
                )
              : null,
          body: Row(
            children: [
              if (isMenuOpen || !isMobile)
                Expanded(
                  flex: 1,
                  child: SideMenuWidget(
                    controller: sideMenuController,
                    isMobile: isMobile,
                  ),
                ),
              Expanded(
                flex: 5,
                child: PageView(
                  controller: pageController,
                  children: [
                    HomeView(),
                    Accessory(),
                    ComputerAccessories(),
                    Products(),
                    OrdersView(),
                    UserView(),
                    BrandView(),
                    VoucherView(),
                    ChatSupport(),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
