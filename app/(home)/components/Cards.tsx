import { useRef } from "react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <DraggableCardContainer ref={containerRef} className="border-2 border-red-500 absolute top-[125vh] flex flex-wrap p-10 items-center justify-center overflow-clip gap-5">
      {items.map((item, index) => (
        <DraggableCardBody key={index} constraintsRef={containerRef} className="flex flex-col items-center justify-center w-[15%] rounded-2xl border border-white/10 shadow-lg cursor-grab active:cursor-grabbing">
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-40 w-40 object-contain"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
