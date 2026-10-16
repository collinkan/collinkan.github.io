import { Timeline } from "@/components/ui/timeline";
import { Metrics } from "@/components/ui/metrics";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Experience() {
    const data = [
        {
            title: "May 2025 - Present",
            content: (
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-white">Software Engineer</h3>
                    <p className="mb-5 border-b border-white/10 pb-4 text-lg md:text-xl tracking-wide"><span className="font-semibold text-synthTeal">Visa Inc.</span><span className="text-synthText/60"> · Bellevue, WA</span></p>
                    <ul className="list-none max-w-[70ch] space-y-4 text-lg md:text-xl font-medium leading-[1.6] text-synthText/90">
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Architected an autonomous, LangChain-powered Kubernetes agent for dynamic root cause analysis of pod failures."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Engineered a continuous-learning RAG pipeline with Pinecone for automated K8s remediations and HITL escalations."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Standardized CI/CD workflows across 100+ repositories using GitHub Actions, saving 6+ hours weekly."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Built a Spring Boot security assessment service leveraging MCPs to eliminate 90% of manual deployment checks."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Deployed an AI-driven Jira routing system using Atlassian MCP and LLMs to automate issue triage, saving 40+ hours a week."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Scaled high-availability infrastructure across Kubernetes, Jenkins, and ArgoCD, boosting delivery velocity by 35%."}</Metrics></li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Feb 2024 - May 2025",
            content: (
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-white">Software Engineer</h3>
                    <p className="mb-5 border-b border-white/10 pb-4 text-lg md:text-xl tracking-wide"><span className="font-semibold text-synthTeal">Deloitte</span><span className="text-synthText/60"> · Gilbert, AZ</span></p>
                    <ul className="list-none max-w-[70ch] space-y-4 text-lg md:text-xl font-medium leading-[1.6] text-synthText/90">
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Modernized the Veterans Benefits Management System by migrating legacy interfaces to a decoupled React architecture."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Built a real-time data synchronization pipeline for the Exam Scheduling Assistant, reducing data staleness by 15%."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Developed robust session recovery and autosave mechanisms in React and TypeScript, boosting user efficiency by 30%."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Implemented comprehensive client-side telemetry and error logging to accelerate incident resolution and observability."}</Metrics></li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Jun 2022 - Sep 2022",
            content: (
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-white">Software Engineer Intern</h3>
                    <p className="mb-5 border-b border-white/10 pb-4 text-lg md:text-xl tracking-wide"><span className="font-semibold text-synthTeal">Amazon</span><span className="text-synthText/60"> · Toronto, ON, Canada</span></p>
                    <ul className="list-none max-w-[70ch] space-y-4 text-lg md:text-xl font-medium leading-[1.6] text-synthText/90">
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Designed a Lambda and DynamoDB pipeline to process 1M+ daily fulfillment events across global regions for real-time observability."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Built a self-healing AWS StepFunctions and CloudWatch service, cutting production failures by 80% and improving response times by 40%."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Streamlined cross-team workflows with TypeScript automations, eliminating 8+ hours of weekly overhead."}</Metrics></li>
                    </ul>
                </div>
            ),
        },
        {
            title: "May 2021 - Apr 2022",
            content: (
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-white">Software Engineer Intern</h3>
                    <p className="mb-5 border-b border-white/10 pb-4 text-lg md:text-xl tracking-wide"><span className="font-semibold text-synthTeal">SequoiaDB</span><span className="text-synthText/60"> · Markham, ON, Canada</span></p>
                    <ul className="list-none max-w-[70ch] space-y-4 text-lg md:text-xl font-medium leading-[1.6] text-synthText/90">
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Developed a high-performance Go monitoring API for 300+ DB clusters, improving legacy Python runtimes by 38%."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Architected a Bash orchestration layer for multi-VM provisioning, saving 10+ hours of manual setup weekly."}</Metrics></li>
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Built an automated API integration testing framework using Karate, eliminating 15+ hours of manual regression testing per week."}</Metrics></li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Sep 2020 - Dec 2020",
            content: (
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-white">Undergraduate Teaching Assistant</h3>
                    <p className="mb-5 border-b border-white/10 pb-4 text-lg md:text-xl tracking-wide"><span className="font-semibold text-synthTeal">McMaster University</span><span className="text-synthText/60"> · Hamilton, ON, Canada</span></p>
                    <ul className="list-none max-w-[70ch] space-y-4 text-lg md:text-xl font-medium leading-[1.6] text-synthText/90">
                        <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']"><Metrics>{"Led technical instruction for 30+ students, architecting and debugging Verilog logic for FPGA integrations."}</Metrics></li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div id="experience" className={`relative w-full pb-20 pointer-events-none scroll-mt-20 ${rajdhani.className}`}>
            <style>{`
                
                /* Shrink the gap between the Experience header and the first timeline item */
                #experience .py-20 {
                    padding-bottom: 2rem !important;
                }
            `}</style>
            <div>
                <Timeline data={data} />
            </div>
        </div>
    );
}