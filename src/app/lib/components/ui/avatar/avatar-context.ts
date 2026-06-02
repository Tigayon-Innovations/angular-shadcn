import { InjectionToken, WritableSignal } from '@angular/core';

export type AvatarImageStatus = 'idle' | 'loaded' | 'error';

export interface AvatarContext {
  imageStatus: WritableSignal<AvatarImageStatus>;
}

export const AVATAR_CONTEXT = new InjectionToken<AvatarContext>('AvatarContext');
