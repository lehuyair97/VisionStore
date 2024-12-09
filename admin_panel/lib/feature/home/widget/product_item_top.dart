import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ProductItemTop extends StatelessWidget {
  final ProductItem product;
  const ProductItemTop({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 30.w, vertical: 20.w),
      decoration: BoxDecoration(
        color: AppColors.backgroundCard,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Container(
            decoration: BoxDecoration(
              color: AppColors.backgroundCard,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Image.network(
              product.image ?? '',
              width: 30,
              height: 30,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) =>
                  const Icon(Icons.error, size: 30),
            ),
          ),
          30.horizontalSpace,
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextWidget(
                text: product.name ?? '',
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
              20.verticalSpace,
              TextWidget(
                text: product.price.toString() ?? '',
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ],
          ),
          const Spacer(),
          TextWidget(
            text: product.warrantyPeriod ?? '',
            fontSize: 12,
            color: AppColors.grey,
          )
        ],
      ),
    );
  }
}
