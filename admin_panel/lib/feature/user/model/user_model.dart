class User {
  final String? role;
  final String? id;
  final String? userName;
  final String? email;
  final String? password;
  final List<String>? favorites;
  final List<Address>? address;
  final List<String>? paymentTransaction;
  final DateTime? createdAt;
  final int? version;
  final String? deviceToken;
  final String? avatar;
  final String? displayName;
  final int? phoneNumber;
  final List<String>? recentProducts;
  final AddressSelected? addressSelected;

  User({
    this.role,
    this.id,
    this.userName,
    this.email,
    this.password,
    this.favorites,
    this.address,
    this.paymentTransaction,
    this.createdAt,
    this.version,
    this.deviceToken,
    this.avatar,
    this.displayName,
    this.phoneNumber,
    this.recentProducts,
    this.addressSelected,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      role: json['role'],
      id: json['_id'],
      userName: json['userName'],
      email: json['email'],
      password: json['password'],
      favorites: json['favorites'] != null ? List<String>.from(json['favorites']) : null,
      address: json['address'] != null
          ? (json['address'] as List).map((item) => Address.fromJson(item)).toList()
          : null,
      paymentTransaction: json['payment_transaction'] != null
          ? List<String>.from(json['payment_transaction'])
          : null,
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      version: json['__v'],
      deviceToken: json['device_token'],
      avatar: json['avatar'],
      displayName: json['display_name'],
      phoneNumber: json['phoneNumber'],
      recentProducts: json['recent_products'] != null
          ? List<String>.from(json['recent_products'])
          : null,
      addressSelected: json['addressSelected'] != null
          ? AddressSelected.fromJson(json['addressSelected'])
          : null,
    );
  }
}

class Address {
  final String? location;
  final String? detail;
  final bool? isSelected;
  final String? id;

  Address({
    this.location,
    this.detail,
    this.isSelected,
    this.id,
  });

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      location: json['location'],
      detail: json['detail'],
      isSelected: json['isSelected'],
      id: json['_id'],
    );
  }
}

class AddressSelected {
  final String? location;
  final String? detail;
  final int? districtId;
  final int? wardCode;

  AddressSelected({
    this.location,
    this.detail,
    this.districtId,
    this.wardCode,
  });

  factory AddressSelected.fromJson(Map<String, dynamic> json) {
    return AddressSelected(
      location: json['location'],
      detail: json['detail'],
      districtId: json['district_id'],
      wardCode: json['ward_code'],
    );
  }
}