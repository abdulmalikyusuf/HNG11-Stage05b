"use client";

import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "./icons";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon = "link",
        ...props
      }) {
        const Icon = Icons[icon];
        return (
          <Toast key={id} {...props}>
            {<Icon className="size-5" />}
            {description && <ToastDescription>{description}</ToastDescription>}
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
