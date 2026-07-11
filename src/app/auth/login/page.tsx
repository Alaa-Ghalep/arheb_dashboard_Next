
'use client';

import LoginForm from '@/components/auth/login/LoginForm';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const { login, loading, error } = useLogin();

  return <LoginForm onSubmit={login} loading={loading} error={error} />;
}