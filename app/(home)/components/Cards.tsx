import { useRef, useEffect } from "react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.hover-glow-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const items = [
    {
      title: "Python",
      image: "/icons/python-original.svg",
    },
    {
      title: "Java",
      image: "/icons/java-original.svg",
    },
    {
      title: "TypeScript",
      image: "/icons/typescript-original.svg",
    },
    {
      title: "C++",
      image: "/icons/cplusplus-original.svg",
    },
    {
      title: "React",
      image: "/icons/react-original.svg",
    },
    {
      title: "Spring Boot",
      image: "/icons/spring-original.svg",
    },
    {
      title: "Docker",
      image: "/icons/docker-original.svg",
    },
    {
      title: "Kubernetes",
      image: "/icons/kubernetes-plain.svg",
    },
    {
      title: "AWS",
      image: "/icons/amazonwebservices-original-wordmark.svg",
    },
    {
      title: "Ansible",
      image: "/icons/ansible-original.svg",
    },
    {
      title: "PostgreSQL",
      image: "/icons/postgresql-original.svg",
    },
    {
      title: "Kafka",
      image: "/icons/apachekafka-original.svg",
    }
  ];
  return (
      <DraggableCardContainer ref={containerRef} className={`relative flex flex-wrap py-20 px-10 min-h-[50vh] items-center justify-center overflow-clip gap-5 z-10 ${rajdhani.className}`}>
        {items.map((item, index) => (
          <DraggableCardBody key={index} constraintsRef={containerRef} className="hover-glow-card group overflow-hidden relative flex flex-col items-center justify-center w-[15%] aspect-square p-4 rounded-2xl border border-white/10 shadow-lg cursor-grab active:cursor-grabbing bg-black/40 backdrop-blur-sm">
            
            {/* Glowing hover effect */}
            <div 
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 255, 0.15), transparent 40%)`
              }}
            />

            <img
              src={item.image}
              alt={item.title}
              className="pointer-events-none relative z-10 h-1/2 w-1/2 object-contain"
            />
            <h3 className="mt-4 text-center text-xs md:text-lg xl:text-2xl font-bold text-neutral-700 dark:text-neutral-300 line-clamp-1 relative z-10">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
  );
}
