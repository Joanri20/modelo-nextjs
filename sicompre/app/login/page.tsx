import AcmeLogo from 'ui/acme-logo';
import LoginForm from 'ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="sd:max-w-[400px] relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-blue-700 p-3 md:h-36">
          <div className="flex w-32 items-center justify-center text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
