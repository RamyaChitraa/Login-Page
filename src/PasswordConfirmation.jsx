import { useState } from "react";
import img from "./assets/images/netflix.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PasswordInput from "./PasswordInput";

function PasswordConfirmation(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // username passed from Signup page
  const eusername = location.state?.username;

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass) => {
    return pass.length >= 6 && /\d/.test(pass);
  };

  function handlePassword(evt) {
    setPassword(evt.target.value);
    setError("");
  }

  function handleConfirmPassword(evt) {
    setCpassword(evt.target.value);
    setError("");
  }

  async function handleSubmit() {
    if (!password || !cpassword) {
      setError("⚠️ Both fields are required!");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters and include a number.");
      return;
    }

    if (password !== cpassword) {
      setError("⚠️ Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save user to local storage
      const storedUsers = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
      const newUser = {
        username: eusername,
        password: password,
        createdAt: new Date().toISOString()
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('netflixUsers', JSON.stringify(storedUsers));
      
      // Clear temporary session data
      sessionStorage.removeItem('tempUser');
      
      // Navigate to Login
      navigate("/");
    } catch (error) {
      setError("⚠️ An error occurred while creating your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <img className="w-screen h-screen object-cover absolute inset-0" src={img} alt="background" />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative flex-1 flex flex-col">
        <header className="relative">
          <div className="relative mx-4 md:ml-14 py-4">
            <svg className="relative w-16 h-16 md:w-24 md:h-24" xmlns=" http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
              <path fill="#F44336" d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"></path>
            </svg>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="relative bg-black/60 w-full max-w-md mx-auto rounded-md shadow-lg text-center p-6 md:p-8">
          <h1 className="font-bold text-2xl md:text-4xl font-sans text-white mb-4">
            Create Password
          </h1>
          <p className="text-white/70 text-sm md:text-base mb-6">
            Just one more step to finish creating your account
          </p>

          <div className="space-y-4">
            <PasswordInput
              value={password}
              onChange={handlePassword}
              placeholder="Password"
              error={!!error}
            />
            
            <PasswordInput
              value={cpassword}
              onChange={handleConfirmPassword}
              placeholder="Confirm Password"
              error={!!error}
            />

            {error && <p className="text-red-600 font-bold">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#E50914] w-full py-3 rounded-lg text-white hover:bg-red-700 text-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Finish Sign Up"}
            </button>

            <p className="mt-6 text-white text-sm">
              Already have an account?{" "}
              <Link to={"/"} className="text-red-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#161616]">
        <div className="p-6 md:p-20">
          <p className="text-[#BABABA] py-3">Questions? Contact us.</p>
          <div className="grid grid-cols-2 md:flex text-[#BABABA] justify-between underline gap-4 text-sm md:text-base">
            <p>FAQ</p>
            <p>Help Center</p>
            <p>Terms of Use</p>
            <p>Privacy</p>
          </div>

          <div className="grid grid-cols-1 md:flex text-[#BABABA] mt-5 md:gap-64 underline gap-4 text-sm md:text-base">
            <p>Cookie Preference</p>
            <p>Corporate Information</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordConfirmation;
