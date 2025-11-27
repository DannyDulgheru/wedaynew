"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Validate token on mount
    const validateToken = async () => {
      try {
        // TODO: Implement API call to validate token
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        // Simulate token validation
        const isValid = !!(params.token && params.token.length > 10);
        setTokenValid(isValid);
        
        if (!isValid) {
          setError("Linkul de resetare este invalid sau a expirat.");
        }
      } catch (err) {
        setTokenValid(false);
        setError("A apărut o eroare la validarea linkului.");
      }
    };

    validateToken();
  }, [params.token]);

  const validatePassword = (pwd: string): string[] => {
    const errors: string[] = [];
    if (pwd.length < 8) errors.push("Minim 8 caractere");
    if (!/[A-Z]/.test(pwd)) errors.push("O literă mare");
    if (!/[a-z]/.test(pwd)) errors.push("O literă mică");
    if (!/[0-9]/.test(pwd)) errors.push("O cifră");
    return errors;
  };

  const passwordErrors = password ? validatePassword(password) : [];
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwordErrors.length > 0) {
      setError("Parola nu îndeplinește cerințele de securitate.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc.");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      setError("A apărut o eroare. Vă rugăm încercați din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Verificare link...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Link Invalid
            </h1>
            
            <p className="text-gray-600 mb-6">
              {error}
            </p>

            <div className="space-y-3">
              <Link
                href="/auth/forgot-password"
                className="block w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-purple-700 transition-all"
              >
                Solicită Link Nou
              </Link>
              
              <Link
                href="/auth/login"
                className="block w-full px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all"
              >
                Înapoi la Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Parolă Resetată!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Parola dumneavoastră a fost resetată cu succes. Veți fi redirecționat către pagina de login...
            </p>

            <Link
              href="/auth/login"
              className="inline-block px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-purple-700 transition-all"
            >
              Mergi la Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Parolă Nouă
            </h1>
            <p className="text-gray-600">
              Introduceți noua parolă pentru contul dumneavoastră
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Parolă Nouă
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduceți parola nouă"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Cerințe parolă:</p>
                  <div className="space-y-1">
                    {[
                      { check: password.length >= 8, text: "Minim 8 caractere" },
                      { check: /[A-Z]/.test(password), text: "O literă mare" },
                      { check: /[a-z]/.test(password), text: "O literă mică" },
                      { check: /[0-9]/.test(password), text: "O cifră" },
                    ].map((req, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        {req.check ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-300" />
                        )}
                        <span className={`text-xs ${req.check ? "text-green-600" : "text-gray-500"}`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmă Parola
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmați parola nouă"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600">Parolele se potrivesc</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-xs text-red-600">Parolele nu se potrivesc</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || passwordErrors.length > 0 || !passwordsMatch}
              className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Se resetează...</span>
                </>
              ) : (
                <span>Resetează Parola</span>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
            >
              Înapoi la Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
