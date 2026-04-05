'use client';

import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
}

export default function TypingText({ text, typingSpeed = 50, startDelay = 500 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      let index = 0;
      const type = () => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index++;
          timeoutId = setTimeout(type, typingSpeed);
        } else {
          setComplete(true);
        }
      };
      type();
    };

    timeoutId = setTimeout(startTyping, startDelay);

    return () => clearTimeout(timeoutId);
  }, [text, typingSpeed, startDelay]);

  return (
    <span className={`typing-text text-primary ${complete ? 'cursor-blink' : ''}`}>
      {displayedText}
      <span className="typing-cursor border-r-2 border-primary ml-1 animate-pulse" />
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink .typing-cursor {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </span>
  );
}
