import 'package:flutter/material.dart';
import 'package:flutter_web/common/utils/responsive.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/profile/widgets/scheduled.dart';
import 'package:flutter_web/feature/profile/widgets/weightHeightBloodCard.dart';
import 'package:get/get_connect/connect.dart';

class Profile extends StatelessWidget {
  final Color cardBackgroundColor;
  final String avatar;
  const Profile(
      {Key? key, required this.cardBackgroundColor, required this.avatar})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(Responsive.isMobile(context) ? 10 : 30.0),
          topLeft: Radius.circular(Responsive.isMobile(context) ? 10 : 30.0),
        ),
        color: cardBackgroundColor ?? AppColors.white,
        shape: BoxShape.rectangle,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 5,
            blurRadius: 7,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            children: [
              const SizedBox(
                height: 50,
              ),
              ClipOval(
                clipBehavior: Clip.hardEdge,
                child: Image.network(
                  avatar,
                  height: 100,
                  width: 100,
                ),
              ),
              const SizedBox(
                height: 15,
              ),
              const TextWidget(
                text: "Phạm Đồng Thảo",
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
              const SizedBox(
                height: 2,
              ),
              const TextWidget(
                text: "Chỉnh sửa chi tiết hồ sơ",
                fontSize: 12,
                color: AppColors.colorIcon,
              ),
              Padding(
                padding:
                    EdgeInsets.all(Responsive.isMobile(context) ? 15 : 20.0),
                child: const WeightHeightBloodCard(),
              ),
              SizedBox(
                height: Responsive.isMobile(context) ? 20 : 40,
              ),
              Scheduled(),
            ],
          ),
        ),
      ),
    );
  }
}
