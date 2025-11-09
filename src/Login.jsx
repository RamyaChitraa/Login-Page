import { useState } from "react";
import img from "./assets/images/background_banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

function Login() {
  const [eusername, setEusername] = useState("");
  const [epassword, setEpassword] = useState("");
  const [ruser, setRuser] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pass) => pass.length >= 6 && /\d/.test(pass);

  function handleUIput(evt) {
    setEusername(evt.target.value);
    setError("");
    setRuser(true);
  }

  function handlePIput(evt) {
    setEpassword(evt.target.value);
    setError("");
  }

  async function checkUser() {
    if (!eusername || !epassword) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(eusername)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(epassword)) {
      setError("Password must be at least 6 characters and include a number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const storedUsers = JSON.parse(localStorage.getItem("netflixUsers") || "[]");
      const user = storedUsers.find(
        (u) => u.username === eusername && u.password === epassword
      );

      if (user) {
        console.log("Login successful");
        navigate("/Landing", { state: { user: eusername } });
      } else {
        setError("⚠️ Invalid username or password! Please signup first.");
        setRuser(false);
      }
    } catch {
      setError("⚠️ An error occurred during login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-black">
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={img}
        alt="background"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Header - Netflix Logo */}
      <header className="relative z-10 px-8 py-6">
        <h1 className="text-[#E50914] text-5xl font-extrabold tracking-tight">
          NETFLIX
        </h1>
      </header>

      {/* Sign In Box */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="bg-black/75 w-full max-w-md rounded-md px-12 py-14 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          {!ruser && (
            <p className="text-red-600 font-semibold mb-4">
              Please Signup before you Login!
            </p>
          )}

          <input
            value={eusername}
            onChange={handleUIput}
            type="email"
            placeholder="Email or mobile number"
            className={`w-full p-3 bg-[#333] rounded text-white placeholder-gray-400 mb-4 border ${
              error ? "border-red-500" : "border-transparent"
            } focus:outline-none focus:border-white`}
          />

          <PasswordInput
            value={epassword}
            onChange={handlePIput}
            placeholder="Password"
            error={!!error}
          />

          {error && (
            <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
          )}

          <button
            onClick={checkUser}
            disabled={loading}
            className="bg-[#E50914] w-full py-3 mt-6 rounded font-semibold hover:bg-[#f6121d] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-[#8c8c8c] text-center my-4">OR</p>

          <button className="bg-[#333] w-full py-3 rounded hover:bg-[#444]">
            Use a sign-in code
          </button>

          <p className="text-white text-sm mt-4 hover:underline cursor-pointer text-center">
            Forgot password?
          </p>

          <div className="flex items-center gap-2 mt-5">
            <input type="checkbox" className="w-4 h-4 accent-[#E50914]" />
            <span className="text-[#b3b3b3] text-sm">Remember me</span>
          </div>

          <p className="text-[#737373] text-sm mt-6">
            New to Netflix?{" "}
            <Link to="/Signup" className="text-white hover:underline">
              Sign up now.
            </Link>
          </p>

          <p className="text-[#8c8c8c] text-xs mt-5">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              Learn more.
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 text-[#757575] text-sm py-10 px-10 mt-auto">
        <p className="mb-5">Questions? Call 000-800-919-1743 (Toll-Free)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 underline">
          <p>FAQ</p>
          <p>Help Centre</p>
          <p>Terms of Use</p>
          <p>Privacy</p>
          <p>Cookie Preferences</p>
          <p>Corporate Information</p>
        </div>
        <div className="mt-6">
          <select className="bg-black text-white border border-gray-500 px-2 py-1 rounded">
            <option>English</option>
            <option>தமிழ்</option>
            <option>हिन्दी</option>
          </select>
        </div>
      </footer>
    </div>
  );
}

export default Login;
