class ProductTop10Model {
  String id;
  int totalQuantity;
  String productId;
  String productName;
  int totalRevenue;

  ProductTop10Model({
    required this.id,
    required this.totalQuantity,
    required this.productId,
    required this.productName,
    required this.totalRevenue,
  });

  factory ProductTop10Model.fromJson(Map<String, dynamic> json) {
    return ProductTop10Model(
      id: json['_id'],
      totalQuantity: json['totalQuantity'],
      productId: json['productId'],
      productName: json['productName'],
      totalRevenue: json['totalRevenue'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'totalQuantity': totalQuantity,
      'productId': productId,
      'productName': productName,
      'totalRevenue': totalRevenue,
    };
  }
}
