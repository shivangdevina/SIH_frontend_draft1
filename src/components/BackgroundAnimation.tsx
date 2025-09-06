import { useEffect, useRef } from 'react';

interface FloatingElement {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'vine' | 'glow' | 'dot';
  phase: number;
  frequency: number;
}

interface Connection {
  from: FloatingElement;
  to: FloatingElement;
  opacity: number;
}

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createElement = (): FloatingElement => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 6 + 3,
      opacity: Math.random() * 0.4 + 0.2,
      type: ['vine', 'glow', 'dot'][Math.floor(Math.random() * 3)] as 'vine' | 'glow' | 'dot',
      phase: Math.random() * Math.PI * 2,
      frequency: Math.random() * 0.02 + 0.01,
    });

    const initElements = () => {
      const elementCount = window.innerWidth < 768 ? 25 : 40;
      elementsRef.current = Array.from({ length: elementCount }, createElement);
    };

    const drawElement = (element: FloatingElement) => {
      ctx.save();
      ctx.globalAlpha = element.opacity;
      ctx.translate(element.x, element.y);
      
      if (element.type === 'vine') {
        // Organic vine-like shapes
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2 + element.phase;
          const radius = element.size * (0.5 + Math.sin(angle) * 0.3);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (element.type === 'glow') {
        // Glowing orbs
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, element.size);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, element.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Simple dots
        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.arc(0, 0, element.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    const updateElement = (element: FloatingElement) => {
      // Wave-like movement
      element.x += element.vx + Math.sin(Date.now() * element.frequency + element.phase) * 0.5;
      element.y += element.vy + Math.cos(Date.now() * element.frequency + element.phase) * 0.3;
      
      // Pulsing opacity
      element.opacity = (Math.sin(Date.now() * 0.002 + element.phase) + 1) * 0.2 + 0.1;

      // Boundary wrapping
      if (element.x < -element.size) element.x = canvas.width + element.size;
      if (element.x > canvas.width + element.size) element.x = -element.size;
      if (element.y < -element.size) element.y = canvas.height + element.size;
      if (element.y > canvas.height + element.size) element.y = -element.size;
    };

    const updateConnections = () => {
      connectionsRef.current = [];
      const elements = elementsRef.current;
      
      for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
          const dx = elements[i].x - elements[j].x;
          const dy = elements[i].y - elements[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.2;
            connectionsRef.current.push({
              from: elements[i],
              to: elements[j],
              opacity: opacity
            });
          }
        }
      }
    };

    const drawConnections = () => {
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 1;
      
      connectionsRef.current.forEach(connection => {
        ctx.save();
        ctx.globalAlpha = connection.opacity;
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.stroke();
        ctx.restore();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      elementsRef.current.forEach(element => {
        updateElement(element);
        drawElement(element);
      });

      updateConnections();
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initElements();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initElements();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

export default BackgroundAnimation;