import React from "react";

function Footer() {
  return (
    <footer className="footer p-5 mt-5 mx-5">
      <div className="content-wrapper has-text-centered">
        <p>&copy; {new Date().getFullYear()} Timetable App. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
