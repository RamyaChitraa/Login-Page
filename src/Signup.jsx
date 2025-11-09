import img from "./assets/images/netflix.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function Signup(props) {
    const navigate = useNavigate()

    const [eusername, setEusername] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function handleUIput(evt) {
        setEusername(evt.target.value)
        setError("")
    }

    async function addUser() {
        if (!eusername) {
            setError("⚠️ Email is required!")
            return
        }

        if (!validateEmail(eusername)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true)
        setError("")

        try {
            // Check if user exists in local storage
            const storedUsers = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
            const existingUser = storedUsers.find(u => u.username === eusername);

            if (existingUser) {
                setError("⚠️ User already exists! Please login instead.");
            } else {
                // Store user temporarily for password confirmation
                sessionStorage.setItem('tempUser', eusername);
                navigate("/PasswordConfirmation", { state: { username: eusername } });
            }
        } catch (error) {
            setError("⚠️ An error occurred during signup.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <img className="w-screen h-screen object-cover absolute inset-0" src={img}></img>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative flex-1 flex flex-col">
                <header className="relative">
                    <div className="relative mx-4 md:ml-14 flex justify-between items-center py-4">
                        <svg className="relative w-16 h-16 md:w-24 md:h-24" xmlns=" http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                            <path fill="#F44336" d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"></path>
                        </svg>

                        <button><Link to={"/"} className="mr-4 md:mr-20 bg-[#E50914] text-sm md:text-base font-semibold rounded-md px-3 md:px-5 py-2 text-white">Sign In</Link></button>
                    </div>
                </header>

                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="mb-8 md:mb-36 text-center max-w-4xl">
                        <p className="font-extrabold text-3xl md:text-6xl font-sans text-white p-4 leading-tight">
                            Unlimited movies, TV<br />
                            <span className="block md:ml-16">shows, and more</span>
                        </p>
                        <p className="text-white text-lg md:text-xl font-semibold mt-4">Starts at USD 2.99. Cancel anytime.</p>
                        <p className="mt-6 md:mt-10 text-white text-sm md:text-base font-semibold px-4">Ready to watch? Enter your email to create or restart your membership.</p>
                        {error && <p className="text-red-600 font-bold mt-2 px-4">{error}</p>}
                        <div className="flex flex-col md:flex-row gap-2 mt-6 px-4 max-w-2xl mx-auto">
                            <input
                                onChange={handleUIput}
                                className="p-4 rounded-md flex-1 text-base bg-black/50 border-green-900 border-2 focus:border-white focus:border-2 text-white"
                                placeholder="Email address"
                            />
                            <button
                                onClick={addUser}
                                disabled={loading}
                                className="bg-[#E50914] px-6 md:px-12 py-4 rounded-lg text-white border-solid text-lg md:text-2xl font-semibold whitespace-nowrap disabled:opacity-50"
                            >
                                {loading ? "Please wait..." : "Get Started"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
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
    )
}

export default Signup;
