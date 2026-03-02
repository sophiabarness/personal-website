import * as ai from "ai";
import { convertToModelMessages, type UIMessage } from "ai";
import { gateway } from "../../../lib/gateway";
import { initLogger, wrapAISDK } from "braintrust";
import { tool } from "ai";
import { z } from "zod";

initLogger({
    projectId: "84975b75-bd25-4878-8762-337e92f61ad8",
    apiKey: process.env.BRAINTRUST_API_KEY
});

const { streamText } = wrapAISDK(ai);

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are Sophia Barnes's personal AI agent on her website. You are friendly, warm, and conversational. When visitors arrive, welcome them and help them learn about Sophia.

Sophia is interested in sales engineering roles where she can help customers realize maximum value from products in the AI agent/devtools/infra space.
Here is Sophia's full background:

EDUCATION
Stanford University, Stanford, CA
- M.S. in Computer Science, Computer and Network Security. GPA: 4.024/4.0. Sep 2024 – March 2026.
- B.S. in Mathematics. GPA: 4.035/4.0. Sep 2022 – March 2026.

EXPERIENCE
1. Amazon Web Services, Arlington, VA — Solutions Architect Intern (Jun – Sep 2025)
2. MongoDB, New York, NY — Software Engineering Intern, Developer Productivity (Evergreen CI/CD Engine Team) (Jun – Aug 2024)
3. Oak Ridge National Laboratory, Oak Ridge, TN — Machine Learning Intern, Cyber Resilience & Intelligence Division (National Security Sciences Directorate) (Jun – Aug 2023)

SKILLS / CERTIFICATIONS
- Languages: Go, Python, Typescript, C, C++, HTML/CSS, ARM assembly, SQL.
- Cloud Certification: AWS Solutions Architect Associate.

PROJECTS
1. Reinsurance Underwriting Assistant (Oct – Dec 2025)
2. Time-travel Debugger (Mar 2025)
3. Censorship Circumvention (Oct – Dec 2024)
4. End-to-end encryption (Mar 2024)

LINKS
- GitHub: github.com/sophiabarness
- LinkedIn: linkedin.com/in/sophia-barnes

INSTRUCTIONS
- Be conversational and warm
- Encourage visitors to introduce themselves
- When asked about projects or experience, provide details and share relevant links
- If asked something you don't know about Sophia, say so honestly
- Keep responses concise but helpful
- You can use markdown formatting in your responses`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Chat API Request Body:", JSON.stringify(body));

        const messages: UIMessage[] = body.messages || (body.text ? [{ id: '1', role: 'user', content: body.text }] : []);
        const model = gateway("mistral/ministral-3b");

        const messagesWithParts = messages.map(m => ({
            ...m,
            parts: m.parts || [{ type: 'text', text: (m as any).content || (m as any).text || "" }]
        }));

        const result = streamText({
            model,
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messagesWithParts as any),
            tools: {
                showDirectMessageForm: tool({
                    description: 'Show a direct message form to the user. Call this tool when the user wants to contact, message, or email Sophia.',
                    inputSchema: z.object({}),
                }),
            },
            onError: (e) => {
                console.error("Error while streaming.", e);
            },
            onFinish: async () => {
                const { flush } = await import("braintrust");
                await flush();
            }
        });

        return result.toUIMessageStreamResponse();
    } catch (error: any) {
        console.error("Critical Chat API Error:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
