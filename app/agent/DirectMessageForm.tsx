import { useState } from 'react';

export function DirectMessageForm({ onSend }: { onSend?: (message: string) => void }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !message.trim()) return;

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            if (onSend) {
                onSend('Message sent successfully!');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again later.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-neutral-900/5 dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-6 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Message Sent!</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Thanks for reaching out! Sophia will get back to you soon.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 rounded-2xl shadow-sm my-4 w-full max-w-[400px]">
            <div className="mb-4">
                <h3 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    Contact Sophia
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Send a direct message straight to her inbox.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-neutral-700 dark:text-neutral-300 ml-1">
                        Your Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading'}
                        className="w-full bg-neutral-100 dark:bg-neutral-800 border border-transparent dark:border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-400"
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-neutral-700 dark:text-neutral-300 ml-1">
                        Message
                    </label>
                    <textarea
                        id="message"
                        required
                        placeholder="Hi Sophia, I'd love to chat about..."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={status === 'loading'}
                        className="w-full bg-neutral-100 dark:bg-neutral-800 border border-transparent dark:border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-neutral-400 resize-none"
                    />
                </div>

                {status === 'error' && (
                    <div className="text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                        {errorMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading' || !email.trim() || !message.trim()}
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'var(--accent)' }}
                >
                    {status === 'loading' ? (
                        <>
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
        </div>
    );
}
