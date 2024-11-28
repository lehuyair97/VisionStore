// Định nghĩa mô hình người dùng
class User {
  String role;
  String id;
  String userName;
  String email;
  String password;
  List<String> favorites;
  List<Address> address;
  DateTime createdAt;
  int v;
  String deviceToken;
  String displayName;
  String avatar;
  String phoneNumber;

  User({
    required this.role,
    required this.id,
    required this.userName,
    required this.email,
    required this.password,
    required this.favorites,
    required this.address,
    required this.createdAt,
    required this.v,
    required this.deviceToken,
    this.displayName = '',
    this.avatar = '',
    this.phoneNumber = '',
  });

  // Phương thức chuyển đổi từ JSON sang đối tượng User
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      role: json['role'] ?? 'unknown',
      id: json['_id'] ?? '',
      userName: json['userName'] ?? '',
      email: json['email'] ?? '',
      password: json['password'] ?? '',
      favorites: List<String>.from(json['favorites'] ?? []),
      address: List<Address>.from(
          (json['address'] ?? []).map((x) => Address.fromJson(x))),
      createdAt:
          DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      v: json['__v'] ?? 0,
      deviceToken: json['device_token'] ?? '',
      displayName: json['display_name'] ?? '',
      avatar: json['avatar'] ?? '',
      phoneNumber: json['phoneNumber']?.toString() ?? '',
    );
  }

  // Phương thức chuyển đổi từ đối tượng User sang JSON
  Map<String, dynamic> toJson() {
    return {
      'role': role,
      '_id': id,
      'userName': userName,
      'email': email,
      'password': password,
      'favorites': favorites,
      'address': List<dynamic>.from(address.map((x) => x.toJson())),
      'createdAt': createdAt.toIso8601String(),
      '__v': v,
      'device_token': deviceToken,
      'display_name': displayName,
      'avatar': avatar,
      'phoneNumber': phoneNumber,
    };
  }
}

// Định nghĩa mô hình địa chỉ
class Address {
  String? location;
  String? detail; 
  String? id;

  Address({
    this.location,
    this.detail,
    this.id,
  });

  // Phương thức chuyển đổi từ JSON sang đối tượng Address
  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      location: json['location'] ?? '',
      detail: json['detail'] ?? '',
      id: json['_id'] ?? '',
    );
  }

  get isSelected => null;

  // Phương thức chuyển đổi từ đối tượng Address sang JSON
  Map<String, dynamic> toJson() {
    return {
      'location': location,
      'detail': detail,
      '_id': id,
    };
  }
}
