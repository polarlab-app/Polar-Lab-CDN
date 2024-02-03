import { useState, useEffect, useRef } from 'react';

export const ActiveQN = (ids) => {
 const [activeChapter, setActiveChapter] = useState(null);
 const chapterContainersRef = useRef([]);

 useEffect(() => {
   const observer = new IntersectionObserver(
     entries => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           setActiveChapter(entry.target.id);
         }
       });
     },
     { threshold: 0.4 } // Adjust this value according to your needs
   );

   chapterContainersRef.current.forEach(chapterContainer => {
     observer.observe(chapterContainer);
   });

   return () => {
     chapterContainersRef.current.forEach(chapterContainer => {
       observer.unobserve(chapterContainer);
     });
   };
 }, []);

 useEffect(() => {
   const qnSubElements = document.querySelectorAll('.qnsub');
   qnSubElements.forEach((el) => {
     el.classList.remove('activeqn');
     if (el.getAttribute('href') === `#${activeChapter}`) {
       el.classList.add('activeqn');
     }
   });
 }, [activeChapter]);

 return chapterContainersRef;
};