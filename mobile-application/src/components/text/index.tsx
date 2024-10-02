import { forwardRef } from 'react'

import { Theme, createText } from '@theme'
import { NativeText } from 'react-native/Libraries/Text/TextNativeComponent'

const ReText = createText<Theme>(NativeText)

export default forwardRef<NativeText, React.ComponentProps<typeof ReText>>(
  function Text(props, ref) {
    return (
      <ReText {...props} ref={ref}>
        {props.children}
      </ReText>
    )
  }
)
