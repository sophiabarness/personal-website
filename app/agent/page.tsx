'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { DirectMessageForm } from './DirectMessageForm'

export default function AgentPage() {
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { messages, sendMessage, status, error, addToolResult } = useChat()

    useEffect(() => {
        console.log("Current Messages:", messages);
    }, [messages]);

    const isStreaming = status === 'streaming'
    const hasMessages = messages.length > 0

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isStreaming) return
        sendMessage({ text: input })
        setInput('')
    }

    return (
        <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {!hasMessages && (
                <div className="flex-1 flex flex-col items-center justify-center px-4 fade-in">
                    <div className="w-full max-w-2xl text-center space-y-8">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Introduce yourself, learn more about Sophia, or send her a DM.
                        </p>
                        <div className="w-full fade-in-delay-1">
                            <form onSubmit={handleSubmit}>
                                <div className="glass-input flex items-center gap-3 p-4 rounded-2xl transition-all duration-200">
                                    <input
                                        name="prompt"
                                        placeholder="Say hello..."
                                        onChange={(e) => setInput(e.target.value)}
                                        value={input}
                                        autoFocus
                                        autoComplete="off"
                                        className="flex-1 bg-transparent text-base outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                                        onKeyDown={(e) => {
                                            if (e.metaKey && e.key === 'Enter') {
                                                handleSubmit(e)
                                            }
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim()}
                                        className="h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-150 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                                        style={{ color: 'var(--accent)' }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {hasMessages && (
                <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full fade-in overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-2 py-4 hide-scrollbar">
                        <div className="flex flex-col gap-5">
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`message-in ${m.role === 'user'
                                        ? 'bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 rounded-2xl p-3 md:p-4 ml-auto max-w-[85%] font-medium text-sm'
                                        : 'max-w-[90%] text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm'
                                        }`}
                                >
                                    {m.parts.map((part, i) => {
                                        if (part.type === 'text') {
                                            return m.role === 'assistant' ? (
                                                <div key={`${m.id}-${i}`} className="markdown-content">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {part.text}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <div key={`${m.id}-${i}`} className="whitespace-pre-wrap">
                                                    {part.text}
                                                </div>
                                            )
                                        }

                                        if (part.type === 'tool-invocation' || part.type.startsWith('tool-')) {
                                            const invocation = part as any;
                                            // Handle both old and new tool call structures
                                            const toolInvocation = invocation.toolInvocation || invocation;
                                            const toolName = toolInvocation.toolName || (part.type.startsWith('tool-') ? part.type.slice(5) : null);

                                            if (toolName === 'showDirectMessageForm') {
                                                const ti = toolInvocation;
                                                return (
                                                    <div key={`${m.id}-${i}`} className="mt-4">
                                                        {ti.state === 'result' ? (
                                                            <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-xl text-sm border border-green-500/20">
                                                                Message sent successfully!
                                                            </div>
                                                        ) : (
                                                            <DirectMessageForm
                                                                onSend={() => {
                                                                    addToolResult({
                                                                        toolCallId: ti.toolCallId || ti.id,
                                                                        result: { success: true }
                                                                    } as any);
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            }
                                        }

                                        return null
                                    })}
                                </div>
                            ))}

                            {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
                                <div className="message-in max-w-[90%] text-sm text-neutral-400">
                                    <span className="inline-flex gap-1.5 items-center">
                                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent)', animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent)', animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent)', animationDelay: '300ms' }} />
                                    </span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="max-w-2xl mx-auto w-full px-4 pb-4 fade-in">
                    <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(220, 38, 38, 0.08)', color: '#dc2626' }}>
                        Something went wrong. Please try again.
                    </div>
                </div>
            )}

            {hasMessages && (
                <div className="w-full max-w-2xl mx-auto pb-6">
                    <form onSubmit={handleSubmit}>
                        <div className="glass-input flex items-center gap-3 p-4 rounded-2xl transition-all duration-200">
                            <input
                                name="prompt"
                                placeholder="Ask a question..."
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                autoComplete="off"
                                className="flex-1 bg-transparent text-base outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 font-medium"
                                onKeyDown={(e) => {
                                    if (e.metaKey && e.key === 'Enter') {
                                        handleSubmit(e)
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isStreaming}
                                className="h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-150 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                                style={{ color: 'var(--accent)' }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
