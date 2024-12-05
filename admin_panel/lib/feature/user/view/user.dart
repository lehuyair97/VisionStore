import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:flutter_web/feature/user/controller/user_controller.dart';
import 'package:flutter_web/feature/user/widget/user_gridRow.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class UserView extends StatelessWidget {
  const UserView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<UserController>();

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 40.w, vertical: 30.h),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              CustomAppBar(),
              30.verticalSpace,
              Container(
                alignment: Alignment.center,
                width: Get.width * 0.8,
                decoration: BoxDecoration(
                  color: AppColors.backgroundCard.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding:
                      EdgeInsets.symmetric(horizontal: 20.w, vertical: 20.h),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const TextWidget(
                        text: "Danh sách người dùng",
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: AppColors.white,
                      ),
                      20.verticalSpace,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          SizedBox(
                            width: Get.width * 0.3,
                            child: SearchField(
                              controller: controller.searchController,
                              onChanged: (value) {},
                            ),
                          ),
                        ],
                      ),
                      30.verticalSpace,
                      Card(
                        elevation: 5,
                        color: AppColors.backgroundCard,
                        child: Container(
                          height: Get.height * 1,
                          width: Get.width * 0.8,
                          alignment: Alignment.center,
                          child: Obx(() {
                            if (controller.isLoading.value) {
                              return const Center(
                                  child: CircularProgressIndicator());
                            }
                            return Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Expanded(
                                  flex: 4,
                                  child: SfDataGrid(
                                    headerRowHeight: 80,
                                    rowHeight: 80,
                                    gridLinesVisibility:
                                        GridLinesVisibility.none,
                                    headerGridLinesVisibility:
                                        GridLinesVisibility.none,
                                    source:
                                        controller.userDataSource.value.first,
                                    columns: <GridColumn>[
                                      GridColumn(
                                        visible: false,
                                        columnName: UserGridCell.id,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Id',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.avatar,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Ảnh',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.user,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Tên người dùng',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.phone,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Số điện thoại',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.email,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Email',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.address,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Địa chỉ',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.edit,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Sửa',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.changePass,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Mật khẩu',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: UserGridCell.delete,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Xóa',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            );
                          }),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
