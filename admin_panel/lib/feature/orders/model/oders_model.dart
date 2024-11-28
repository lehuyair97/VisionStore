class Order {
  final String? id;
  final String? customerId;
  final String? customerName;
  final String? customerEmail;
  final String? customerAddress;
  final int? customerPhoneNumber;
  final String? paymentMethod;
  final DeliveryMethod? deliveryMethod;
  final int? totalBill;
  final List<OrderItem>? items;
  final DateTime? orderDate;
  final String? status;
  final int? version;

  Order({
    this.id,
    this.customerId,
    this.customerName,
    this.customerEmail,
    this.customerAddress,
    this.customerPhoneNumber,
    this.paymentMethod,
    this.deliveryMethod,
    this.totalBill,
    this.items,
    this.orderDate,
    this.status,
    this.version,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['_id'],
      customerId: json['customerId'],
      customerName: json['customerName'],
      customerEmail: json['customerEmail'],
      customerAddress: json['customerAddress'],
      customerPhoneNumber: json['customerPhoneNumber'],
      paymentMethod: json['paymentMethod'],
      deliveryMethod: json['deliveryMethod'] != null
          ? DeliveryMethod.fromJson(json['deliveryMethod'])
          : null,
      totalBill: json['totalBill'],
      items: json['items'] != null
          ? (json['items'] as List)
              .map((item) => OrderItem.fromJson(item))
              .toList()
          : null,
      orderDate: json['orderDate'] != null
          ? DateTime.parse(json['orderDate'])
          : null,
      status: json['status'],
      version: json['__v'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'customerId': customerId,
      'customerName': customerName,
      'customerEmail': customerEmail,
      'customerAddress': customerAddress,
      'customerPhoneNumber': customerPhoneNumber,
      'paymentMethod': paymentMethod,
      'deliveryMethod': deliveryMethod?.toJson(),
      'totalBill': totalBill,
      'items': items?.map((item) => item.toJson()).toList(),
      'orderDate': orderDate?.toIso8601String(),
      'status': status,
      '__v': version,
    };
  }
}

class DeliveryMethod {
  final String? method;
  final String? description;
  final String? estimatedDeliveryTime;
  final int? price;

  DeliveryMethod({
    this.method,
    this.description,
    this.estimatedDeliveryTime,
    this.price,
  });

  factory DeliveryMethod.fromJson(Map<String, dynamic> json) {
    return DeliveryMethod(
      method: json['method'],
      description: json['description'],
      estimatedDeliveryTime: json['estimated_delivery_time'],
      price: json['price'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'method': method,
      'description': description,
      'estimated_delivery_time': estimatedDeliveryTime,
      'price': price,
    };
  }
}

class OrderItem {
  final String? productId;
  final String? productName;
  final int? price;
  final int? quantity;
  final String? image;
  final String? id;

  OrderItem({
    this.productId,
    this.productName,
    this.price,
    this.quantity,
    this.image,
    this.id,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      productId: json['productId'],
      productName: json['productName'],
      price: json['price'],
      quantity: json['quantity'],
      image: json['image'],
      id: json['_id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'productId': productId,
      'productName': productName,
      'price': price,
      'quantity': quantity,
      'image': image,
      '_id': id,
    };
  }
}