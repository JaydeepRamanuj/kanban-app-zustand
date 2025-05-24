import useAppStore from "../stores/useAppStore";
import AuthenticationForm from "./AuthenticationForm";
import { toast } from "react-toastify";
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages";
import { signout } from "../lib/firebaseAuthServices";
import useKanbanStore from "../stores/useKanbanStore";

function Header() {
  const showPopup = useAppStore((state) => state.showPopup);
  const setUsername = useAppStore((state) => state.setUsername);
  const clearUser = useAppStore((state) => state.clearUser);
  const user = useAppStore((state) => state.user);
  const username = useAppStore((state) => state.username);
  const clearData = useKanbanStore((state) => state.clearData);
  return (
    <div className="flex justify-center items-center">
      <h1 className="md:ml-auto text-xl md:text-4xl text-center font-bold">
        Kanban Board
      </h1>
      {!user && (
        <span
          className="ml-auto bg-white/20 rounded-full px-3 py-1 flex justify-center items-center cursor-pointer hover:bg-white/30"
          onClick={() => {
            showPopup(<AuthenticationForm />);
          }}
        >
          Sign In
        </span>
      )}

      {user && <span className="ml-auto">Hi, {username}</span>}
      {user && (
        <span
          className=" ml-3 bg-white/20 rounded-full px-3 py-1 flex justify-center items-center cursor-pointer hover:bg-white/30"
          onClick={async () => {
            try {
              const signOutPromise = signout();
              toast.promise(signOutPromise, {
                pending: "Signing out user",
                success: "User Signed out successfully ",
                error: {
                  render({ data }) {
                    const error = data as Error & { code?: string };
                    return firebaseErrorMessages(error.code || "unknown");
                  },
                },
              });
              setUsername("");
              clearUser();
              clearData();
            } catch (error) {
              console.log("Error while signing out user", error);
            }
          }}
        >
          Sign out
        </span>
      )}
    </div>
  );
}

export default Header;
