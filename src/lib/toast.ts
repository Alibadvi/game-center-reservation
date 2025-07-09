// src/lib/toast.ts
import { toast } from 'sonner';

export const notifySuccess = (msg: string) => toast.success(msg);
export const notifyError = (msg: string) => toast.error(msg);
export const notifyInfo = (msg: string) => toast(msg);
