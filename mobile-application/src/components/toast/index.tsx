import * as Burnt from "burnt";
import type {
  ToastOptions as BurntToastOptions,
  AlertOptions as BurntAlertOptions,
} from "burnt/build/types";

import { CustomOption, ValueOrFunction } from "./type";

type ToastOptions = Omit<BurntToastOptions, "title" | "preset" | "duration"> & {
  duration?: number;
};

type AlertOptions = Omit<BurntAlertOptions, "title"> & {};

function getPreset<T = string>(title: string, preset: T) {
  return (title?.length ?? 0) > 28 ? "none" : preset;
}

const toast = (title: string, options?: ToastOptions) => {
  if (typeof options?.duration === "number") {
    options.duration = options.duration / 1000;
  }
  return Burnt.toast({
    title: title ?? "unknown message",
    preset: "none",
    ...options,
  });
};

toast.error = (title: string, options?: ToastOptions) => {
  if (typeof options?.duration === "number") {
    options.duration = options.duration / 1000;
  }
  return Burnt.toast({
    title: title ?? "unknown error",
    preset: "none",
    haptic: "error",
    from: "bottom",
    ...options,
  });
};
toast.success = (title: string, options?: ToastOptions) => {
  if (typeof options?.duration === "number") {
    options.duration = options.duration / 1000;
  }
  return Burnt.toast({
    title: title ?? "unknown success",
    preset: "none",
    haptic: "success",
    from: "bottom",
    ...options,
  });
};

toast.custom = (title: string, options: CustomOption) => {
  if (typeof options?.duration === "number") {
    options.duration = options.duration / 1000;
  }
  return Burnt.toast({
    title: title ?? "unknown message",
    preset: "custom",
    icon: {
      ios: options.ios,
    },
    from: "bottom",
    duration: options.duration,
  });
};

toast.dismiss = () => false;

toast.promise = function <T>(
  promise: Promise<T>,
  msgs: {
    loading: string;
    success: ValueOrFunction<string, T>;
    error: ValueOrFunction<string, any>;
  },
  options?: AlertOptions
) {
  if (typeof options?.duration === "number") {
    options.duration = options.duration / 1000;
  }
  Burnt.alert({
    title: msgs.loading,
    preset: "spinner",
    from: "bottom",
    ...(options as any),
  });
  promise
    .then((p) => {
      Burnt.dismissAllAlerts();
      Burnt.alert({
        title: msgs.success,
        preset: "done",
        ...(options as any),
      });
      return p;
    })
    .catch(() => {
      Burnt.dismissAllAlerts();
      Burnt.alert({
        title: msgs.error,
        preset: "error",
        ...(options as any),
      });
    });

  return promise;
};

export default toast;
