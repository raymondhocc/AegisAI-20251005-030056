# Aegis AI

[cloudflarebutton]

Aegis AI is a state-of-the-art, AI-powered general insurance administration platform designed to meet the rigorous IFRS 17 compliance standards of the Hong Kong Insurance Authority. The application streamlines the entire insurance lifecycle through intelligent automation. Key features include: a comprehensive Policy Management module for automated issuance, updates, and renewals; an AI-driven Claims Processing system for rapid submission, verification, and adjudication; and an Automated Underwriting engine that leverages predictive analytics for accurate risk assessment. The platform is enhanced with advanced AI capabilities, including a 24/7 Virtual Assistant for customer inquiries and a real-time Conversational Bot to guide users. A powerful analytics dashboard provides real-time insights into KPIs, while the integrated compliance module ensures continuous adherence to regulatory standards. The entire experience is delivered through a secure, mobile-first, and visually stunning interface designed for ultimate efficiency and user satisfaction.

## Key Features

-   **Policy Management**: Automated, IFRS 17 compliant policy issuance, updates, and renewals.
-   **AI-Powered Claims Processing**: Streamlined claims submission, intelligent verification, and automated adjudication.
-   **Automated Underwriting**: Leverage predictive analytics for accurate, data-driven risk assessment and premium calculation.
-   **Conversational AI**: A 24/7 Virtual Assistant and real-time bot to enhance customer experience and operational efficiency.
-   **Analytics & Reporting**: Real-time dashboards and custom reporting tools for monitoring KPIs and trends.
-   **Compliance Management**: Automated checks, secure document management, and audit trails to ensure regulatory adherence.

## Technology Stack

-   **Frontend**: React, Vite, Tailwind CSS, Shadcn/UI
-   **Backend**: Cloudflare Workers, Hono
-   **Stateful Logic**: Cloudflare Agents (Durable Objects)
-   **UI & Animation**: Framer Motion, Lucide React
-   **Data Visualization**: Recharts
-   **State Management**: Zustand
-   **Language**: TypeScript

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v20.x or later)
-   [Bun](https://bun.sh/) package manager
-   [Git](https://git-scm.com/)
-   A Cloudflare account

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/aegis-ai.git
    cd aegis-ai
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.dev.vars` file in the root of the project for local development. This file is used by `wrangler` to load environment variables.

    ```sh
    cp wrangler.jsonc.example .dev.vars
    ```

    Now, edit `.dev.vars` and add your Cloudflare AI Gateway credentials:
    ```ini
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    **Note**: For production, these variables must be configured as secrets in your Cloudflare Worker's settings.

## Development

To start the local development server, which includes the Vite frontend and a local `workerd` instance for the backend API, run:

```sh
bun run dev
```

This will start the application on `http://localhost:3000` (or the next available port). The frontend will hot-reload on changes, and the worker will restart automatically.

## Deployment

This project is designed for seamless deployment to Cloudflare's global network.

1.  **Authenticate with Wrangler:**
    If this is your first time using Wrangler, you'll need to log in to your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script to build the application and deploy it to Cloudflare.
    ```sh
    bun run deploy
    ```

    Wrangler will handle the process of building the frontend assets, bundling the worker, and deploying everything to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository with a single click.

[cloudflarebutton]

## Project Structure

-   `src/`: Contains all the frontend React application code, including pages, components, hooks, and utility functions.
-   `worker/`: Contains the backend Hono application code that runs on Cloudflare Workers, including API routes, Durable Object classes (`ChatAgent`, `AppController`), and AI integration logic.
-   `wrangler.jsonc`: The configuration file for the Cloudflare Worker, defining bindings, durable objects, and other settings.
-   `vite.config.ts`: Configuration for the Vite frontend build tool.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.