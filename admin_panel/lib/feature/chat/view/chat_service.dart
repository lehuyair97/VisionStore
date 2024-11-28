import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ChatService extends StatefulWidget {
  const ChatService({super.key});

  @override
  _ChatServiceState createState() => _ChatServiceState();
}

class _ChatServiceState extends State<ChatService> {
  final List<Map<String, String>> messages = [];
  final TextEditingController _controller = TextEditingController();

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        messages.add({
          'message': _controller.text,
          'time': TimeOfDay.now().format(context),
          'sender': 'user',
        });
        _controller.clear();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.network(
              'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
              width: 30,
              height: 30,
            ),
            SizedBox(width: 10.w),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextWidget(
                  text: 'Khách hàng Thảo',
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                ),
                SizedBox(height: 4),
                TextWidget(
                  text: '11:00 AM',
                  fontSize: 10,
                  fontWeight: FontWeight.normal,
                ),
              ],
            ),
          ],
        ),
      ),
      body: Column(
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
                          maxWidth: MediaQuery.of(context).size.width * 0.5),
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
                    icon: Icon(Icons.send, color: Colors.white),
                    onPressed: _sendMessage,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
