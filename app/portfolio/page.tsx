export const metadata = {
    title: 'Portfolio',
    description: 'My projects and work.',
}

const linkClass = "underline underline-offset-2 decoration-neutral-400 hover:decoration-current transition-all"

export default function Page() {
    return (
        <section>
            <h1 className="font-semibold text-2xl mb-4 tracking-tighter">
                Portfolio
            </h1>
            <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                I like to learn by building.
            </p>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
                <li className="post-link">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">Trustworthy AI Agents for Reinsurance</p>
                    <div className="flex gap-3 mt-1 text-sm">
                        <a href="https://temporal.io/blog/trusting-ai-agents-a-reinsurance-case-study" target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: 'var(--accent)' }}>Blog</a>
                        <a href="https://www.youtube.com/watch?v=NkQ8bA3AcAQ" target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: 'var(--accent)' }}>Demo</a>
                        <a href="https://github.com/sophiabarness/cedant-historical-agent-public" target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: 'var(--accent)' }}>Code</a>
                    </div>
                </li>
                <li className="post-link">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">Wildfire Real-time Visibility and Response on AWS AgentCore</p>
                    <div className="flex gap-3 mt-1 text-sm">
                        <a href="https://github.com/sophiabarness/wfm-agentcore-poc" target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: 'var(--accent)' }}>Code</a>
                    </div>
                </li>
                <li className="post-link">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{"Serverless Broker for Tor's Snowflake Censorship Circumvention"}</p>
                    <div className="flex gap-3 mt-1 text-sm">
                        <a href="https://github.com/larafranciulli/snowflake-barebones-broker" target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: 'var(--accent)' }}>Code</a>
                        <a href="https://github.com/larafranciulli/snowflake-barebones-broker/blob/main/BarebonesBroker.pdf" target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: 'var(--accent)' }}>Paper</a>
                    </div>
                </li>
                <li className="post-link">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">Websocket-based Multi-player Dandelion Game</p>
                    <div className="flex gap-3 mt-1 text-sm">
                        <a href="https://github.com/sophiabarness/DandelionsV2Backend" target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: 'var(--accent)' }}>Code</a>
                    </div>
                </li>
            </ul>
        </section>
    )
}
