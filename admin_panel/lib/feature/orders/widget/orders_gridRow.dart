import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/orders/model/oders_model.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class OrdersGridCell {
  static const String id = 'id';
  static const String user = 'user';
  static const String email = 'email';
  static const String phone = 'phone';
  static const String address = 'address';
  static const String paymentMethod = 'paymentMethod';
  static const String deliveryMethod = 'deliveryMethod';
}

class OrdersGridDataSource extends DataGridSource {
  OrdersGridDataSource({required List<Order> orders}) {
    _employees = orders.map<DataGridRow>((e) {
      return DataGridRow(cells: [
        DataGridCell<String>(columnName: OrdersGridCell.id, value: e.id ?? ''),
        DataGridCell<String>(
            columnName: OrdersGridCell.user, value: e.customerName ?? ''),
        DataGridCell<String>(
            columnName: OrdersGridCell.email, value: e.customerEmail ?? ''),
        DataGridCell<String>(
            columnName: OrdersGridCell.phone,
            value: e.customerPhoneNumber.toString()),
        DataGridCell<String>(
            columnName: OrdersGridCell.address, value: e.customerAddress ?? ''),
        DataGridCell<String>(
            columnName: OrdersGridCell.paymentMethod,
            value: e.paymentMethod ?? ''),
        DataGridCell<String>(
            columnName: OrdersGridCell.deliveryMethod,
            value: e.deliveryMethod?.method ?? ''),
      ]);
    }).toList();
  }

  List<DataGridRow> _employees = [];

  @override
  List<DataGridRow> get rows => _employees;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    int rowIndex = _employees.indexOf(row);
    bool isEvenRow = rowIndex % 2 == 0;

    return DataGridRowAdapter(
      color: isEvenRow
          ? AppColors.grey.withOpacity(0.2)
          : AppColors.backgroundCard,
      cells: row.getCells().map<Widget>((dataGridCell) {
        switch (dataGridCell.columnName) {
          case OrdersGridCell.id:
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
          case OrdersGridCell.address:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
                maxLines: 2,
              ),
            );
          case OrdersGridCell.user:
          case OrdersGridCell.email:
          case OrdersGridCell.phone:
          case OrdersGridCell.paymentMethod:
          case OrdersGridCell.deliveryMethod:
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
