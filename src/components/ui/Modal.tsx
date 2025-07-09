'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './button';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onConfirm?: () => void;
  children?: ReactNode; // 🔧 allows custom content inside modal
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  onConfirm,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-[#1B263B] p-6 rounded-lg border border-gray-700 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-neon-pink">{title}</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>

          {description && (
            <Dialog.Description className="text-sm text-gray-300">{description}</Dialog.Description>
          )}

          {children && <div className="space-y-4 mt-4">{children}</div>}

          {onConfirm && (
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                خیر
              </Button>
              <Button className="bg-neon-pink text-gray-900 hover:bg-pink-500" onClick={onConfirm}>
                بله
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
