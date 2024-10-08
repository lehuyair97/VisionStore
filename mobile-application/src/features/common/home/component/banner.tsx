import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

interface BannerProps {
  images: any[];
}


const Banner = ({ images }: BannerProps) => {
  const height = 135;
    return (
      <View style={{ height: height , borderRadius:16}}>
        <Swiper
            style={{ height: height }}
            autoplay
            autoplayTimeout={3}
            showsPagination
            dotColor="#90A4AE"
            activeDotColor="#FFEE58"
        >
            {images.map((image, index) => (
                <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={image}
                        style={{ width: '100%', height: height , borderRadius:16}} // Đặt kích thước cụ thể cho ảnh
                        resizeMode="cover" // Đảm bảo ảnh giữ nguyên tỷ lệ
                    />
                </View>
            ))}
        </Swiper>
      </View>

    );
}

export default Banner;