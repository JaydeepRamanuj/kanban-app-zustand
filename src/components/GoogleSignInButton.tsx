import { getAdditionalUserInfo, type UserCredential } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { googleSignIn } from "../lib/firebaseAuthServices";
import { getUserData, saveUserData } from "../lib/firebaseServices";
import useAppStore from "../stores/useAppStore";
import useKanbanStore from "../stores/useKanbanStore";

type GoogleSignInButtonProps = {
  type?: string;
};

function GoogleSignInButton({ type = "signup" }: GoogleSignInButtonProps) {
  const setUsername = useAppStore((state) => state.setUsername);
  const setPhotoURL = useAppStore((state) => state.setPhotoURL);
  const setUId = useAppStore((state) => state.setUId);
  const closePopup = useAppStore((state) => state.closePopup);
  const initialize = useKanbanStore((state) => state.initialize);
  const handleGoogleSignIn = async () => {
    try {
      const result: UserCredential = await googleSignIn();

      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);

      const uid = user.uid;
      const username = user.displayName || user.email?.split("@")[0] || "Guest";
      const email = user.email || "No email Provided";
      const photoURL = user.photoURL;

      setUId(uid);

      if (additionalUserInfo?.isNewUser) {
        await saveUserData(uid, username, email);
        setUsername(username);
        setPhotoURL(
          photoURL ||
            `https://ui-avatars.com/api/?name=${username}&background=random`
        );
      } else {
        const existingUser = await getUserData(uid);
        setUsername(existingUser?.username);
        initialize(existingUser?.tasks);
      }
    } catch (error) {
      console.log("Error signing with Google", error);
    } finally {
      closePopup();
    }
  };

  return (
    <div
      className="rounded bg-white text-black flex items-center justify-center py-2 font-semibold gap-3 cursor-pointer hover:bg-gray-100 transition border border-gray-300"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle className="text-xl" />
      <span>{type === "signup" ? "Sign Up" : "Sign In"} with Google</span>
    </div>
  );
}

export default GoogleSignInButton;
