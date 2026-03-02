# Sophia Barnes — Personal Website

A minimalist, high-performance personal website built with Next.js 16 and Tailwind CSS 4. This site features a custom AI agent designed to help visitors learn about my background, projects, and career interests.

## 🚀 Key Features

- **AI Agent Interface**: A conversational interface powered by the **Vercel AI SDK** and the **Braintrust AI Gateway**.
- **Direct Messaging**: A custom-built contact form that integrates directly into the chat flow via Resend.
- **Project Portfolio**: A clean, showcase of my technical work with deep-links to demos and repositories.
- **Glassmorphism UI**: A modern, premium aesthetic with smooth animations and dark mode support.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Infrastructure**:
  - [Vercel AI SDK](https://sdk.vercel.ai/docs) (React & Core)
  - [Braintrust](https://www.braintrust.dev/) (AI Gateway & Observability)
- **Communications**: [Resend](https://resend.com/) for email delivery
- **Deployment**: [Vercel](https://vercel.com/)

## ⚙️ Development Setup

### Prerequisites

You will need the following environment variables. Create a `.env.local` file in the root directory:

```bash
# Braintrust API Key for the AI Gateway
BRAINTRUST_API_KEY=your_braintrust_key

# Resend API Key for the contact form
RESEND_API_KEY=re_your_resend_key
```

### Running Locally

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📦 Deployment to Vercel

This site is optimized for one-click deployment to Vercel. 

1.  Connect your GitHub repository to Vercel.
2.  Add your `BRAINTRUST_API_KEY` and `RESEND_API_KEY` in the Vercel Project Settings.
3.  Deploy!

## 📄 License

MIT © [Sophia Barnes](https://sonya.dev)
