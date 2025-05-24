import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { signIn } from "../lib/firebaseAuthServices";
import { toast } from "react-toastify";
import useAppStore from "../stores/useAppStore";
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages";
import { getUserData } from "../lib/firebaseServices";
import GoogleSignInButton from "./GoogleSignInButton";
import useKanbanStore from "../stores/useKanbanStore";
function SignInForm() {
  const [isPassVisible, setPassVisible] = useState<boolean>(false);
  const closePopup = useAppStore((state) => state.closePopup);
  const setUsername = useAppStore((state) => state.setUsername);
  const setUId = useAppStore((state) => state.setUId);
  const initialize = useKanbanStore((state) => state.initialize);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter Email"),
    password: yup.string().required("Please enter password"),
    // .matches(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //   {
    //     message: "Please create stronger password",
    //   }
    // ),
  });

  const onSubmit = async (email: string, password: string) => {
    try {
      const signInPromise = signIn(email, password);
      toast.promise(signInPromise, {
        pending: "Signing in user",
        success: "User signed in successfully ",
        error: {
          render({ data }) {
            const error = data as Error & { code?: string };
            return firebaseErrorMessages(error.code || "unknown");
          },
        },
      });
      const useCredentials = await signInPromise;
      const user = await getUserData(useCredentials.user.uid);
      setUsername(user?.username);
      setUId(useCredentials.user.uid);
      initialize(user?.tasks);
      closePopup();
    } catch (error) {
      console.log("Error signing in user", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values.email, values.password);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <Field
              name="email"
              type="email"
              autoFocus={true}
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
                className="ml-2 p-2 text-xl rounded-full bg-white/10 cursor-pointer hover:bg-white/15"
                onClick={() => {
                  setPassVisible(!isPassVisible);
                }}
              >
                {isPassVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Sign In
          </button>

          <div className="flex items-center gap-2 text-white my-4">
            <hr className="flex-grow border-white/30" />
            <span className="text-sm font-medium">OR</span>
            <hr className="flex-grow border-white/30" />
          </div>

          <GoogleSignInButton />
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
