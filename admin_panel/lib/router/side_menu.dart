import 'package:flutter/material.dart';
import 'package:easy_sidemenu/easy_sidemenu.dart';
import 'package:flutter_web/common/img/img.dart';
import 'package:flutter_web/common/utils/custom_dialog.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
      SideMenuItem(
        title: 'Danh sách sản phẩm',
        onTap: (index, _) {
          controller.changePage(index);
        },
        icon: Icon(Icons.list),
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
          CustomDialog().showConfirmationDialog(
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

    return Material(
      color: AppColors.white,
      elevation: 10,
      shadowColor: Colors.black.withOpacity(0.2), // Màu sắc của bóng

      shape: RoundedRectangleBorder(
        side: BorderSide(color: AppColors.primary.withOpacity(0.1)),
        borderRadius: BorderRadius.circular(10),
      ),
      child: SideMenu(
        title: Padding(
          padding: EdgeInsets.symmetric(vertical: 20.h),
          child: Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Image.asset(
                  Img.logo,
                  height: 80.h,
                  width: 80.w,
                ),
                10.horizontalSpace,
                const TextWidget(
                  text: 'VisionStore',
                  fontSize: 18,
                  color: AppColors.primary,
                  fontWeight: FontWeight.bold,
                ),
              ],
            ),
          ),
        ),
        controller: controller,
        items: menuItems,
      ),
    );
  }
}
