import "./App.css";
import AuthenticationForm from "./components/AuthenticationForm";
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
      <AuthenticationForm
        onSubmit={(email, password) => console.log(email, password)}
      />
    </>
  );
}

export default App;
