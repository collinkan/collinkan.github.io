import { Timeline } from "@/components/ui/timeline";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Experience() {
    const data = [
        {
            title: "May 2025 - Present",
            content: (
                <div>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">Software Engineer</h3>
                    <p className="text-lg md:text-2xl italic text-synthTeal mb-4">Visa Inc. • Bellevue, WA</p>
                    <ul className="list-disc pl-6 text-base md:text-xl font-medium space-y-2">
                        <li>Architected an autonomous, LangChain-powered Kubernetes agent for dynamic root cause analysis of pod failures.</li>
                        <li>Engineered a continuous-learning RAG pipeline with Pinecone for automated K8s remediations and HITL escalations.</li>
                        <li>Standardized CI/CD workflows across 100+ repositories using GitHub Actions, saving 6+ hours weekly.</li>
                        <li>Built a Spring Boot security assessment service leveraging MCPs to eliminate 90% of manual deployment checks.</li>
                        <li>Deployed an AI-driven Jira routing system using Atlassian MCP and LLMs to automate issue triage, saving 40+ hours a week.</li>
                        <li>Scaled high-availability infrastructure across Kubernetes, Jenkins, and ArgoCD, boosting delivery velocity by 35%.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Feb 2024 - May 2025",
            content: (
                <div>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">Software Engineer</h3>
                    <p className="text-lg md:text-2xl italic text-synthTeal mb-4">Deloitte • Gilbert, AZ</p>
                    <ul className="list-disc pl-6 text-base md:text-xl font-medium space-y-2">
                        <li>Modernized the Veterans Benefits Management System by migrating legacy interfaces to a decoupled React architecture.</li>
                        <li>Built a real-time data synchronization pipeline for the Exam Scheduling Assistant, reducing data staleness by 15%.</li>
                        <li>Developed robust session recovery and autosave mechanisms in React and TypeScript, boosting user efficiency by 30%.</li>
                        <li>Implemented comprehensive client-side telemetry and error logging to accelerate incident resolution and observability.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Jun 2022 - Sep 2022",
            content: (
                <div>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">Software Engineer Intern</h3>
                    <p className="text-lg md:text-2xl italic text-synthTeal mb-4">Amazon • Toronto, ON, Canada</p>
                    <ul className="list-disc pl-6 text-base md:text-xl font-medium space-y-2">
                        <li>Designed a Lambda and DynamoDB pipeline to process 1M+ daily fulfillment events across global regions for real-time observability.</li>
                        <li>Built a self-healing AWS StepFunctions and CloudWatch service, cutting production failures by 80% and improving response times by 40%.</li>
                        <li>Streamlined cross-team workflows with TypeScript automations, eliminating 8+ hours of weekly overhead.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "May 2021 - Apr 2022",
            content: (
                <div>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">Software Engineer Intern</h3>
                    <p className="text-lg md:text-2xl italic text-synthTeal mb-4">SequoiaDB • Markham, ON, Canada</p>
                    <ul className="list-disc pl-6 text-base md:text-xl font-medium space-y-2">
                        <li>Developed a high-performance Go monitoring API for 300+ DB clusters, improving legacy Python runtimes by 38%.</li>
                        <li>Architected a Bash orchestration layer for multi-VM provisioning, saving 10+ hours of manual setup weekly.</li>
                        <li>Built an automated API integration testing framework using Karate, eliminating 15+ hours of manual regression testing per week.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Sep 2020 - Dec 2020",
            content: (
                <div>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-wide mb-2">Undergraduate Teaching Assistant</h3>
                    <p className="text-lg md:text-2xl italic text-synthTeal mb-4">McMaster University • Hamilton, ON, Canada</p>
                    <ul className="list-disc pl-6 text-base md:text-xl font-medium space-y-2">
                        <li>Led technical instruction for 30+ students, architecting and debugging Verilog logic for FPGA integrations.</li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div id="experience" className={`relative w-full pb-20 pointer-events-none scroll-mt-20 ${rajdhani.className}`}>
            <style>{`
                #experience * {
                    font-family: ${rajdhani.style.fontFamily} !important;
                }
                
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