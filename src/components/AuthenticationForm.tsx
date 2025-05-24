import { useState } from "react";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthenticationForm = () => {
  const [type, setType] = useState<"signin" | "signup">("signin");

  return (
    <div className="w-full md:min-w-[380px] max-w-md mx-auto mt-10 p-6 bg-white/20 backdrop-blur-md shadow-xl rounded-xl border border-white/20">
      <h2 className="text-xl font-semibold mb-6 text-center text-white">
        Authentication
      </h2>

      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          className={`w-full py-2 rounded transition text-white border ${
            type === "signin"
              ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
              : "bg-transparent border-gray-400 hover:border-white/80"
          }`}
          onClick={() => setType("signin")}
        >
          Login
        </button>
        <button
          className={`w-full py-2 rounded transition text-white border ${
            type === "signup"
              ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
              : "bg-transparent border-gray-400 hover:border-white/80"
          }`}
          onClick={() => setType("signup")}
        >
          Register
        </button>
      </div>

      {type === "signin" ? <SignInForm /> : <SignUpForm />}
    </div>
  );
};

export default AuthenticationForm;
