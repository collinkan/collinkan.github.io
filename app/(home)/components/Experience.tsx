import { Timeline } from "@/components/ui/timeline";
import { Metrics } from "@/components/ui/metrics";

import { Rajdhani } from "next/font/google";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

type Job = {
    dates: string;
    role: string;
    company: string;
    location: string;
    bullets: string[];
};

// Source of truth: Resume_Sept_09232026.pdf
const jobs: Job[] = [
    {
        dates: "May 2025 - Present",
        role: "Software Engineer",
        company: "Visa Inc.",
        location: "Bellevue, WA",
        bullets: [
            "Built a foundational dependency mapper using C and eBPF, tracing 3.8 TB/day of service traffic across 8 Kubernetes clusters. Adopted org-wide as the source of truth for dependency mapping and RCA validation.",
            "Built an AI agent with Python, Prometheus, and LangGraph that analyzes usage across 50+ services and opens owner-reviewed PRs to tune requests and limits, cutting compute spend by $135k/yr with zero SLO regressions.",
            "Co-built a remediation agent that diagnoses pod failures and applies fixes through the K8s API, using RAG and requiring HITL for risky actions, auto-resolved 43% of pod incidents and cut MTTR from 54 to 30 min.",
            "Co-led a hermetic testing platform with WireMock for 50+ K8s microservices using dependency data from the eBPF map, cutting dependency-related test failures by 97%, saving $325k annually in QA environment costs.",
            "Standardized CI/CD across 100+ repositories by building a self-service provisioning pipeline in GitHub Actions, reclaiming 300+ engineering hours per year and eliminating manual onboarding setup.",
            "Co-built a Spring Boot service that auto-populates security assessment forms from CI/CD, Jira, and GitHub data via MCP integrations, reducing manual review effort by 90%.",
        ],
    },
    {
        dates: "Feb 2024 - May 2025",
        role: "Software Engineer",
        company: "Deloitte",
        location: "Gilbert, AZ",
        bullets: [
            "Cut production incident root-cause time by 50% by instrumenting client-side telemetry and structured error logging across downstream API integrations, giving the team end-to-end observability into failures.",
            "Reduced data staleness errors by 15% by engineering an asynchronous, real-time synchronization pipeline that kept client and server state consistent for the Exam Scheduling Assistant.",
            "Increased claimant task completion by 30% by building session recovery and autosave in React and TypeScript that preserved user state through network disruptions.",
            "Partnered with stakeholders to migrate legacy Veterans Benefits Management System interfaces into a decoupled, modular React application, improving long-term maintainability.",
        ],
    },
    {
        dates: "Jun 2022 - Sep 2022",
        role: "Software Engineer Intern",
        company: "Amazon",
        location: "Toronto, ON, Canada",
        bullets: [
            "Designed a high-throughput, event-driven pipeline on AWS Lambda and DynamoDB processing 1M+ daily fulfillment-center events across NA, EU, and JP with global data consistency.",
            "Reduced application failures by 80% and response time by 40% by building a self-healing service with AWS Step Functions and CloudWatch that detects and auto-remediates runtime errors.",
        ],
    },
    {
        dates: "May 2021 - Apr 2022",
        role: "Software Engineer Intern",
        company: "SequoiaDB",
        location: "Markham, ON, Canada",
        bullets: [
            "Improved service runtime by 38% by migrating legacy Python services to Go and building a high-performance Go monitoring API that aggregates crash telemetry across 300+ distributed database clusters.",
            "Eliminated 15+ hours of weekly manual regression testing by building an automated integration-testing framework in Karate that enforces strict data-contract validation on a customer-facing Java API.",
            "Saved 10+ engineering hours per week by building a Bash orchestration layer that automates provisioning of multi-VM test environments.",
        ],
    },
]

const BULLET =
    "relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-synthTeal before:shadow-[0_0_8px_rgba(45,226,230,0.8)] before:content-['']";

export default function Experience() {
    const data = jobs.map((job) => ({
        title: job.dates,
        content: (
            <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-white">{job.role}</h3>
                <p className="mb-5 border-b border-white/10 pb-4 text-lg md:text-xl tracking-wide">
                    <span className="font-semibold text-synthTeal">{job.company}</span>
                    <span className="text-synthText/60"> · {job.location}</span>
                </p>
                <ul className="list-none max-w-[70ch] space-y-4 text-lg md:text-xl font-medium leading-[1.6] text-synthText/90">
                    {job.bullets.map((bullet) => (
                        <li key={bullet} className={BULLET}>
                            <Metrics>{bullet}</Metrics>
                        </li>
                    ))}
                </ul>
            </div>
        ),
    }));

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
