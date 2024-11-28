import 'package:flutter/material.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/model/health_model.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  final searchController = TextEditingController();

  final List<HealthModel> healthDetails = [
    HealthModel(
        icon: 'assets/svg/burn.svg',
        value: "1,200",
        title: "Người dùng hoạt động",
        color: AppColors.primary.withOpacity(0.5)),
    HealthModel(
        icon: 'assets/svg/steps.svg',
        value: "\$15,000",
        title: "Tổng doanh thu",
        color: AppColors.black.withOpacity(0.5)),
    HealthModel(
        icon: 'assets/svg/distance.svg',
        value: "350",
        title: "Đơn hàng mới",
        color: AppColors.yellow.withOpacity(0.5)),
    HealthModel(
        icon: 'assets/svg/sleep.svg',
        value: "85%",
        title: "Phản hồi tích cực",
        color: AppColors.textDoing.withOpacity(0.5)),
  ];
}
