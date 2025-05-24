import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import useAppStore from "../stores/useAppStore";
import { toast } from "react-toastify";
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages";
import { saveUserData } from "../lib/firebaseServices";
import GoogleSignInButton from "./GoogleSignInButton";
import { register } from "../lib/firebaseAuthServices";

function SignUpForm() {
  const [isPassVisible, setPassVisible] = useState<boolean>(false);
  const closePopup = useAppStore((state) => state.closePopup);
  const setUsername = useAppStore((state) => state.setUsername);
  const setUId = useAppStore((state) => state.setUId);
  const validationSchema = yup.object({
    username: yup
      .string()
      // .min(3, { message: "Username must be 3 or more character" })
      .required("Please enter Username"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter Email"),
    password: yup
      .string()
      .required("Please enter password")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        {
          message: "Please create stronger password",
        }
      ),
  });

  const onSubmit = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const registerPromise = register(email, password);

      toast.promise(registerPromise, {
        pending: "Registering user",
        success: "User Registered successfully ",
        error: {
          render({ data }) {
            const error = data as Error & { code?: string };
            return firebaseErrorMessages(error.code || "unknown");
          },
        },
      });
      const useCredentials = await registerPromise;
      await saveUserData(useCredentials.user.uid, username, email);
      setUsername(username);
      setUId(useCredentials.user.uid);

      // console.log(useCredentials.user);
      closePopup();
    } catch (error) {
      console.log("Error while registering user", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values.username, values.email, values.password);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <Field
              name="username"
              type="text"
              autoFocus={true}
              className={`w-full px-3 py-2 rounded border bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username && touched.username
                  ? "border-red-400"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-200 bg-red-500/70 font-semibold text-xs px-2 py-1 mt-1 rounded shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className={`w-full px-3 py-2 rounded border bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email && touched.email
                  ? "border-red-400"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-200 bg-red-500/70 font-semibold text-xs px-2 py-1 mt-1 rounded shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <div className="flex items-center">
              <div className="grow">
                <Field
                  name="password"
                  type={isPassVisible ? "text" : "password"}
                  className={`w-full px-3 py-2 rounded border bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password && touched.password
                      ? "border-red-400"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-200 bg-red-500/70 font-semibold text-xs px-2 py-1 mt-1 rounded shadow-sm"
                />
              </div>

              <span
                className="ml-2 p-2 text-xl rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition"
                onClick={() => setPassVisible(!isPassVisible)}
              >
                {isPassVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
          </div>

          <div></div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>
          <div className="flex items-center gap-2 text-white my-4">
            <hr className="flex-grow border-white/30" />
            <span className="text-sm font-medium">OR</span>
            <hr className="flex-grow border-white/30" />
          </div>

          <GoogleSignInButton type="signup" />
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
