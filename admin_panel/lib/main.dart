import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web/core/configs/theme/app_theme.dart';
import 'package:flutter_web/router/app_router.dart';
import 'package:get/get.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: Size(1920, 1080),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) => GetMaterialApp(
        initialRoute: AppRouter.login,
        getPages: AppRouter.routes,
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
      ),
    );
  }
}
