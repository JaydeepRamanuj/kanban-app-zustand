import { useState, useRef, useEffect } from "react";
import useAppStore from "../stores/useAppStore";
import { signout } from "../lib/firebaseAuthServices";
import { toast } from "react-toastify";
import { firebaseErrorMessages } from "../utils/firebaseErrorMessages";
import AuthenticationForm from "./AuthenticationForm";
import useKanbanStore from "../stores/useKanbanStore";

function Header() {
  const showPopup = useAppStore((state) => state.showPopup);
  const setUsername = useAppStore((state) => state.setUsername);
  const clearUser = useAppStore((state) => state.clearUser);
  const user = useAppStore((state) => state.user);
  const username = useAppStore((state) => state.username);
  const clearData = useKanbanStore((state) => state.clearData);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      const signOutPromise = signout();
      toast.promise(signOutPromise, {
        pending: "Signing out user",
        success: "User Signed out successfully",
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
      console.error("Error while signing out user", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between bg-white/30 backdrop-blur-sm p-4 rounded-lg shadow-sm">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center w-fit md:w-auto mb-2 md:mb-0">
        Kanban Board
      </h1>

      <div className="relative flex items-center gap-4 ml-auto">
        {!user && (
          <button
            className="bg-blue-600/90 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full transition-all duration-200 text-sm font-medium"
            onClick={() => showPopup(<AuthenticationForm />)}
          >
            Sign In
          </button>
        )}

        {user && (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm transition"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${username}&background=random`}
                alt="user avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:inline font-medium text-sm">
                {username}
              </span>
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-1 z-50">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
