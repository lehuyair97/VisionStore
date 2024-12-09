import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/auth/model/user.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_web/feature/user_changepass/view/changepass.dart';
import 'package:flutter_web/feature/user_update/controller/user_update_controller.dart';
import 'package:flutter_web/feature/user_update/view/user_update.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class UserGridCell {
  static const String id = 'id';
  static const String avatar = 'avatar';
  static const String user = 'user';
  static const String email = 'email';
  static const String phone = 'phone';
  static const String address = 'address';
  //delete
  static const String edit = 'edit';
  static const String changePass = 'changePass';
  static const String delete = 'delete';
}

class UserGridDataSource extends DataGridSource {
  UserGridDataSource({required List<User> users}) {
    _employees = users.map<DataGridRow>((e) {
      String address = '';
      if (e.address != null && e.address!.isNotEmpty) {
        Address? selectedAddress = e.address!.firstWhere(
          (addr) => addr.isSelected == true,
          orElse: () => e.address!.first,
        );
        address = '${selectedAddress.location}, ${selectedAddress.detail}';
      }

      return DataGridRow(cells: [
        DataGridCell<String>(columnName: UserGridCell.id, value: e.id ?? ''),
        DataGridCell<String>(
            columnName: UserGridCell.avatar, value: e.avatar ?? ''),
        DataGridCell<String>(
            columnName: UserGridCell.user, value: e.userName ?? ''),
        DataGridCell<String>(
            columnName: UserGridCell.email, value: e.phoneNumber ?? ''),
        DataGridCell<String>(
            columnName: UserGridCell.phone, value: e.email?.toString() ?? ''),
        DataGridCell<String>(columnName: UserGridCell.address, value: address),
        DataGridCell<String>(columnName: UserGridCell.edit, value: ''),
        DataGridCell<String>(columnName: UserGridCell.changePass, value: ''),
        DataGridCell<String>(columnName: UserGridCell.delete, value: ''),
      ]);
    }).toList();
  }

  List<DataGridRow> _employees = [];

  @override
  List<DataGridRow> get rows => _employees;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    final controller = Get.put(UserUpdateController());

    int rowIndex = _employees.indexOf(row);
    bool isEvenRow = rowIndex % 2 == 0;

    return DataGridRowAdapter(
      color: isEvenRow
          ? AppColors.grey.withOpacity(0.2)
          : AppColors.backgroundCard,
      cells: row.getCells().map<Widget>((dataGridCell) {
        switch (dataGridCell.columnName) {
          case UserGridCell.avatar:
            print("dataGridCell.value: ${dataGridCell.value}");
            String imageUrl = dataGridCell.value ?? '';
            return Container(
              height: 80.0,
              alignment: Alignment.center,
              padding: EdgeInsets.all(8.0),
              child: imageUrl.isNotEmpty
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: Image.network(
                        imageUrl,
                        width: 50,
                        height: 50,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stack) {
                          print("Error loading image: $error");
                          return Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.error),
                            ],
                          );
                        },
                      ),
                    )
                  : Icon(Icons.error),
            );
          case UserGridCell.address:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
                maxLines: 2,
              ),
            );
          case UserGridCell.edit:
            return IconButton(
              onPressed: () {
                String userId = row
                    .getCells()
                    .firstWhere((cell) => cell.columnName == UserGridCell.id)
                    .value
                    .toString();
                Get.dialog(UserUpdate(userId: userId));
              },
              icon: Icon(Icons.edit, color: AppColors.white),
            );
          case UserGridCell.changePass:
            return IconButton(
              onPressed: () {
                String userId = row
                    .getCells()
                    .firstWhere((cell) => cell.columnName == UserGridCell.id)
                    .value
                    .toString();
                Get.dialog(Changepass(userId: userId));
              },
              icon: Icon(Icons.lock, color: AppColors.white),
            );
          case UserGridCell.delete:
            return IconButton(
              onPressed: () {
                String userId = row
                    .getCells()
                    .firstWhere((cell) => cell.columnName == UserGridCell.id)
                    .value
                    .toString();
                controller.deleteUserById(userId);
              },
              icon: Icon(Icons.delete),
              color: AppColors.colorRed,
            );
          case UserGridCell.user:
          case UserGridCell.email:
          case UserGridCell.phone:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            );
          default:
            return Container(
              height: 80.0,
              alignment: Alignment.center,
              padding: EdgeInsets.all(16.0),
              child: Text(dataGridCell.value.toString()),
            );
        }
      }).toList(),
    );
  }
}
