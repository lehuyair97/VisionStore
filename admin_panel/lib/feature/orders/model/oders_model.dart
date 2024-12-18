class Order {
  final bool hasCommented;
  final String? id;
  final String? customerId;
  final String? customerName;
  final String? customerEmail;
  final String? customerAddress;
  final int? customerPhoneNumber;
  final String? paymentMethod;
  final DeliveryMethod? deliveryMethod;
  final int? totalBill;
  final List<Item>? items;
  final String? orderDate;
  final String? status;
  final int? version;
  final List<Cart>? carts;

  Order({
    required this.hasCommented,
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
    this.carts,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      hasCommented: json['hasCommented'] ?? false,
      id: json['_id'] as String?,
      customerId: json['customerId'] as String?,
      customerName: json['customerName'] as String?,
      customerEmail: json['customerEmail'] as String?,
      customerAddress: json['customerAddress'] as String?,
      customerPhoneNumber: json['customerPhoneNumber'] as int?,
      paymentMethod: json['paymentMethod'] as String?,
      deliveryMethod: json['deliveryMethod'] != null
          ? DeliveryMethod.fromJson(json['deliveryMethod'])
          : null,
      totalBill: json['totalBill'] as int?,
      items: json['items'] != null
          ? List<Item>.from(json['items'].map((item) => Item.fromJson(item)))
          : null,
      orderDate: json['orderDate'] as String?,
      status: json['status'] as String?,
      version: json['__v'] as int?,
      carts: json['carts'] != null
          ? List<Cart>.from(json['carts'].map((cart) => Cart.fromJson(cart)))
          : null,
    );
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
      method: json['method'] as String?,
      description: json['description'] as String?,
      estimatedDeliveryTime: json['estimated_delivery_time'] as String?,
      price: json['price'] as int?,
    );
  }

  get estimated_delivery_time => null;
}

class Item {
  final String? productId;
  final String? productName;
  final int? price;
  final int? quantity;
  final String? image;
  final String? id;

  Item({
    this.productId,
    this.productName,
    this.price,
    this.quantity,
    this.image,
    this.id,
  });

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      productId: json['productId'] as String?,
      productName: json['productName'] as String?,
      price: json['price'] as int?,
      quantity: json['quantity'] as int?,
      image: json['image'] as String?,
      id: json['_id'] as String?,
    );
  }
}

class Cart {
  final String? paymentStatus;
  final int? price;
  final String? productName;
  final String? description;
  final int? quantity;
  final String? image;
  final String? productId;
  final String? id;

  Cart({
    this.paymentStatus,
    this.price,
    this.productName,
    this.description,
    this.quantity,
    this.image,
    this.productId,
    this.id,
  });

  factory Cart.fromJson(Map<String, dynamic> json) {
    return Cart(
      paymentStatus: json['paymentStatus'] as String?,
      price: json['price'] as int?,
      productName: json['productName'] as String?,
      description: json['description'] as String?,
      quantity: json['quantity'] as int?,
      image: json['image'] as String?,
      productId: json['productId'] as String?,
      id: json['_id'] as String?,
    );
  }
}
