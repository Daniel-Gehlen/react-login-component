import React, { useState } from 'react';

const LoginPreview = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 20;
    if (pass.match(/[A-Z]/)) strength += 20;
    if (pass.match(/[a-z]/)) strength += 20;
    if (pass.match(/[0-9]/)) strength += 20;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 20;

    setPasswordStrength(strength);

    if (strength < 40) {
      setPasswordFeedback('Senha fraca');
    } else if (strength < 80) {
      setPasswordFeedback('Senha média');
    } else {
      setPasswordFeedback('Senha forte');
    }
  };

  const generateStrongPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-medium text-center text-gray-800 mb-6">Login</h2>
        
        <form className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={hidePassword ? 'password' : 'text'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                placeholder="Digite sua senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {hidePassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            
            <div className="mt-2">
              <div className="text-sm text-gray-600">Força da senha: {passwordFeedback}</div>
              <div className="h-1 w-full bg-gray-200 rounded-full mt-1">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    passwordStrength < 40
                      ? 'bg-red-500'
                      : passwordStrength < 80
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={generateStrongPassword}
            className="w-full px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 transition-colors"
          >
            Gerar senha forte
          </button>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPreview;
