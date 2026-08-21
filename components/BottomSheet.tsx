"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-zinc-950 px-6 pb-8 pt-4 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[80vh] sm:w-full sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border sm:p-6"
                initial={{ y: "100%", opacity: 0.6 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0.6 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 sm:hidden" />
                <div className="mb-1 flex items-start justify-between gap-4">
                  <Dialog.Title className="text-xl font-bold text-white">
                    {title}
                  </Dialog.Title>
                  <Dialog.Close className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Dialog.Close>
                </div>
                {description ? (
                  <Dialog.Description className="mb-4 text-sm text-white/60">
                    {description}
                  </Dialog.Description>
                ) : null}
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
