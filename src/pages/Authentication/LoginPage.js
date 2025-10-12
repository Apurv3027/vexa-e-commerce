import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sendOtp, verifyOtp } = useAuth();

  const [loginMethod, setLoginMethod] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleGoogleSignIn = () => {
    console.log('Google sign-in initiated');
    navigate('/', { replace: true });
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
            <button
              className="w-full py-3 bg-white text-gray-700 border border-gray-200 rounded-lg text-base font-semibold cursor-pointer flex items-center justify-center gap-3 transition-all hover:bg-gray-50 hover:shadow-sm"
              onClick={handleGoogleSignIn}
            >
              <span className="google-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
              </span>
              {t("auth.signInWithGoogle")}
            </button>
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