import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Smartphone, AlertCircle, Shield } from 'lucide-react';

export default function Login() {
  const [showPin, setShowPin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    pin: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Validate mobile number (Indian format)
    const mobileRegex = /^[6-9]\d{9}$/;
    const mobileDigits = formData.mobile.replace(/\D/g, '');
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (mobileDigits.length !== 10 || !mobileRegex.test(mobileDigits)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    
    // Validate PIN (exactly 6 digits)
    const pinRegex = /^\d{6}$/;
    if (!formData.pin.trim()) {
      newErrors.pin = 'Security PIN is required';
    } else if (!pinRegex.test(formData.pin)) {
      newErrors.pin = 'PIN must be exactly 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'mobile') {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      
      // Auto-add +91 prefix
      if (digits.length <= 10) {
        // Show as plain digits without formatting
        formattedValue = digits;
      } else {
        // If user types more than 10 digits, trim to 10
        formattedValue = digits.slice(0, 10);
      }
    }
    
    // For PIN, only allow digits and limit to 6
    if (name === 'pin') {
      formattedValue = value.replace(/\D/g, '').slice(0, 6);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  const isFormValid = formData.mobile.length === 10 && formData.pin.length === 6;

  // Format for display (add +91 when showing)
  const displayMobile = formData.mobile ? `+91 ${formData.mobile}` : '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 font-sans">
      <div className="w-full max-w-md">
        
        {/* Logo Section - Same as Dashboard */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-blue-900 to-blue-500 flex items-center justify-center shadow-lg mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">SecureSight</h1>
            <p className="text-xs text-gray-500 mt-1 tracking-widest">ENTERPRISE SECURITY PLATFORM</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Authority Portal</h2>
            <p className="text-sm text-gray-600 mt-1">Sign in to access the Control Center</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Mobile Number Field */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-gray-500" />
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  +91
                </div>
                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="98765 43210"
                  maxLength="10"
                  className={`pl-10 w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.mobile 
                      ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500/30 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.mobile && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.mobile}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                {formData.mobile.length}/10 digits
              </div>
            </div>

            {/* PIN Field */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  6-Digit Security PIN
                </label>
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  FORGOT PIN?
                </button>
              </div>
              <div className="relative">
                <input
                  name="pin"
                  type={showPin ? "text" : "password"}
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="••••••"
                  maxLength="6"
                  className={`tracking-[0.5em] text-center text-lg w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.pin 
                      ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500/30 focus:border-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.pin && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.pin}
                </div>
              )}
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">{formData.pin.length}/6 digits</p>
                <p className="text-xs text-gray-500">Must be exactly 6 digits</p>
              </div>
            </div>

            {/* Checkbox */}
            <div className="mb-7">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Keep me authorized for this session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-3.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading || !isFormValid
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authorizing...</span>
                </>
              ) : (
                <>
                  <span>Authorize & Sign In</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            {/* Form Status */}
            {!isFormValid && !isLoading && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  {formData.mobile.length < 10 ? 'Enter 10-digit mobile number' : 
                   formData.pin.length < 6 ? 'Enter 6-digit security PIN' : 
                   'Fill in both fields to enable authorization'}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="inline-flex gap-6 text-xs text-gray-400">
            <span>Privacy Policy</span>
            <span>Security Protocols</span>
            <span>Support</span>
          </div>
          <p className="mt-3 text-[10px] text-gray-400 tracking-wider">
            SECURESIGHT ENTERPRISE v4.2.0
          </p>
        </div>
      </div>
    </div>
  );
}