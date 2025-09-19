import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [loginMethod, setLoginMethod] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log('Google sign-in initiated');
    navigate('/', { replace: true });
  };

  const handleSendOtp = () => {
    if (mobileNumber.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    console.log('Sending OTP to:', mobileNumber);
    setOtpSent(true);
  };

  const handleLogin = () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    console.log('Logging in with OTP:', otp);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-gray-800 text-3xl font-bold mb-3">Welcome Back</h2>
          <p className="text-gray-600 text-base">Sign in to access your account</p>
        </div>

        <div className="flex bg-gray-50 rounded-lg p-1 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-md font-semibold cursor-pointer transition-all duration-300 ${loginMethod === 'mobile'
              ? 'bg-white shadow-sm'
              : 'bg-transparent'
              }`}
            onClick={() => setLoginMethod('mobile')}
          >
            Mobile Sign In
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-md font-semibold cursor-pointer transition-all duration-300 ${loginMethod === 'google'
              ? 'bg-white shadow-sm'
              : 'bg-transparent'
              }`}
            onClick={() => setLoginMethod('google')}
          >
            Google Sign In
          </button>
        </div>

        {loginMethod === 'mobile' ? (
          <div className="mobile-login">
            <div className="mb-5">
              <label htmlFor="mobile" className="block mb-2 font-semibold text-gray-800">
                Mobile Number
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <span className="px-4 bg-gray-50 h-12 flex items-center justify-center font-semibold border-r border-gray-200">
                  +91
                </span>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength="10"
                  className="flex-1 p-3 text-base outline-none"
                />
              </div>
            </div>

            {otpSent && (
              <div className="mb-5">
                <label htmlFor="otp" className="block mb-2 font-semibold text-gray-800">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength="6"
                  className="w-full p-3 border border-gray-200 rounded-lg text-base transition-colors focus:border-blue-400 focus:shadow-sm focus:shadow-blue-200 outline-none"
                />
                <p className="text-sm text-gray-600 mt-2">
                  We've sent a verification code to your mobile
                </p>
              </div>
            )}

            <button
              className="w-full py-3 bg-gray-700 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors hover:bg-gray-800"
              onClick={otpSent ? handleLogin : handleSendOtp}
            >
              {otpSent ? 'Sign In' : 'Send Verification Code'}
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
              Sign in with Google
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              You'll be redirected to Google to sign in
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;