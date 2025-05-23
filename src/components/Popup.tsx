import { useEffect, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import useAppStore from "../stores/useAppStore";
function Popup() {
  const ref = useRef<HTMLDivElement>(null);
  const closePopup = useAppStore((state) => state.closePopup);
  const popupComponent = useAppStore((state) => state.popupComponent);

  const handleCancel = () => {
    closePopup();
  };
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closePopup();
      }
    };
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="overlay fixed w-full h-full top-0 left-0 bg-black/60 backdrop-blur flex justify-center items-center z-999">
      <div
        ref={ref}
        className="popup-content border-2 p-3 rounded-md bg-white/20 border-blue-300 shadow-3xl relative"
      >
        {popupComponent && popupComponent}
        <span
          className="size-8 flex justify-center items-center bg-black/60 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-15 cursor-pointer transition-all  hover:scale-[1.05] hover:bg-black/70"
          onClick={handleCancel}
        >
          <IoIosCloseCircle />
        </span>
      </div>
    </div>
  );
}

export default Popup;
