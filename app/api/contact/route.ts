import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email, message } = await req.json();

        if (!email || !message) {
            return Response.json({ error: 'Email and message are required' }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', // Resend free tier requires sending from their testing domain
            to: ['animalsnow750@yahoo.com'],
            subject: `New Direct Message from ${email} via Agent`,
            text: `You have received a new message from ${email}:\n\n${message}`,
            replyTo: email,
        });

        if (data.error) {
            console.error("Resend error:", data.error);
            return Response.json({ error: data.error.message }, { status: 500 });
        }

        return Response.json({ success: true, id: data.data?.id });
    } catch (error) {
        console.error("API error:", error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
