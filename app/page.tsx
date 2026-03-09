import Image from 'next/image'

export default function Page() {
    return (
        <section>
            <div className="fade-in flex items-center gap-5 mb-6">
                <Image
                    src="/profile.jpg"
                    alt="Sophia Barnes"
                    width={150}
                    height={150}
                    className="rounded-full"
                    priority
                />
                <div>
                    <h1 className="mb-2 text-3xl font-semibold tracking-tight">
                        Sophia Barnes
                    </h1>
                    <div className="gradient-bar w-24" />
                </div>
            </div>
            <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed fade-in-delay-1">
                Welcome! I'm <span className="font-semibold italic" style={{ color: 'var(--accent)' }}>Sophia</span>.
            </p>
            <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed fade-in-delay-2">
                {`I’m a student at Stanford graduating in March 2026 with my master’s in Computer Science and bachelor’s in Math. I'm interested in sales engineering/forward deployed roles where I can help customers realize maximum value from products in the AI agent/devtools/infra space.`}
            </p>
            <div className="fade-in-delay-3">
                <h2 className="mb-4 text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                    A sampling of what I've worked on
                </h2>
                <ul className="mb-6 space-y-2 text-neutral-700 dark:text-neutral-300 list-disc pl-6">
                    <li>Automating reinsurance spreadsheet processing with AI agents</li>
                    <li>Accelerating wildfire detection and incident response via AI agents for California utilities (AWS)</li>
                    <li>Architecting robust censorship circumvention via lightweight snowflake proxies</li>
                    <li>Building easy-to-use developer tooling and continuous integration (MongoDB)</li>
                </ul>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    <a href="/agent" className="underline underline-offset-2 decoration-neutral-400 hover:decoration-current transition-all" style={{ color: 'var(--accent)' }}>Chat with my agent</a> to introduce yourself, learn more about me, or send me a DM.
                </p>
            </div>
        </section>
    )
}
