import Block from '../block'

type TRowProps = {
  start?: boolean
  center?: boolean
  end?: boolean
  between?: boolean
} & React.ComponentProps<typeof Block>

const Row = (props: TRowProps) => {
  const { start, center, end, between, children, ...rest } = props

  return (
    <Block
      {...(between && { justifyContent: 'space-between' })}
      {...(start && { alignItems: 'flex-start' })}
      {...(center && { alignItems: 'center' })}
      {...(end && { alignItems: 'flex-end' })}
      flexDirection='row'
      role='row'
      {...rest}>
      {children}
    </Block>
  )
}
export default Row
