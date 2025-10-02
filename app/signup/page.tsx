'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/app/components/ui/button';

export default function SignUpPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match' : '비밀번호가 일치하지 않습니다');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters' : '비밀번호는 최소 6자 이상이어야 합니다');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Show success message
      setSuccess(true);
      setLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>{language === 'en' ? 'Back to Home' : '홈으로 돌아가기'}</span>
        </Link>

        {/* Sign Up Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {language === 'en' ? 'Create Account' : '계정 만들기'}
          </h1>
          <p className="text-white/60 mb-8">
            {language === 'en' ? 'Join GRIGO Entertainment' : 'GRIGO Entertainment에 가입하세요'}
          </p>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
              {language === 'en'
                ? 'Account created successfully! Please check your email to verify your account. Redirecting to login...'
                : '계정이 성공적으로 생성되었습니다! 이메일을 확인하여 계정을 인증하세요. 로그인 페이지로 이동 중...'}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                {language === 'en' ? 'Full Name' : '이름'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'en' ? 'John Doe' : '홍길동'}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                {language === 'en' ? 'Email' : '이메일'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'en' ? 'your@email.com' : '이메일을 입력하세요'}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                {language === 'en' ? 'Password' : '비밀번호'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'en' ? 'At least 6 characters' : '최소 6자 이상'}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                {language === 'en' ? 'Confirm Password' : '비밀번호 확인'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={language === 'en' ? 'Re-enter your password' : '비밀번호를 다시 입력하세요'}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-white text-zinc-950 hover:bg-white/90 font-semibold py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                language === 'en' ? 'Create Account' : '계정 만들기'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-sm text-white/40">{language === 'en' ? 'or' : '또는'}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Sign Up */}
          <Button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading || success}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {language === 'en' ? 'Continue with Google' : 'Google로 계속하기'}
          </Button>

          {/* Login Link */}
          <p className="mt-6 text-center text-white/60">
            {language === 'en' ? 'Already have an account? ' : '이미 계정이 있으신가요? '}
            <Link href="/login" className="text-white hover:underline font-semibold">
              {language === 'en' ? 'Sign In' : '로그인'}
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
