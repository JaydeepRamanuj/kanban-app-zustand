import useAppStore, { type AppState } from "../stores/useAppStore";

function AddNewTaskButton() {
  const togglePopup = useAppStore((state: AppState) => state.togglePopup);
  const handleClick = () => {
    togglePopup(true);
  };
  return (
    <button
      className="block bg-blue-600 text-white mx-auto  px-3 font-semibold py-1 rounded-md m-1 cursor-pointer transition-all duration-100 hover:bg-blue-800 active:bg-blue-800 active:scale-[0.97]"
      onClick={handleClick}
    >
      Add task
    </button>
  );
}

export default AddNewTaskButton;
