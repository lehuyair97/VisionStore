import Colors from '@theme/colors';
import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

type TextProps = {
  children: React.ReactNode; // Nội dung văn bản
  style?: TextStyle; // Kiểu dáng tùy chọn
};

const defaultStyle: TextStyle = {
  fontSize: 16, // Kích thước chữ mặc định
  color: Colors.primary, // Màu chữ mặc định
  lineHeight: 24, // Chiều cao dòng mặc định
  fontWeight: 'bold',
};

const TextHome = ({ children, style }: TextProps) => {
  return (
    <RNText style={[defaultStyle, style]}>
      {children}
    </RNText>
  );
}

export default TextHome;