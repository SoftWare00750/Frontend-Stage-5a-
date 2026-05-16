import { useEffect } from 'react';

const Cursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    let rx = 0, ry = 0, cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    };

    const animate = () => {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(animate);
    };
    animate();
    document.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a,button,[data-hover]');
    const grow = () => { cursor.style.width = '20px'; cursor.style.height = '20px'; ring.style.transform = 'translate(-50%,-50%) scale(1.5)'; };
    const shrink = () => { cursor.style.width = '12px'; cursor.style.height = '12px'; ring.style.transform = 'translate(-50%,-50%) scale(1)'; };
    interactives.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      interactives.forEach(el => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink); });
    };
  }, []);

  return null;
};

import React from 'react';
export default Cursor;