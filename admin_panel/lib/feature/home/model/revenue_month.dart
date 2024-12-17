class RevenueMonth {
  bool isSuccess;
  RevenueMonthData currentMonth;
  RevenueMonthData previousMonth;
  String revenueGrowth;
  String orderGrowth;
  String quantityGrowth;

  RevenueMonth({
    required this.isSuccess,
    required this.currentMonth,
    required this.previousMonth,
    required this.revenueGrowth,
    required this.orderGrowth,
    required this.quantityGrowth,
  });

  // Factory method to create an instance of RevenueData from JSON
  factory RevenueMonth.fromJson(Map<String, dynamic> json) {
    return RevenueMonth(
      isSuccess: json['isSuccess'] ?? false,
      currentMonth: RevenueMonthData.fromJson(json['data']['currentMonth'] ?? {}),
      previousMonth: RevenueMonthData.fromJson(json['data']['previousMonth'] ?? {}),
      revenueGrowth: json['data']['revenueGrowth'] ?? '0.00',
      orderGrowth: json['data']['orderGrowth'] ?? '0.00',
      quantityGrowth: json['data']['quantityGrowth'] ?? '0.00',
    );
  }

  // Method to convert RevenueData to JSON format
  Map<String, dynamic> toJson() {
    return {
      'isSuccess': isSuccess,
      'currentMonth': currentMonth.toJson(),
      'previousMonth': previousMonth.toJson(),
      'revenueGrowth': revenueGrowth,
      'orderGrowth': orderGrowth,
      'quantityGrowth': quantityGrowth,
    };
  }
}

class RevenueMonthData {
  int totalRevenue;
  int totalOrders;
  int totalQuantity;

  RevenueMonthData({
    required this.totalRevenue,
    required this.totalOrders,
    required this.totalQuantity,
  });

  // Factory method to create an instance of RevenueMonthData from JSON
  factory RevenueMonthData.fromJson(Map<String, dynamic> json) {
    return RevenueMonthData(
      totalRevenue: json['totalRevenue'] ?? 0,
      totalOrders: json['totalOrders'] ?? 0,
      totalQuantity: json['totalQuantity'] ?? 0,
    );
  }

  // Method to convert RevenueMonthData to JSON format
  Map<String, dynamic> toJson() {
    return {
      'totalRevenue': totalRevenue,
      'totalOrders': totalOrders,
      'totalQuantity': totalQuantity,
    };
  }
}
