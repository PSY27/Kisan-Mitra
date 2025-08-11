# Kissan Mitra (Farmer's Friend)

An AI-powered agricultural assistant designed to help Indian farmers with personalized advice and information via voice, chat, and phone interfaces.

## Overview

Kissan Mitra is a comprehensive agricultural AI system that uses advanced technologies like vector databases, knowledge graphs, and large language models to provide farmers with timely and accurate information about:

- Weather forecasts and irrigation timing
- Crop recommendations based on soil and season
- Market price information and selling advice
- Pest and disease management
- Government schemes and financial assistance

The system is designed to be accessible to farmers across India with support for multiple languages including Hindi, English, Tamil, Telugu, Bengali, and Marathi.

## Architecture

The system employs a serverless, event-driven architecture with the following key components:

```
┌───────────────┐     ┌────────────────┐     ┌─────────────────┐
│   Farmer      │     │  Voice/Phone   │     │   OpenAI Voice  │
│  Phone Call   │────>│    Gateway     │────>│      Agent      │
└───────────────┘     └────────────────┘     └─────────────────┘
                                                     │
                                                     ▼
┌───────────────┐                           ┌─────────────────┐
│   Knowledge   │<--------------------------│    Agent Tool   │
│  Integration  │                           │    Functions    │
└───────────────┘                           └─────────────────┘
        │                                             │
        ▼                                             ▼
┌───────────────┐     ┌────────────────┐     ┌─────────────────┐
│Vector Database│     │ Knowledge Graph│     │  Time Series    │
│  (DynamoDB)   │     │   (DynamoDB)   │     │   Database      │
└───────────────┘     └────────────────┘     └─────────────────┘
        ▲                     ▲                       ▲
        │                     │                       │
        └─────────────────────┼───────────────────────┘
                              │
                              ▼
                      ┌────────────────┐
                      │Data Processing │
                      │    Lambda      │
                      └────────────────┘
                              │
                              ▼
                      ┌────────────────┐
                      │ External APIs  │
                      │(Weather, Market│
                      │ Govt Schemes)  │
                      └────────────────┘
```

### Core Components

1. **Voice/Phone Gateway**: Handles incoming voice requests and forwards audio streams
2. **OpenAI Voice Agent**: Manages conversations, understands farmer queries, and provides natural responses
3. **Agent Tool Functions**: Implements specialized functions for retrieving data and answering questions
4. **Knowledge Integration**:
   - **Vector Database**: Stores embeddings for semantic search of agricultural knowledge
   - **Knowledge Graph**: Represents relationships between crops, diseases, locations, etc.
   - **Time Series Database**: Stores temporal data like weather forecasts and market prices
5. **Data Processing**: Collects and transforms data from external sources
6. **External APIs**: Interfaces with weather services, market data, and government databases

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- AWS Account (for DynamoDB)
- OpenAI API Key
- Twilio Account (for phone integration)

### Environment Setup

1. Clone the repository
```bash
git clone https://github.com/your-org/kissan-mitra.git
cd kissan-mitra
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the project root with the following variables:
```
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# DynamoDB Tables
VECTOR_DB_TABLE_NAME=KissanMitraVectorDB
KNOWLEDGE_GRAPH_TABLE_NAME=KissanMitraKnowledgeGraph
TIME_SERIES_TABLE_NAME=KissanMitraTimeSeries

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4
OPENAI_VOICE_ID=nova

# Twilio Configuration (for phone calls)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone

# Application Configuration
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

# Development Settings
MOCK_EMBEDDINGS=true
```

### Local Development

1. Create required DynamoDB tables (one-time setup)
```bash
npm run setup-db
```

2. Seed the databases with initial data
```bash
npm run seed-data
```

3. Start the development server
```bash
npm run dev
```

4. Access the web interface at http://localhost:3000

### Testing

Run the test suite:
```bash
npm test
```

## Project Structure

```
├── public/             # Static web assets
├── src/
│   ├── agent/          # AI agent implementation
│   │   └── tool-functions.ts    # Functions called by the AI agent
│   ├── chat/           # Chat interface implementation
│   │   └── routes.ts   # API routes for chat interface
│   ├── data/           # Data layer
│   │   ├── knowledge-graph.ts   # Knowledge graph implementation
│   │   ├── time-series.ts       # Time series database implementation
│   │   └── vector-db.ts         # Vector database implementation
│   ├── scripts/        # Utility scripts
│   │   └── seed-database.ts     # Database seeding script
│   ├── utils/          # Helper utilities
│   │   └── seed-data.ts         # Sample data for seeding
│   ├── voice/          # Voice interface implementation
│   │   ├── call-manager.ts      # Call session management
│   │   ├── openai-voice.ts      # OpenAI voice agent integration
│   │   ├── routes.ts            # API routes for voice interface
│   │   ├── twilio-handler.ts    # Twilio integration
│   │   └── types.ts             # Type definitions for voice integration
│   ├── app.ts          # Express app configuration
│   ├── config.ts       # Application configuration
│   └── index.ts        # Application entry point
├── test/               # Test suite
├── .env                # Environment variables
├── .env.template       # Template for environment variables
├── package.json        # Project metadata and dependencies
└── tsconfig.json       # TypeScript configuration
```

## Features

### 1. Multilingual Voice Interface

The system supports conversations in multiple Indian languages:
- English (en-IN)
- Hindi (hi-IN)
- Tamil (ta-IN)
- Telugu (te-IN)
- Bengali (bn-IN)
- Marathi (mr-IN)

### 2. Knowledge Graph for Intelligent Recommendations

The knowledge graph stores relationships between:
- Crops and suitable locations
- Crops and growing seasons
- Crops and diseases/pests
- Diseases and treatments
- And many more agricultural relationships

This enables the system to make intelligent recommendations based on multiple factors, such as suggesting crops that are suitable for both the farmer's location and the current season.

### 3. Contextual Information Retrieval

The vector database stores agricultural knowledge with semantic search capabilities, allowing the system to find relevant information even when farmers use different terminology or phrasings.

### 4. Time-Series Data for Forecasts and Trends

The time-series database tracks historical and predicted data for:
- Weather conditions (temperature, rainfall, humidity)
- Market prices for crops
- Pest/disease prevalence

This enables trend analysis and forecasting to help farmers make informed decisions.

### 5. Multi-Channel Access

Farmers can access Kissan Mitra through:
- Web interface with chat
- Voice interface using a microphone
- Phone calls to a dedicated number

## Deployment

### AWS Deployment

1. Set up the required AWS services:
   - Lambda for serverless functions
   - DynamoDB for data storage
   - API Gateway for REST APIs
   - S3 for static website hosting

2. Deploy the application:
```bash
npm run deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was built as part of the Agricultural AI Hackathon 2025.
- Special thanks to the agricultural experts who contributed domain knowledge.
- Powered by OpenAI's language and voice models.
