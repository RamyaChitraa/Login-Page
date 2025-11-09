import { useLocation } from "react-router-dom";

function Landing() {
  const data = useLocation();

  // Function to prevent default link behavior
  const handleLinkClick = (e) => {
    e.preventDefault();
    alert("Please contact support to recover your email or phone number.");
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/background.jpg"
          alt="Netflix Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Top Navbar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-6 z-20">
        {/* Netflix Text Logo */}
        <h1 className="text-5xl font-extrabold text-[#E50914] tracking-wide">
          NETFLIX
        </h1>

        {/* Sign In Button */}
        <button className="bg-[#E50914] text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition">
          Sign In
        </button>
      </div>

      {/* Main Content */}
      <div className="relative flex justify-center items-center min-h-screen z-10 px-4">
        <div className="bg-white text-black w-full max-w-md rounded-md shadow-lg p-10 bg-opacity-95">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-3 text-center">
            Update password, email or phone
          </h1>

          {/* Greeting */}
          <p className="text-gray-700 mb-6 text-sm text-center">
            Hello{" "}
            <span className="font-semibold">
              {data.state?.user || "User"}
            </span>
            , please confirm how you’d like to reset your account details.
          </p>

          {/* Radio Options */}
          <div className="flex flex-col items-start space-y-2 mb-6">
            <label className="flex items-center space-x-2">
              <input type="radio" name="method" defaultChecked />
              <span>Email</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="method" />
              <span>Text Message (SMS)</span>
            </label>
          </div>

          {/* Info Text */}
          <p className="text-gray-700 text-sm mb-4">
            We will send you an email with instructions on how to reset your
            password.
          </p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* Button */}
          <button className="w-full bg-[#E50914] text-white py-3 rounded-md font-semibold hover:bg-red-700 transition">
            Email Me
          </button>

          {/* Forgot Link */}
          <a
            href="/"
            onClick={handleLinkClick}
            className="block text-center text-blue-700 text-sm mt-4 hover:underline"
          >
            I can’t remember my email address or phone number.
          </a>

          {/* Captcha Text */}
          <p className="text-gray-500 text-xs mt-8 text-center">
            This page is protected by Google reCAPTCHA to ensure you’re not a
            bot.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full text-center text-gray-400 text-xs py-4">
        Questions? Call 000-800-919-1743 (Toll-Free)
      </div>
    </div>
  );
}

export default Landing;
