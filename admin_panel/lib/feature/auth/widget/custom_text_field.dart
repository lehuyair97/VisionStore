import 'package:flutter/material.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';

class CustomTextField extends StatefulWidget {
  final TextEditingController controller;
  final String hintText;
  final Function()? onTap;
  final bool obscureText; // Trạng thái ẩn/hiện mật khẩu
  final IconData? suffixIcon; // Icon hiển thị bên phải
  final Function(String)? onSubmit;
  final FocusNode? focusNode;
  final double? width;
  final bool isMobile;

  CustomTextField({
    required this.controller,
    required this.hintText,
    this.obscureText = false,
    this.suffixIcon, // Thêm thuộc tính suffixIcon
    this.onTap,
    this.onSubmit,
    this.focusNode,
    this.width,
    this.isMobile = false,
  });

  @override
  _CustomTextFieldState createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late bool _obscureText;

  @override
  void initState() {
    super.initState();
    _obscureText = widget.obscureText;
  }

  void _togglePasswordVisibility() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          focusNode: widget.focusNode,
          controller: widget.controller,
          style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w400,
              color: AppColors.white),
          textAlignVertical: TextAlignVertical.center,
          onTap: widget.onTap,
          obscureText: _obscureText,
          onSubmitted: widget.onSubmit,
          decoration: InputDecoration(
            contentPadding: EdgeInsets.symmetric(
                horizontal: widget.isMobile ? 12 : 24,
                vertical: widget.isMobile ? 12 : 12),
            hintText: widget.hintText,
            errorBorder: InputBorder.none,
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12), // Đặt độ bo tròn
              borderSide:
                  BorderSide(color: AppColors.primary), // Màu border khi focus
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12), // Đặt độ bo tròn
              borderSide: BorderSide(
                  color: Colors.grey.shade400,
                  width: 1), // Màu border khi không focus
            ),
            suffixIcon: widget.suffixIcon != null
                ? IconButton(
                    icon: Icon(
                      _obscureText ? Icons.visibility_off : widget.suffixIcon,
                      size: 24,
                    ),
                    color: AppColors.colorIcon,
                    onPressed: _togglePasswordVisibility,
                  )
                : null,
          ),
        ),
      ],
    );
  }
}
