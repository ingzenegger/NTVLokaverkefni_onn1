import "./loading.style.css";

//TODO: figure out how to stop the loader from blinking briefly on the screen, like only having it appear if a certain amount of time has passed - its making things look glitchy

export default function Loading() {
  // <!-- From Uiverse.io by vinodjangid07 -->
  return (
    <div className="loader">
      <div className="panWrapper">
        <div className="pan">
          <div className="food"></div>
          <div className="panBase"></div>
          <div className="panHandle"></div>
        </div>
        <div className="panShadow"></div>
      </div>
    </div>
  );
}
