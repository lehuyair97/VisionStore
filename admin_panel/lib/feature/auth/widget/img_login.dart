import 'package:flutter/material.dart';
import 'package:flutter_web/common/img/lottie.dart';
import 'package:lottie/lottie.dart';

class ImgLogin extends StatelessWidget {
  const ImgLogin({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Lottie.network(LottieClass.login, fit: BoxFit.cover),
    );
  }
}
