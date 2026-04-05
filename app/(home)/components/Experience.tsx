import { Timeline } from "@/components/ui/timeline";

export default function Experience() {
    const data = [
        {
            title: "May 2025 - Present",
            content: (
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Software Engineer</h3>
                    <p className="text-xl italic text-synthTeal mb-4">Visa Inc. • Bellevue, WA</p>
                    <ul className="list-disc pl-4 text-lg space-y-2">
                        <li>Automated GitHub repository setups with Actions and webhooks, saving 6+ hours weekly.</li>
                        <li>Built security assessment automations in Groovy and Spring Boot, cutting manual checks by 90%.</li>
                        <li>Developed NLP-driven Jira automations to filter unsupported DevOps tickets, saving 40+ hours a week.</li>
                        <li>Created TypeScript deployment automations for Kubernetes, eliminating 25+ hours of manual deployments.</li>
                        <li>Boosted developer velocity by resolving 15+ infrastructure issues weekly across K8s, Jenkins, and GitHub.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Feb 2024 - May 2025",
            content: (
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Software Engineer</h3>
                    <p className="text-xl italic text-synthTeal mb-4">Deloitte • Gilbert, AZ</p>
                    <ul className="list-disc pl-4 text-lg space-y-2">
                        <li>Built front-end features for the Veterans Benefits Management System using React and TypeScript.</li>
                        <li>Integrated auto-refresh capabilities into the Exam Scheduling Assistant, reducing user errors by 15%.</li>
                        <li>Implemented robust autosave mechanics, preventing data loss and boosting claimant efficiency by 30%.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Jun 2022 - Sep 2022",
            content: (
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Software Engineer Intern</h3>
                    <p className="text-xl italic text-synthTeal mb-4">Amazon • Toronto, ON, Canada</p>
                    <ul className="list-disc pl-4 text-lg space-y-2">
                        <li>Designed a Lambda/DynamoDB pipeline processing 1M+ daily global fulfillment events for real-time observability.</li>
                        <li>Engineered a self-healing service using AWS StepFunctions and CloudWatch, reducing production failures by 80%.</li>
                        <li>Streamlined cross-team workflows with TypeScript automations, removing 8+ hours of weekly overhead.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "May 2021 - Apr 2022",
            content: (
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Software Engineer Intern</h3>
                    <p className="text-xl italic text-synthTeal mb-4">SequoiaDB • Markham, ON, Canada</p>
                    <ul className="list-disc pl-4 text-lg space-y-2">
                        <li>Created a Go-based monitoring API for 300+ DB clusters, improving legacy Python service performance by 38%.</li>
                        <li>Architected a Bash orchestration layer for multi-VM provisioning, saving 10+ hours a week.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Sep 2020 - Dec 2020",
            content: (
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Undergraduate Teaching Assistant</h3>
                    <p className="text-xl italic text-synthTeal mb-4">McMaster University • Hamilton, ON, Canada</p>
                    <ul className="list-disc pl-4 text-lg space-y-2">
                        <li>Led technical instruction for 30+ students, architecting and debugging Verilog logic for FPGA integrations.</li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div id="experience" className="relative w-full pb-20 pointer-events-none scroll-mt-20">
            <div className="pointer-events-auto">
                <Timeline data={data} />
            </div>
        </div>
    );
}