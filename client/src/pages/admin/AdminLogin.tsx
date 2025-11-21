import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseconfig";
import { IoArrowBack } from "react-icons/io5";

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin/dashboard");
        } catch (error) {
            alert("Invalid Email or Password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative">

            {/* Accent Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-8 left-8 flex items-center gap-2 
                           bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl px-4 py-2 
                           text-sm font-medium text-gray-300
                           hover:border-[#C0C0C0]/40 hover:text-white hover:scale-105 
                           transition-all duration-200"
            >
                <IoArrowBack className="text-lg" />
                Back
            </button>

            <form
                onSubmit={handleLogin}
                className="bg-gray-800 p-10 rounded-lg shadow-lg w-2xl"
            >
                <h2 className="text-2xl font-bold text-center mb-10">Admin Login</h2>

                <input
                    type="email"
                    placeholder="Type your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 w-full p-5 rounded-lg mb-10 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 w-full p-5 rounded-lg mb-10 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 p-5 rounded-2xl mb-10 w-full 
                               cursor-pointer hover:bg-blue-500"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

        </div>
    );
};

export default AdminLogin;
