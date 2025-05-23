import { ToastContainer } from "react-toastify";
import "./App.css";
import Kanban from "./components/Kanban";
import Popup from "./components/Popup";
import type { AppState } from "./stores/useAppStore";
import useAppStore from "./stores/useAppStore";
function App() {
  const isOpen = useAppStore((state: AppState) => state.isOpen);
  return (
    <>
      <Kanban />
      {isOpen && <Popup />}
      <ToastContainer />
    </>
  );
}

export default App;
