import React, { useState, useEffect } from "react";
import "./Lock.css";
import bg from "../assets/bg.jpg";

const Lock = () => {
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [animating, setAnimating] = useState([false, false, false, false]);
  const [message, setMessage] = useState("");
  const [lockout, setLockout] = useState(false); // 🚫 disable inputs
  const [countdown, setCountdown] = useState(0); // ⏳ countdown value

  const secret = [1, 0, 6, 4];

  // 🔄 Auto reload every 1 min
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 🔄 Countdown effect for wrong attempt
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && lockout) {
      window.location.reload();
    }
  }, [countdown, lockout]);

  const triggerAnimation = (index, direction) => {
    const newAnim = [...animating];
    newAnim[index] = direction;
    setAnimating(newAnim);

    setTimeout(() => {
      const resetAnim = [...newAnim];
      resetAnim[index] = false;
      setAnimating(resetAnim);
    }, 300);
  };

  const increaseDigit = (index) => {
    if (lockout) return; // 🚫 disable during lockout
    const newDigits = [...digits];
    newDigits[index] = (newDigits[index] + 1) % 10;
    setDigits(newDigits);
    triggerAnimation(index, "up");
  };

  const decreaseDigit = (index) => {
    if (lockout) return; // 🚫 disable during lockout
    const newDigits = [...digits];
    newDigits[index] = (newDigits[index] - 1 + 10) % 10;
    setDigits(newDigits);
    triggerAnimation(index, "down");
  };

  const checkCode = () => {
    if (lockout) return; // 🚫 block button press during lockout

    if (JSON.stringify(digits) === JSON.stringify(secret)) {
      setMessage("✔ Correct!");
      setTimeout(() => {
        window.location.href = "/nextpage";
      }, 1000);
    } else {
      setMessage("❌ Wrong Code! Reloading in 5...");
      setLockout(true);
      setCountdown(5); // start countdown
    }
  };

  return (
  <div
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      width: '100vw',
      height: '100vh',  // ✅ full viewport height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div className="lock-container">
      <h1>Enter the Secret Code</h1>
      <div className="lock">
        {digits.map((digit, i) => (
          <div className="dial" key={i}>
            <button
              className="arrow up"
              onClick={() => increaseDigit(i)}
              disabled={lockout}
            >
              ▲
            </button>
            <div
              className={`digit ${animating[i] ? `roll-${animating[i]}` : ""}`}
            >
              {digit}
            </div>
            <button
              className="arrow down"
              onClick={() => decreaseDigit(i)}
              disabled={lockout}
            >
              ▼
            </button>
          </div>
        ))}
      </div>
      <button onClick={checkCode} disabled={lockout}>
        Enter
      </button>
      <div
        className={`message ${message.includes("✔") ? "success" : "error"}`}
      >
        {lockout && countdown > 0
          ? `❌ Wrong Code! Reloading in ${countdown}...`
          : message}
      </div>
    </div>
  </div>
);

};

export default Lock;
