import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/model/product_top10_model.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

class ProductItemTop extends StatelessWidget {
  final ProductTop10Model product;
  const ProductItemTop({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final controllerProduct = Get.put(ProductsController());
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 30.w, vertical: 20.w),
      decoration: BoxDecoration(
        color: AppColors.backgroundCard,
        borderRadius: BorderRadius.circular(16),
      ),
      child: SizedBox(
        width: Get.width * 0.3,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              decoration: BoxDecoration(
                color: AppColors.backgroundCard,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Image.network(
                controllerProduct
                        .productGridRows
                        .firstWhere((element) => element.id == product.id)
                        .image ?? '',
                width: 30,
                height: 30,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) =>
                    const Icon(Icons.error, size: 30),
              ),
            ),
            30.horizontalSpace,
            SizedBox(
              width: Get.width * 0.1,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  TextWidget(
                    text: product.productName ?? '',
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                  20.verticalSpace,
                  TextWidget(
                    text:"${controllerProduct
                          .productGridRows
                          .firstWhere((element) => element.id == product.id)
                          .price.toString() ?? ''} VNĐ",
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ],
              ),
            ),
                SizedBox(
                  width: Get.width * 0.4,
                  child: TextWidget(
                    text: "Chi tiết: ${controllerProduct
                              .productGridRows
                              .firstWhere((element) => element.id == product.id)
                              .descriptions ?? ''}",
                    fontSize: 12,
                    color: AppColors.white,
                    maxLines: 6,
                  ),
                ),
            const Spacer(),
            Column(
              children: [
                 TextWidget(
                  text: "Tổng doanh thu: ${product.totalRevenue.toString() ?? ''} VNĐ",
                  fontSize: 14,
                  color: AppColors.white,
                ),
                10.verticalSpace,
                TextWidget(
                  text: "Thời gian bao hành: ${controllerProduct
                            .productGridRows
                            .firstWhere((element) => element.id == product.id)
                            .warrantyPeriod ?? ''}",
                  fontSize: 12,
                  color: AppColors.grey,
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
