import 'package:flutter/material.dart';
import 'package:flutter_web/router/app_router.dart';
import 'package:get/get.dart';
import 'package:flutter_web/common/widgets/search_field.dart';

class ChatSupport extends StatelessWidget {
  const ChatSupport({super.key});

  @override
  Widget build(BuildContext context) {
    // Dữ liệu mẫu cho danh sách chat
    final List<Map<String, String>> chatData = [
      {
        'avatar':
            'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        'name': 'Thảo',
        'message': 'Xin chào, tôi cần hỗ trợ về dịch vụ của bạn.',
        'time': '10:30 AM',
      },
      {
        'avatar':
            'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        'name': 'Thắng',
        'message': 'Bạn có thể hỗ trợ tôi không?',
        'time': '11:00 AM',
      },
      {
        'avatar':
            'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        'name': 'Huy',
        'message': 'Chúng ta có thể thảo luận thêm không?',
        'time': '11:15 AM',
      },
      {
        'avatar':
            'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        'name': 'Đức',
        'message': 'Tôi cần thêm thông tin về sản phẩm.',
        'time': '11:30 AM',
      },
      // Thêm nhiều dữ liệu hơn nếu cần
    ];

    return Scaffold(
      body: chatData.isEmpty
          ? Center(
              child: Text(
                'No chats available',
                style: TextStyle(fontSize: 20, color: Colors.grey),
              ),
            )
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: SearchField(
                    controller: TextEditingController(),
                    onChanged: (value) {},
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: chatData.length,
                    itemBuilder: (context, index) {
                      final chat = chatData[index];

                      return GestureDetector(
                        onTap: () {
                          Get.toNamed(AppRouter.chatService);
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                              vertical: 8.0, horizontal: 16.0),
                          child: ListTile(
                            leading: CircleAvatar(
                              radius: 30, // Tăng kích thước avatar
                              backgroundImage: NetworkImage(chat['avatar']!),
                            ),
                            title: Text(
                              chat['name']!,
                              style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight
                                      .bold), // Tăng kích thước và độ đậm của tên
                            ),
                            subtitle: Text(
                              chat['message']!,
                              style: TextStyle(
                                  fontSize: 16), // Tăng kích thước tin nhắn
                            ),
                            trailing: Text(
                              chat['time']!,
                              style: TextStyle(
                                  fontSize: 14,
                                  color:
                                      Colors.grey), // Tăng kích thước thời gian
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
    );
  }
}
