import { Component } from 'react'
import { StyleProp, TouchableHighlightProps, ViewStyle } from 'react-native'

import { BackgroundColorShorthandProps, ColorProps } from '@shopify/restyle'
import { Theme } from '@theme'
import { IconType } from '@assets/icons'

export interface IconComponentProps extends TouchableHighlightProps {
  type: IconType
  name: string
  size?: number
  color?: ColorProps<Theme>['color'] | any
  disabledStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  /**
   * Background color of button
   */
  bg?: BackgroundColorShorthandProps<Theme>['bg']

  /**
   * Button Component
   * Default:
   * - Android: TouchableNativeFeedback
   * - Other: TouchableOpacity
   */
  ButtonComponent?: typeof Component
}
