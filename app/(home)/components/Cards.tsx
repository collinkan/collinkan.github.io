import { Fragment, useRef, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Cpu, RotateCcw, Workflow } from "lucide-react";
import {
  SiAmazonwebservices, SiApachekafka, SiArgo, SiCplusplus, SiDocker, SiGithubactions, SiGo, SiJavascript, SiJenkins, SiKubernetes, SiOpenjdk, SiPostgresql, SiPython, SiPytorch, SiReact, SiSpringboot, SiTypescript, SiVuedotjs,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

// `src` is a full-detail colour logo; skills without one fall back to a single-colour icon.
type Skill = { title: string; src?: string; Icon?: IconType | LucideIcon; color: string };

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cachedCards = useRef<NodeListOf<Element> | null>(null);
  const [movedCards, setMovedCards] = useState<Set<string>>(new Set());
  const [resetSignal, setResetSignal] = useState(0);
  const hasMoved = movedCards.size > 0;

  const resetCards = () => {
    setResetSignal((n) => n + 1);
    setMovedCards(new Set());
  };

  useEffect(() => {
    cachedCards.current = document.querySelectorAll('.hover-glow-card');
    const handleMouseMove = (e: MouseEvent) => {
      cachedCards.current?.forEach((card) => {
        const rect = card.getBoundingClientRect();
        (card as HTMLElement).style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Source of truth: Resume_Sept_09232026.pdf (Technical Skills)
  const groups: { label: string; items: Skill[] }[] = [
    {
      label: "Languages",
      items: [
        { title: "Python", src: "/icons/python-original.svg", color: "#000000" },
        { title: "Java", src: "/icons/java-original.svg", color: "#000000" },
        { title: "TypeScript", src: "/icons/typescript-original.svg", color: "#000000" },
        { title: "JavaScript", src: "/icons/javascript-original.svg", color: "#000000" },
        { title: "C / C++", src: "/icons/cplusplus-original.svg", color: "#000000" },
        { title: "Go", src: "/icons/go-original.svg", color: "#000000" },
      ],
    },
    {
      label: "Technologies",
      items: [
        { title: "Kubernetes", src: "/icons/kubernetes-plain.svg", color: "#000000" },
        { title: "Docker", src: "/icons/docker-original.svg", color: "#000000" },
        { title: "AWS", src: "/icons/amazonwebservices-original-wordmark.svg", color: "#000000" },
        { title: "React", src: "/icons/react-original.svg", color: "#000000" },
        { title: "Vue", src: "/icons/vuejs-original.svg", color: "#000000" },
        { title: "PyTorch", src: "/icons/pytorch-original.svg", color: "#000000" },
        { title: "Kafka", src: "/icons/apachekafka-original.svg", color: "#000000" },
        { title: "eBPF", src: "/icons/ebpf.svg", color: "#000000" },
        { title: "Linux", src: "/icons/linux-plain.svg", color: "#000000" },
        { title: "Jenkins", src: "/icons/jenkins-original.svg", color: "#000000" },
        { title: "GitHub Actions", src: "/icons/githubactions-original.svg", color: "#000000" },
        { title: "ArgoCD", src: "/icons/argocd-original.svg", color: "#000000" },
        { title: "LangGraph", src: "/icons/langgraph.svg", color: "#000000" },
        { title: "LangChain", src: "/icons/langchain.png", color: "#000000" },
        { title: "Spring Boot", src: "/icons/spring-original.svg", color: "#000000" },
        { title: "nginx", src: "/icons/nginx-original.svg", color: "#000000" },
        { title: "WireMock", src: "/icons/wiremock.svg", color: "#000000" },
        { title: "PostgreSQL", src: "/icons/postgresql-original.svg", color: "#000000" },
      ],
    },
  ];

  return (
    <>
      <div className={`relative z-20 flex w-full items-center gap-4 px-6 pt-10 text-synthText pointer-events-none sm:px-12 md:px-20 ${rajdhani.className}`}>
        <h2 className="text-3xl md:text-5xl font-semibold synth-heading">Skills</h2>
        <button
          type="button"
          onClick={resetCards}
          disabled={!hasMoved}
          aria-label="Reset card positions"
          tabIndex={hasMoved ? 0 : -1}
          className={`glass-pill pointer-events-auto flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all duration-300 hover:text-synthTeal ${hasMoved ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
          Reset
        </button>
      </div>

    <DraggableCardContainer ref={containerRef} className={`relative flex flex-wrap py-20 px-10 min-h-[50vh] items-center justify-start overflow-clip gap-x-5 gap-y-10 z-10 ${rajdhani.className}`}>
      {groups.map((group) => (
        <Fragment key={group.label}>
          <div className="flex w-full items-center gap-4 px-1 pt-2 text-sm font-semibold uppercase tracking-[0.2em] text-synthText/70">
            {group.label}
            <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
          </div>
          {group.items.map((item) => {
            const id = item.title;
            return (
              <DraggableCardBody
                key={id}
                constraintsRef={containerRef}
                resetSignal={resetSignal}
                onMove={() => setMovedCards((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))}
                className="hover-glow-card glass-frost group overflow-hidden relative flex flex-col items-center justify-center w-[calc(25%-0.95rem)] sm:w-[calc(16.667%-1.05rem)] lg:w-[calc(11.111%-1.12rem)] aspect-square p-3 rounded-2xl cursor-grab active:cursor-grabbing"
              >
                {/* Tilting glass face: edges and sheen rotate with the card */}
                <div className="glass-pill pointer-events-none absolute inset-0 rounded-2xl [box-shadow:inset_0_2px_6px_rgb(var(--glass-reflect)/0.28),inset_0_-3px_8px_rgb(0_0_0/0.35)]" />

                {/* Glowing hover effect */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                  style={{
                    background: `radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 255, 0.15), transparent 40%)`
                  }}
                />

                {/* Every logo sits in the same round badge. The interior is dark and near-opaque so the
                    holes inside each logo show that colour and keep their detail. */}
                {/* Pastel sunset tile with a neon rim: full-colour logos keep every detail, and the dark
                    parts of marks like Kafka and AWS stay readable. */}
                <span
                  className="pointer-events-none relative z-20 grid h-12 w-12 place-items-center rounded-[1.1rem] md:h-[4.5rem] md:w-[4.5rem]"
                  style={{
                    background:
                      'linear-gradient(165deg, rgba(236,222,255,0.62) 0%, rgba(214,186,250,0.54) 50%, rgba(255,184,226,0.5) 100%)',
                    boxShadow:
                      'inset 0 0 0 1.5px rgba(45,226,230,0.85), inset 0 -10px 14px -8px rgba(254,83,187,0.45), 0 0 14px rgba(45,226,230,0.35), 0 8px 18px rgba(20,0,40,0.5)',
                  }}
                >
                  {item.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.src} alt="" aria-hidden="true" className={/(wiremock|ebpf)/.test(item.src) ? "h-[80%] w-[80%] object-contain" : /(langchain|langgraph)\./.test(item.src) ? "h-[78%] w-[78%] rounded-[22%] object-cover" : "h-[64%] w-[64%] object-contain"} />
                  ) : (
                    item.Icon && <item.Icon aria-hidden="true" strokeWidth={1.5} className="h-[60%] w-[60%]" style={{ color: item.color }} />
                  )}
                </span>
                <h3 className="relative z-20 mt-2.5 line-clamp-2 text-center text-xs font-semibold leading-tight text-synthText md:text-sm xl:text-base">
                  {item.title}
                </h3>
              </DraggableCardBody>
            );
          })}
        </Fragment>
      ))}
    </DraggableCardContainer>
    </>
  );
}
