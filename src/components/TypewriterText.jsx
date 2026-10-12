import { useState, useEffect } from "react";

const TypewriterText = ({
  text = "",
  speed = 65,
  delay = 120,
  startTrigger = true,
  className = "",
  cursorClassName = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!startTrigger) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);

    let currentIndex = 0;
    let timerId = null;

    const startTimer = setTimeout(() => {
      timerId = setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));
        } else {
          clearInterval(timerId);
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timerId) clearInterval(timerId);
    };
  }, [text, speed, delay, startTrigger]);

  return (
    <span className={`typewriter-container ${className}`}>
      <span>{displayedText}</span>
      <span
        className={`typewriter-cursor ${isTyping ? "typing" : "idle"} ${cursorClassName}`}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
};

export default TypewriterText;
