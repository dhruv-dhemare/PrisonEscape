import React from "react";
import "./NextPage.css"; // create this CSS file
import bg from "../assets/bg.jpg"; // same background as Lock page

const NextPage = () => {
  return (
    <div
      className="nextpage-wrapper"
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
      <div className="nextpage-container">
        <h1>🎉 Congratulations!</h1>
        <p>You’ve cracked the code, but your journey isn’t over yet. Your final task is to track down the Architect—the mastermind behind all the puzzles—to claim your ultimate reward.🔓</p>
      </div>
    </div>
  );
};

export default NextPage;
