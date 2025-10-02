import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Get user display name
 */
export function getUserDisplayName(user: User): string {
  return user.user_metadata?.name || user.email?.split('@')[0] || 'User';
}

/**
 * Auth error messages with translations
 */
export const authErrors = {
  en: {
    'Invalid login credentials': 'Invalid email or password',
    'Email not confirmed': 'Please verify your email address',
    'User already registered': 'An account with this email already exists',
  },
  ko: {
    'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다',
    'Email not confirmed': '이메일 주소를 인증해주세요',
    'User already registered': '이미 등록된 이메일입니다',
  },
};

/**
 * Get localized auth error message
 */
export function getAuthErrorMessage(error: string, language: 'en' | 'ko'): string {
  const messages = authErrors[language];
  return messages[error as keyof typeof messages] || error;
}
