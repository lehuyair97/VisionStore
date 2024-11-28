import 'package:flutter/material.dart';
import 'package:flutter_web/common/img/img.dart';

class ImgLogin extends StatelessWidget {
  const ImgLogin({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Image.asset(
        
        Img.logo,
        fit: BoxFit.cover,
      ),
    );
  }
}
