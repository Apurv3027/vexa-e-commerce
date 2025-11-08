import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, googleSignIn } = useAuth();

  const [loginMethod, setLoginMethod] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const storeTokenWithExpiry = (token) => {
    const now = new Date();
    const expiryTime = now.getTime() + (7 * 24 * 60 * 60 * 1000);

    const sessionData = {
      token: token,
      expiry: expiryTime
    };

    localStorage.setItem('userSession', JSON.stringify(sessionData));
    localStorage.setItem('token', token);
  };

  const handleGoogleSignIn = async (credentialResponse) => {
    const result = await googleSignIn(credentialResponse);

    if (result.success) {
      if (result.token) {
        storeTokenWithExpiry(result.token);
      }

      navigate('/', { replace: true });
    }
  };

  const handleSendOtp = async () => {
    if (mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setSendingOtp(true);
    const result = await sendOtp(mobileNumber);
    setSendingOtp(false);

    if (result.success) {
      setOtpSent(true);
    }
  };

  const handleLogin = async () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setVerifyingOtp(true);
    const result = await verifyOtp(mobileNumber, otp);
    setVerifyingOtp(false);

    if (result.success) {
      if (result.token) {
        storeTokenWithExpiry(result.token);
      }

      navigate('/', { replace: true });
    }
  };

  const handleResendOtp = async () => {
    setSendingOtp(true);
    await sendOtp(mobileNumber);
    setSendingOtp(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-gray-800 text-3xl font-bold mb-3">{t("auth.welcomeBack")}</h2>
          <p className="text-gray-600 text-base">{t("auth.signInToAccount")}</p>
        </div>

        <div className="flex bg-gray-50 rounded-lg p-1 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-md font-semibold cursor-pointer transition-all duration-300 ${loginMethod === 'mobile'
              ? 'bg-white shadow-sm'
              : 'bg-transparent'
              }`}
            onClick={() => setLoginMethod('mobile')}
          >
            {t("auth.mobileSignIn")}
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-md font-semibold cursor-pointer transition-all duration-300 ${loginMethod === 'google'
              ? 'bg-white shadow-sm'
              : 'bg-transparent'
              }`}
            onClick={() => setLoginMethod('google')}
          >
            {t("auth.googleSignIn")}
          </button>
        </div>

        {loginMethod === 'mobile' ? (
          <div className="mobile-login">
            <div className="mb-5">
              <label htmlFor="mobile" className="block mb-2 font-semibold text-gray-800">
                {t("auth.mobileNumber")}
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <span className="px-4 bg-gray-50 h-12 flex items-center justify-center font-semibold border-r border-gray-200">
                  +91
                </span>
                <input
                  type="tel"
                  id="mobile"
                  placeholder={t("auth.enterMobileNumber")}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength="10"
                  disabled={otpSent}
                  className="flex-1 p-3 text-base outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {otpSent && (
              <div className="mb-5">
                <label htmlFor="otp" className="block mb-2 font-semibold text-gray-800">
                  {t("auth.verificationCode")}
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder={t("auth.enter6DigitCode")}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength="6"
                  className="w-full p-3 border border-gray-200 rounded-lg text-base transition-colors focus:border-blue-400 focus:shadow-sm focus:shadow-blue-200 outline-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">
                    {t("auth.sentVerification")}
                  </p>
                  <button
                    onClick={handleResendOtp}
                    disabled={sendingOtp}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingOtp ? 'Resending...' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}

            <button
              className="w-full py-3 bg-gray-700 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={otpSent ? handleLogin : handleSendOtp}
              disabled={
                otpSent
                  ? verifyingOtp || otp.length !== 6
                  : sendingOtp || mobileNumber.length !== 10
              }
            >
              {otpSent ? (
                verifyingOtp ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  `${t("auth.signIn")}`
                )
              ) : (
                sendingOtp ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  `${t("auth.sendVerificationCode")}`
                )
              )}
            </button>
          </div>
        ) : (
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => {
                console.log("Google login failed");
              }}
            />
            <p className="text-center text-sm text-gray-600 mt-4">
              {t("auth.redirectGoogle")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;