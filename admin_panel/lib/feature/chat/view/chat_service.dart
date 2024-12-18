import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:dio/dio.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'dart:convert';
import 'dart:async';
import 'package:get/get.dart';

class ChatService extends StatefulWidget {
  const ChatService({super.key});

  @override
  _ChatServiceState createState() => _ChatServiceState();
}

class _ChatServiceState extends State<ChatService> {
  final List<Map<String, String>> messages = [];
  final TextEditingController _controller = TextEditingController();
  final Dio _dio = Dio();
  bool _isLoading = false;
  final isloadingmessage = false.obs;

  // Hàm gửi tin nhắn
  Future<void> sendMessage(String message) async {
    if (_controller.text.isNotEmpty) {
      print("message: $message");
      setState(() {
        _isLoading = true;
        messages.add({
          'message': _controller.text,
          'time': TimeOfDay.now().format(context),
          'sender': 'user',
        });
        _controller.clear();
      });

      try {
        String response = await _sendRequestToAPI(message);

        // Kiểm tra widget có còn tồn tại không trước khi cập nhật UI
        if (mounted) {
          setState(() {
            messages.add({
              'message': response,
              'time': TimeOfDay.now().format(context),
              'sender': 'bot',
            });
            _isLoading = false;
          });
        }
      } catch (e) {
        // Nếu có lỗi xảy ra, cập nhật trạng thái lỗi
        if (mounted) {
          setState(() {
            _isLoading = false;
          });
        }
        print('Error: $e');
      }
    }
  }

  // Hàm gọi API Hugging Face
  Future<String> _sendRequestToAPI(String message) async {
    try {
      print("_sendRequestToAPI $message");
      isloadingmessage.value = true;
      final response = await _dio.post(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        options: Options(
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
        ),
        data: {
          'inputs': message,
        },
      );

      print("_sendRequestToAPI ${response.data}");

      // Kiểm tra phản hồi từ API
      if (response.statusCode == 200) {
        return response.data[0]?['generated_text'].toString() ??
            "Không có phản hồi từ bot.";
      } else {
        // Xử lý lỗi từ API nếu statusCode không phải 200
        print("API error: ${response.statusCode}");
        return "Có lỗi xảy ra, vui lòng thử lại.";
      }
    } catch (e) {
      // Xử lý lỗi khi gọi API
      print("Lỗi khi gọi API Hugging Face: $e");
      return "Có lỗi xảy ra.";
    } finally {
      isloadingmessage.value = false;
    }
  }

  @override
  Widget build(BuildContext context) {
 
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 200, vertical: 50),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final message = messages[index];
                  final isUser = message['sender'] == 'user';
                  return Row(
                    mainAxisAlignment:
                        isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
                    children: [
                      Container(
                        constraints: BoxConstraints(
                            maxWidth: MediaQuery.of(context).size.width * 0.3),
                        padding: const EdgeInsets.symmetric(
                            vertical: 4.0, horizontal: 8.0),
                        child: Card(
                          color: isUser ? Colors.blue[50] : Colors.green[50],
                          child: ListTile(
                            title: TextWidget(
                              text: message['message']!,
                              fontSize: 16,
                              color: Colors.black87,
                            ),
                            subtitle: TextWidget(
                              text: message['time']!,
                              fontSize: 12,
                              color: Colors.black54,
                            ),
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
            // Giao diện nhập tin nhắn
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: SearchField(
                      controller: _controller,
                      onChanged: (value) {},
                      isSearch: false,
                    ),
                  ),
                  SizedBox(width: 20.w),
                  CircleAvatar(
                    backgroundColor: Colors.blue,
                    child: IconButton(
                      icon: isloadingmessage.value
                          ? CircularProgressIndicator(
                              color: Colors.white,
                            )
                          : Icon(Icons.send, color: Colors.white),
                      onPressed: () => sendMessage(_controller.text),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
