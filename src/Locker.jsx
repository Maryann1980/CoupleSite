import React, { useState } from "react";

export function Locker() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const secretPassword = "love123";

  const unlock = () => {
    if (!unlocked) {
      // If currently locked, check password to unlock
      if (password === secretPassword) {
        setUnlocked(true);
        setShowAlert(false);
      } else {
        setShowAlert(true);
      }
      setPassword(""); // Clear input always on attempt
    } else {
      // If currently unlocked, clicking button locks it again
      setUnlocked(false);
    }
  };

  return (
    <>
      <section id="locker" className="locker">
        <h2>Unlock a Secret Message</h2>
        <input
          type="password"
          id="locker-password"
          placeholder="Enter secret code"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={unlocked} // disable input when unlocked
        />
        <button className={`unlock-btn ${unlocked ? "unlocked" : "locked"}`} onClick={unlock}>
          {unlocked ? "Unlocked" : "Unlock"}
        </button>

        {/* Secret message only visible if unlocked */}
        {unlocked && (
          <div className="locker-content">
            <p>
              Lorem, ipsum dolor.
              <br />
              Lorem ipsum dolor sit amet.
              <br />
              Lorem ipsum dolor sit.
            </p>
          </div>
        )}
      </section>

      {/* Alert message */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>Wrong password, my love 💔</p>
            <button onClick={() => setShowAlert(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Locker;
