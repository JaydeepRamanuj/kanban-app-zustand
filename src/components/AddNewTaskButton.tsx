import { getAuth } from "firebase/auth";
import useAppStore, { type AppState } from "../stores/useAppStore";
import TaskInput from "./TaskInput";

function AddNewTaskButton() {
  const showPopup = useAppStore((state: AppState) => state.showPopup);
  const handleClick = () => {
    showPopup(<TaskInput />);
    console.log(getAuth().currentUser);
  };

  return (
    <button
      className="block bg-blue-600 text-2xl  text-white mx-auto  px-3 font-bold py-1 rounded-md m-1 cursor-pointer transition-all duration-100 hover:bg-blue-800 active:bg-blue-800 active:scale-[0.97]"
      onClick={handleClick}
    >
      Add task
    </button>
  );
}

export default AddNewTaskButton;
