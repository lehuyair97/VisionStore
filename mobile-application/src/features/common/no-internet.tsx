import { Image, ImageProps } from 'react-native'

import { MainContainer, Button, Text } from '@components'
import Colors from '@theme/colors'

import { Block } from '@components'
import { localImages } from '@assets/icons/images'
import { makeStyles } from '@theme'

export default function NoInternet({
  callbackRetry = () => {}
}: {
  callbackRetry: () => void
}) {
  const styles = useStyle()
  return (
    <MainContainer>
      <Block style={{ flex: 0.3 }} />
      <Image
        source={localImages().ic_offline}
        style={styles.noInternetImage as ImageProps}
      />
      <Text style={styles.text}>
        {`Bạn đang ngoại tuyến.\nVui lòng kiểm tra kết nối của bạn và thử lại.`}
      </Text>
      <Button style={styles.btnRetry} onPress={callbackRetry}>
        <Text style={styles.retryText}>Nhấn để thử lại</Text>
      </Button>
    </MainContainer>
  )
}

const useStyle = makeStyles((theme) => ({
  text: {
    fontSize: 14,
    marginVertical: 16,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    color: theme.colors.black,
    textAlign: 'center'
  },
  noInternetImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  retryText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    color: Colors.container,
    textAlign: 'left'
  },
  btnRetry: {
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 32
  }
}))
