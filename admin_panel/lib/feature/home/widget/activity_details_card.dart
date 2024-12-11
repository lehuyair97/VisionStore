import 'package:flutter/material.dart';
import 'package:flutter_web/common/img/lottie.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/model/health_model.dart';
import 'package:flutter_web/feature/home/widget/custom_card.dart';
import 'package:get/get.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:lottie/lottie.dart';

class ActivityDetailsCard extends StatelessWidget {
  final List<HealthModel> healthDetails;
  final Color? color;
  ActivityDetailsCard({
    super.key,
    this.color,
    required this.healthDetails,
  });

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      itemCount: healthDetails.length,
      shrinkWrap: true,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          childAspectRatio: 1.5,
          crossAxisCount: 4,
          crossAxisSpacing: 30,
          mainAxisSpacing: 30.0),
      itemBuilder: (context, i) {
        return CustomCard(
          color: healthDetails[i].color,
          child: Row(
            children: [
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SvgPicture.asset(healthDetails[i].icon),
                    Padding(
                      padding: const EdgeInsets.only(top: 15, bottom: 10),
                      child: TextWidget(
                        text: healthDetails[i].title,
                        fontSize: 18,
                        color: AppColors.white,
                        fontWeight: FontWeight.w600,
                        maxLines: 2,
                        textAlign: TextAlign.center,
                      ),
                    ),
                    TextWidget(
                      text: healthDetails[i].value,
                      fontSize: 14,
                      color: Colors.grey,
                      fontWeight: FontWeight.normal,
                    ),
                  ],
                ),
              ),
              Expanded(
                  child: SizedBox(
                child: Lottie.network(LottieClass.Character),
              )),
            ],
          ),
        );
      },
    );
  }
}
