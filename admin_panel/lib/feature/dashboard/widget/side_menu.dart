import 'package:flutter/material.dart';
import 'package:easy_sidemenu/easy_sidemenu.dart';
import 'package:flutter_web/common/img/img.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web/feature/dashboard/widget/custom_side_menu_expansion_item.dart';
import 'package:flutter_web/router/app_router.dart';
import 'package:get/get.dart';

class SideMenuWidget extends StatelessWidget {
  final bool isMobile;
  final SideMenuController controller;

  const SideMenuWidget({
    super.key,
    required this.controller,
    this.isMobile = false,
  });

  @override
  Widget build(BuildContext context) {
    List<dynamic> menuItems = [
      SideMenuItem(
        title: 'Thông tin cửa hàng',
        icon: Icon(Icons.home),
        onTap: (int index, _) {
          controller.changePage(index);
        },
      ),
      CustomSideMenuExpansionItem(
        title: "Quản lý Danh mục SP",
        icon: const Icon(Icons.category),
        children: [
          SideMenuItem(
            title: 'Quản lý linh kiện',
            onTap: (index, _) {
              controller.changePage(index);
            },
            icon: const Icon(Icons.memory, color: AppColors.white),
          ),
          SideMenuItem(
            title: 'Quản lý phụ kiện',
            onTap: (index, _) {
              controller.changePage(index);
            },
            icon: const Icon(Icons.headphones, color: AppColors.white),
          ),
          SideMenuItem(
            title: 'Quản lý sản phẩm',
            onTap: (index, _) {
              controller.changePage(index);
            },
            icon: const Icon(Icons.inventory, color: AppColors.white),
          )
        ],
      ),
      SideMenuItem(
        title: 'Lịch sử mua hàng',
        onTap: (index, _) {
          controller.changePage(index);
        },
        icon: Icon(Icons.history),
      ),
      SideMenuItem(
        title: 'Danh sách người dùng',
        onTap: (index, _) {
          controller.changePage(index);
        },
        icon: Icon(Icons.person),
      ),
      SideMenuItem(
        title: 'Thương hiệu',
        icon: Icon(Icons.branding_watermark),
        onTap: (int index, _) {
          controller.changePage(index);
        },
      ),
      SideMenuItem(
        title: 'Voucher',
        icon: Icon(Icons.discount),
        onTap: (int index, _) {
          controller.changePage(index);
        },
      ),
      SideMenuItem(
        title: 'Chat hỗ trợ',
        icon: Icon(Icons.chat),
        onTap: (int index, _) {
          controller.changePage(index);
        },
      ),
      SideMenuItem(
        title: 'Thoát',
        icon: Icon(Icons.logout),
        onTap: (int index, _) {
          CustomDialog()
              .showConfirmationDialog(
            'Thoát',
            'Bạn có chắc chắn muốn thoát không?',
            height: 0.3,
          )
              .then((value) {
            if (value ?? false) {
              Get.offAllNamed(AppRouter.login);
            }
          });
        },
      ),
    ];

    return SideMenu(
      controller: controller,
      style: SideMenuStyle(
        displayMode: SideMenuDisplayMode.auto,
        backgroundColor: AppColors.backgroundCard,
        selectedColor: AppColors.primary,
        unselectedIconColor: Colors.white,
        selectedIconColor: Colors.white,
        hoverColor: AppColors.primary.withOpacity(0.1),
        itemHeight: 60.0,
        itemInnerSpacing: 8.0,
        itemBorderRadius: BorderRadius.circular(20.0),
        selectedTitleTextStyleExpandable: TextStyle(
          color: AppColors.white,
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
        unselectedTitleTextStyleExpandable: TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.w500,
          fontSize: 14,
        ),
        selectedIconColorExpandable: AppColors.white,
        unselectedIconColorExpandable: Colors.white,
        arrowCollapse: AppColors.primary,
        arrowOpen: Colors.transparent,
        iconSizeExpandable: 22.0,
        decoration: const BoxDecoration(
          border: Border.fromBorderSide(BorderSide.none),
          color: Colors.white,
        ),
        itemOuterPadding: EdgeInsets.zero,
        unselectedTitleTextStyle: TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.w500,
          fontSize: 14,
        ),
        selectedTitleTextStyle: TextStyle(
          color: AppColors.white,
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
      ),
      title: Padding(
        padding: EdgeInsets.symmetric(vertical: 20.h),
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(Img.logo, height: 80.h, width: 80.w),
              10.horizontalSpace,
              const TextWidget(
                  text: 'VisionStore',
                  fontSize: 18,
                  color: AppColors.primary,
                  fontWeight: FontWeight.bold),
            ],
          ),
        ),
      ),
      items: menuItems,
    );
  }
}
