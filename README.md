# MCP Integration Challenge: Proxy & RAG Foundations

## AI Protocol Engineer Challenge: Week 1

This repository contains the complete implementation for the MCP Integration, Proxy & RAG Foundations challenge using **TypeScript/NodeJS with LangGraph.js**.

## Project Overview

This project implements a comprehensive MCP (Model Context Protocol) ecosystem including:

- **MCP Proxy Server**: Routes requests to multiple downstream MCP servers
- **Dev Assistant Agent**: LangGraph.js-based agent with RAG capabilities  
- **Mock Knowledge Base**: Sample data for testing RAG functionality
- **MCP Client Tester**: Testing tools for MCP server interactions
- **IDE Integration**: Configuration for VS Code/Cursor MCP support

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   IDE Client   │ ──▶│   MCP Proxy      │ ──▶│ Downstream MCP  │
│ (VS Code/Cursor)│    │     Server       │    │    Servers      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       │
                       ┌──────────────────┐             │
                       │ Dev Assistant    │             │
                       │    Agent         │             │
                       │ (LangGraph.js)   │             │
                       └──────────────────┘             │
                                │                       │
                                ▼                       │
                       ┌──────────────────┐             │
                       │  RAG Pipeline    │             │
                       │ (LangChain JS)   │             │
                       └──────────────────┘             │
                                │                       │
                                ▼                       │
                       ┌──────────────────┐             │
                       │ Mock Knowledge   │◀────────────┘
                       │     Base         │
                       └──────────────────┘
```

## Project Structure

```
mcp/
├── src/
│   ├── proxy/           # MCP Proxy Server implementation
│   ├── agent/           # Dev Assistant Agent with LangGraph.js
│   ├── rag/             # RAG setup and utilities
│   ├── client/          # MCP Client testing tools
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Shared utilities
├── tests/               # Unit and integration tests
├── docs/                # Documentation
│   ├── protocols_understanding.md
│   ├── mcp_server_exploration.md
│   ├── advanced_mcp_concepts.md
│   ├── realtime_rag_notes.md
│   └── ide_mcp_integration.md
├── mock_knowledge_base/ # Sample data for RAG
│   ├── docs/
│   ├── code/
│   ├── tickets/
│   └── jira_tickets.json
├── package.json
├── tsconfig.json
└── README.md
```

## Technology Stack

### Core Technologies
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.5+
- **Agent Framework**: LangGraph.js
- **RAG Framework**: LangChain JS

### Dependencies
- **Protocol Communication**: Built-in fetch, axios
- **Agent Building**: @langchain/langgraph
- **RAG Components**: @langchain/community, langchain
- **Web Framework**: Express.js
- **Testing**: Vitest
- **Development**: tsx, eslint, prettier

## Quick Start

### Prerequisites
- Node.js 18 or later
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/mcp.git
cd mcp
```

2. **Install dependencies**:
```bash
npm install --legacy-peer-deps
```

3. **Build the project**:
```bash
npm run build
```

4. **Run tests**:
```bash
npm test
```

## Running Components

### 1. MCP Proxy Server
```bash
npm run proxy:start
# Starts on http://localhost:8002
```

### 2. Dev Assistant Agent
```bash
npm run agent:start
```

### 3. MCP Client Tester
```bash
npm run client:test
```

### 4. Development Mode (Watch)
```bash
npm run dev
```

## Environment Setup

### Required Environment Variables
Create a `.env` file in the root directory:

```env
# OpenAI API Key (for LangChain)
OPENAI_API_KEY=your_openai_api_key

# GitHub Token (for GitHub MCP server)
GITHUB_TOKEN=your_github_token

# Google Drive Credentials (for GDrive MCP server)
GOOGLE_DRIVE_CLIENT_ID=your_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret

# Atlassian Credentials (for Atlassian MCP server)
ATLASSIAN_API_TOKEN=your_atlassian_token
ATLASSIAN_INSTANCE_URL=your_instance_url

# Proxy Configuration
PROXY_PORT=8002
PROXY_HOST=localhost

# Logging
LOG_LEVEL=info
```

## MCP Server Configuration

The proxy server can route to multiple downstream MCP servers:

### Supported Servers
- **Filesystem**: Local file system access
- **GitHub**: Repository and issue management
- **Google Drive**: Document access and management
- **Atlassian**: JIRA and Confluence integration

### Proxy Routing Configuration
```typescript
// src/proxy/config.ts
export const serverRoutes = {
  'filesystem': 'http://localhost:8001',
  'github': 'http://localhost:8003', 
  'gdrive': 'http://localhost:8004',
  'atlassian': 'http://localhost:8005'
};
```

## IDE Integration

### VS Code Setup
1. Install the Copilot Chat extension
2. Add to your `settings.json`:
```json
{
  "github.copilot.chat.mcp.include": [
    "http://localhost:8002/mcp"
  ]
}
```

### Cursor Setup
1. Open Cursor settings
2. Add MCP server URL: `http://localhost:8002/mcp`

## Testing

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
npm run test:proxy      # Proxy server tests
npm run test:agent      # Agent tests
npm run test:rag        # RAG pipeline tests
npm run test:client     # Client tests
```

### Test Coverage
```bash
npm run test:coverage
```

## Documentation

- **[Protocols Understanding](docs/protocols_understanding.md)**: MCP and A2A protocol explanation
- **[MCP Server Exploration](docs/mcp_server_exploration.md)**: Target server analysis
- **[Advanced MCP Concepts](docs/advanced_mcp_concepts.md)**: Gateway, RBAC, and streaming concepts
- **[Real-time RAG Notes](docs/realtime_rag_notes.md)**: Pathway and real-time indexing concepts
- **[IDE Integration Guide](docs/ide_mcp_integration.md)**: Step-by-step IDE setup

## Development Workflow

### Code Style
- ESLint for linting
- Prettier for formatting
- TypeScript strict mode enabled

### Git Workflow
```bash
# Format code
npm run format

# Lint code  
npm run lint

# Run tests before commit
npm test

# Build before push
npm run build
```

## Features Implemented

### ✅ Task 1: Environment Setup & Protocol Study
- [x] TypeScript/NodeJS environment with LangGraph.js
- [x] Mock knowledge base structure
- [x] Comprehensive MCP/A2A protocol documentation
- [x] Target MCP server analysis

### 🔄 Upcoming Tasks
- [ ] Task 2: Explore & Test Existing MCP Servers
- [ ] Task 3: Design & Implement MCP Proxy Server  
- [ ] Task 4: Implement Basic RAG Agent with MCP Integration
- [ ] Task 5: Research Advanced MCP Concepts
- [ ] Task 6: Test MCP Proxy with IDE Integration
- [ ] Task 7: Documentation & Stand-up Preparation

## Troubleshooting

### Common Issues

1. **Dependency conflicts**: Use `npm install --legacy-peer-deps`
2. **TypeScript errors**: Ensure TypeScript 5.5+ is installed
3. **Build failures**: Check Node.js version (18+ required)
4. **Test failures**: Verify environment variables are set

### Getting Help

1. Check the [documentation](docs/) for detailed guides
2. Review the [protocols understanding](docs/protocols_understanding.md) document
3. Examine test files for usage examples
4. Check GitHub issues for known problems

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and add tests
4. Run `npm test` and `npm run lint`
5. Commit changes: `git commit -m 'Add new feature'`
6. Push to branch: `git push origin feature/new-feature`
7. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on GitHub. 