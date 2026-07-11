
'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error: string | null;
};

export default function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <section className="min-h-screen w-full bg-[#EEEEEE] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">         
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <Image
                src="/assets/logo.svg"
                alt="أرحب تمام"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h1 className="mt-4 text-2xl font-bold text-gray-900">
                تسجيل دخول
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-gray-800"
                >
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-[#C9DDDF] px-4 py-3 text-gray-900
                             placeholder:text-gray-500 outline-none
                             focus:ring-2 focus:ring-[#2E7C84] transition"
                  placeholder="admin@arhab.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-800"
                >
                  كلمة المرور
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-[#C9DDDF] px-4 py-3 text-gray-900
                             placeholder:text-gray-500 outline-none
                             focus:ring-2 focus:ring-[#2E7C84] transition"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center font-medium">
                  {error}
                </p>
              )}

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 rounded-lg bg-[#2E7C84] text-white font-bold
                             hover:bg-[#256169] disabled:opacity-60 disabled:cursor-not-allowed
                             transition-colors"
                >
                  {loading ? 'جاري الدخول...' : 'تسجيل دخول'}
                </button>
              </div>
            </form>
          </div>

      
          <div className="hidden lg:block relative bg-[#2E7C84]">
            <Image
              src="/assets/img_login.png"
              alt="Image Login"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}