// src/components/AffirmationTrail.jsx
import { useEffect } from 'react';
import './MouseTrail.css';

const AffirmationTrail = () => {
  useEffect(() => {
   const funCharsOriginal = [
  'You Radiate Light', 'Your Voice Matters', 'You Are a Force of Good',
  'You Are Enough', 'Your Potential is Infinite', 'You Are Brilliant',
  'You Create Peace', 'You Deserve Joy', 'You Are Magnetic',
  'You Are Courage in Motion', 'You Inspire the Future',
  'You Are Limitless Energy', 'You Bring Hope', 'You Are the Spark',
  'You Create Beauty', 'You Are Deeply Loved', 'You Light the Way',
  'You Are the Moment', 'You Are Gentle Strength', 'You Carry Magic',
  'You Make a Difference', 'You Are Seen and Heard', 'You Are Peaceful',
  'You Are Always Becoming', 'You Are Unstoppable', 'You Are Guided',
  'You Are Enough. Right Now.', 'You Move With Purpose',
  'You Matter More Than You Know'
];


    let funChars = [...funCharsOriginal];
    let index = 0;
    let lastTriggerTime = 0;
    const delay = 5000;

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffleArray(funChars);

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTriggerTime < delay) return;
      lastTriggerTime = now;

      if (index >= funChars.length) {
        funChars = [...funCharsOriginal];
        shuffleArray(funChars);
        index = 0;
      }

      const char = document.createElement('div');
      char.className = 'cursor-char';
      char.innerText = funChars[index++];
      document.body.appendChild(char);



   char.style.position = 'absolute';
char.style.left = `${e.pageX}px`;
char.style.top = `${e.pageY}px`;


      const driftY = -140;
      const duration = 4000;
      const start = performance.now();

      function animate(now) {
        const elapsed = now - start;
        const progress = elapsed / duration;

        if (progress < 1) {
          char.style.transform = `translate(-50%, calc(-50% + ${driftY * progress}px))`;
          char.style.opacity = 1 - progress;
          requestAnimationFrame(animate);
        } else {
          char.remove();
        }
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null; // no visible JSX output; purely effect-based
};

export default AffirmationTrail;
