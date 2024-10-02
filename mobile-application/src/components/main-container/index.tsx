import { useIsFocused } from '@react-navigation/native'
import theme from '@theme'
import { StatusBar } from 'expo-status-bar'
import {
  NativeSafeAreaViewProps,
  SafeAreaView
} from 'react-native-safe-area-context'

const MainContainer = ({
  children,
  style,
  edges,
  ...rest
}: NativeSafeAreaViewProps) => {
  const isFocused = useIsFocused()
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: theme.colors.container }, style]}
      edges={edges}
      {...rest}>
      {isFocused ? (
        <StatusBar
          style='dark'
          backgroundColor={theme.colors.container}
          translucent={true}
        />
      ) : (
        <StatusBar style='light' backgroundColor={theme.colors.container} />
      )}
      {children}
    </SafeAreaView>
  )
}

export default MainContainer
