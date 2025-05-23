import { useState } from "react";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthenticationForm = () => {
  const [type, setType] = useState<"signin" | "signup">("signin");

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white/20 shadow-lg  rounded-xl md:min-w-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-center capitalize flex justify-center items-center gap-3">
        <span
          className={`p-0.5 rounded  text-white border border-gray-400 grow cursor-pointer hover:border-gray-200 ${
            type === "signin" && "bg-blue-500"
          }`}
          onClick={() => {
            setType("signin");
          }}
        >
          Login
        </span>
        <span
          className={`p-0.5 rounded  text-white border border-gray-400 grow cursor-pointer hover:border-gray-200  ${
            type === "signup" && "bg-blue-500"
          }`}
          onClick={() => {
            setType("signup");
          }}
        >
          Register
        </span>
      </h2>

      {type == "signin" ? <SignInForm /> : <SignUpForm />}
    </div>
  );
};

export default AuthenticationForm;
