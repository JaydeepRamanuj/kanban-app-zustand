import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

type AuthenticationFormProps = {
  onSubmit: (email: string, password: string) => void;
};

const AuthenticationForm = ({ onSubmit }: AuthenticationFormProps) => {
  const [type, setType] = useState<"signin" | "signup">("signin");
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white/20 shadow-lg  rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center capitalize flex justify-center items-center gap-3">
        <span
          className={`p-0.5 rounded  text-white border border-gray-400 grow cursor-pointer hover:border-gray-200 ${
            type == "signin" && "bg-blue-500"
          }`}
          onClick={() => {
            setType("signin");
          }}
        >
          Login
        </span>
        <span
          className={`p-0.5 rounded  text-white border border-gray-400 grow cursor-pointer hover:border-gray-200  ${
            type == "signup" && "bg-blue-500"
          }`}
          onClick={() => {
            setType("signup");
          }}
        >
          Register
        </span>
      </h2>

      <Formik
        initialValues={
          type == "signup"
            ? { email: "", password: "", username: "" }
            : { email: "", password: "" }
        }
        validationSchema={yup.object({
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
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values.email, values.password);
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col gap-4">
          {type == "signup" && (
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">
                Username
              </label>
              <Field
                name="username"
                type="text"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>

          <span className="text-center">OR</span>

          <div className="rounded bg-white/40 flex items-center justify-center p-1.5 font-semibold gap-3">
            <FcGoogle className="text-xl" />{" "}
            <span>{`${
              type === "signin" ? "Sign In" : "Sign Up"
            } with Google`}</span>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthenticationForm;
