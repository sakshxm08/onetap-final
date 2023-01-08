import React from "react";

//importing typewriter-effect
import Typewriter from "typewriter-effect";
import "./Typewriter.css";
function TypewriterEffect() {
  return (
    <div className="typewriterEffect">
      <Typewriter
        onInit={(typewriter) => {
          typewriter

            .typeString("Auditoriums")

            .pauseFor(1000)
            .deleteAll()
            .typeString("Gyms")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Swimming Pool")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Cafes")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Open Grounds")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Lounges")

            .start();
        }}
      />
    </div>
  );
}

export default TypewriterEffect;
