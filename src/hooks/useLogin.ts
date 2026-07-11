'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function useLogin() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    console.log('🔍 محاولة تسجيل دخول بـ:', { email, password });
    console.log('🔍 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('📦 نتيجة signInWithPassword - data:', data);
    console.log('📦 نتيجة signInWithPassword - error:', signInError);

    if (signInError) {
      console.error('❌ تفاصيل الخطأ الكاملة:', {
        message: signInError.message,
        status: signInError.status,
        name: signInError.name,
      });

      setError('بيانات الدخول غير صحيحة');
      setLoading(false);
      return;
    }

    console.log('✅ تسجيل الدخول نجح، user id:', data.user.id);
    console.log('✅ user email:', data.user.email);
    console.log('✅ email confirmed at:', data.user.email_confirmed_at);

    const { data: admin, error: adminError } = await supabase
      .from('admin_managers')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle();

    console.log('📦 نتيجة جدول Users - admin:', admin);
    console.log('📦 نتيجة جدول Users - error:', adminError);

    if (!admin) {
      console.warn('⚠️ اليوزر مسجل دخول بس مش موجود بجدول admin_managers');
      await supabase.auth.signOut();
      setError('هذا الحساب غير مخوّل للدخول');
      setLoading(false);
      return;
    }

    console.log('🚀 توجيه للداشبورد...');
    router.push('/dashboard');
    router.refresh();
  }

  return { login, loading, error };
}