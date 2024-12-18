class RevenueData {
  bool isSuccess;
  int revenue;
  int quantityProducts;
  int totalOrders;

  RevenueData({
    required this.isSuccess,
    required this.revenue,
    required this.quantityProducts,
    required this.totalOrders,
  });

  // Factory method to create an instance of RevenueData from JSON
  factory RevenueData.fromJson(Map<String, dynamic> json) {
    return RevenueData(
      isSuccess: json['isSuccess'] ?? false,
      revenue: json['revenue'] ?? 0,
      quantityProducts: json['quantityProducts'] ?? 0,
      totalOrders: json['totalOrders'] ?? 0,
    );
  }

  get value => null;

  // Method to convert RevenueData to JSON format
  Map<String, dynamic> toJson() {
    return {
      'isSuccess': isSuccess,
      'revenue': revenue,
      'quantityProducts': quantityProducts,
      'totalOrders': totalOrders,
    };
  }
}
