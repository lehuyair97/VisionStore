import { forwardRef } from "react";

import { Theme, createBox } from "@theme";
import NativeView from "react-native/Libraries/Components/View/ViewNativeComponent";

export const ReView = createBox<Theme>(NativeView);

export default forwardRef<NativeView, React.ComponentProps<typeof ReView>>(
  function Block(props, ref) {
    return (
      <ReView {...props} ref={ref}>
        {props.children}
      </ReView>
    );
  }
);
