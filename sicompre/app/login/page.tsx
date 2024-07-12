'use client';
import AcmeLogo from 'ui/acme-logo';
import LoginForm from 'ui/login-form';
import { Metadata } from 'next';
import Form from '@ui/register-form';
import { useState } from 'react';
import './style.css';

export default function LoginPage() {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  return (
    <div className="mt-5 flex h-screen flex-col items-center">
      <div className="flex w-10/12 items-center justify-center rounded-lg bg-blue-600 bg-gradient-to-t sm:w-[800px] ">
        <AcmeLogo />
      </div>

      <div
        className={`container items-center justify-center ${
          rightPanelActive ? 'right-panel-active' : ''
        }`}
      >
        <div className="form-container sign-in-container">
          <LoginForm />
        </div>

        <div className="form-container sign-up-container">
          <Form />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-sm sm:text-base">
                ¿Ya te encuentras registrado?
              </h1>
              <button className="ghost text-xs" onClick={handleSignInClick}>
                Inicia Sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Registrate</h1>
              <p>Si eres proveedor te puedes registrar aquí</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
