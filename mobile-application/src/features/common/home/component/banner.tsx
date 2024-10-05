import { Image } from 'react-native';

const Banner = () => {
    return (
        <Image
        source={require('../../../../assets/icons/banner.png')}
        style={{ width: '100%', height: 133, borderRadius: 16 }}
        resizeMode="cover"
      />
    );
}

export default Banner;