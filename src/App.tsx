import "./App.css";
import Kanban from "./components/Kanban";
import Popup from "./components/Popup";
import type { AppState } from "./stores/appStore";
import useAppStore from "./stores/appStore";

function App() {
  const isOpen = useAppStore((state: AppState) => state.isOpen);
  return (
    <>
      <Kanban />
      {isOpen && <Popup />}
    </>
  );
}

export default App;
