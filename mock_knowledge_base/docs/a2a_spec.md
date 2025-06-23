# Agent-to-Agent (A2A) Protocol Specification

This document provides a comprehensive specification for the Agent-to-Agent (A2A) protocol within the NexusAI ecosystem.

## Overview

The Agent-to-Agent (A2A) protocol enables different AI agents to communicate, collaborate, and orchestrate complex workflows across distributed systems. While MCP focuses on agent-to-tool communication, A2A handles agent-to-agent interactions.

## Protocol Foundation

### Transport Layer
- **Primary**: HTTP/HTTPS with REST-like endpoints
- **Real-time**: WebSockets for persistent connections
- **Asynchronous**: Server-Sent Events (SSE) for push notifications
- **Fallback**: HTTP long-polling

### Message Format
Based on JSON-RPC 2.0 with A2A-specific extensions:

```json
{
  "jsonrpc": "2.0",
  "method": "agent.task.execute",
  "params": {
    "task_id": "task_123",
    "agent_id": "agent_456",
    "context": {...},
    "metadata": {...}
  },
  "id": "req_001"
}
```

## Core Concepts

### Agent Discovery
Agents register themselves with discovery service and publish "Agent Cards":

```json
{
  "agent_id": "dev-assistant-v1",
  "name": "Development Assistant",
  "description": "AI assistant for software development tasks",
  "version": "1.0.0",
  "capabilities": [
    "code_review",
    "documentation_generation", 
    "bug_analysis",
    "test_generation"
  ],
  "endpoints": {
    "primary": "https://dev-assistant.nexusai.com/a2a",
    "websocket": "wss://dev-assistant.nexusai.com/ws"
  },
  "supported_protocols": ["a2a-v1", "a2a-v2"],
  "authentication": {
    "type": "oauth2",
    "token_endpoint": "https://auth.nexusai.com/token"
  }
}
```

### Communication Patterns

#### 1. Request-Response Pattern
Synchronous communication for immediate results:

```json
{
  "method": "agent.analyze.code",
  "params": {
    "source_code": "function example() { ... }",
    "language": "javascript",
    "analysis_type": "quality"
  }
}
```

#### 2. Event-Driven Pattern
Asynchronous notifications using SSE:

```json
{
  "event": "task.completed",
  "data": {
    "task_id": "task_123",
    "result": {...},
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### 3. Workflow Orchestration Pattern
Multi-agent collaboration:

```json
{
  "method": "workflow.execute",
  "params": {
    "workflow_id": "code-review-pipeline",
    "steps": [
      {
        "agent": "static-analyzer",
        "action": "analyze_code",
        "depends_on": []
      },
      {
        "agent": "security-scanner", 
        "action": "scan_vulnerabilities",
        "depends_on": ["static-analyzer"]
      },
      {
        "agent": "documentation-generator",
        "action": "update_docs",
        "depends_on": ["static-analyzer", "security-scanner"]
      }
    ]
  }
}
```

## Security Model

### Authentication & Authorization
- **OAuth 2.1** with PKCE for secure authentication
- **OpenID Connect** for identity verification
- **JWT tokens** for session management
- **mTLS** for service-to-service communication

### Security Considerations (NEX-789)

#### Authentication Options
1. **OAuth 2.1 + PKCE**
   - Most secure for client-to-agent communication
   - Prevents authorization code interception
   - Supports refresh tokens for long-lived sessions

2. **Client Credentials Flow**
   - Service-to-service authentication
   - Suitable for backend agent communication
   - Scoped permissions for specific operations

3. **Mutual TLS (mTLS)**
   - Certificate-based authentication
   - Strong identity verification
   - Network-level security

#### Authorization Framework
- **Role-Based Access Control (RBAC)**
- **Attribute-Based Access Control (ABAC)** for complex scenarios
- **Scope-based permissions** for granular access control

Example scope definitions:
```
agent:read          # Read agent capabilities
agent:execute       # Execute agent methods  
workflow:create     # Create new workflows
workflow:monitor    # Monitor workflow execution
task:assign        # Assign tasks to agents
```

### Message Integrity
- **Digital signatures** using Ed25519 for message authenticity
- **Message encryption** using AES-256-GCM for sensitive data
- **Request correlation IDs** for tracking and auditing

## Protocol Methods

### Core Agent Methods

#### 1. Capability Discovery
```json
{
  "method": "agent.discover",
  "params": {
    "capability_filter": ["code_analysis", "documentation"]
  }
}
```

#### 2. Task Delegation
```json
{
  "method": "agent.delegate",
  "params": {
    "target_agent": "specialist-agent-id",
    "task": {...},
    "priority": "high",
    "deadline": "2024-01-15T18:00:00Z"
  }
}
```

#### 3. Status Monitoring
```json
{
  "method": "agent.status",
  "params": {
    "agent_id": "target-agent",
    "include_health": true,
    "include_workload": true
  }
}
```

### Workflow Methods

#### 1. Workflow Creation
```json
{
  "method": "workflow.create",
  "params": {
    "name": "Code Review Pipeline",
    "description": "Automated code review process",
    "steps": [...],
    "triggers": ["pull_request_opened"],
    "timeout": "30m"
  }
}
```

#### 2. Workflow Execution
```json
{
  "method": "workflow.execute",
  "params": {
    "workflow_id": "workflow_123",
    "input_data": {...},
    "execution_mode": "async"
  }
}
```

## Error Handling

### Standard Error Codes
Based on JSON-RPC 2.0 with A2A extensions:

| Code | Message | Description |
|------|---------|-------------|
| -32700 | Parse error | Invalid JSON |
| -32600 | Invalid Request | Malformed request |
| -32601 | Method not found | Unknown method |
| -32602 | Invalid params | Invalid parameters |
| -32603 | Internal error | Server error |
| -40001 | Agent not found | Target agent unavailable |
| -40002 | Authorization failed | Insufficient permissions |
| -40003 | Workflow failed | Workflow execution error |
| -40004 | Timeout | Request timeout |

### Error Response Format
```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -40001,
    "message": "Agent not found",
    "data": {
      "agent_id": "missing-agent",
      "available_agents": ["agent1", "agent2"],
      "timestamp": "2024-01-15T10:30:00Z"
    }
  },
  "id": "req_001"
}
```

## Implementation Guidelines

### Connection Management
- **Connection pooling** for efficient resource usage
- **Automatic reconnection** with exponential backoff
- **Heartbeat mechanism** for connection health monitoring
- **Circuit breaker pattern** for fault tolerance

### Message Routing
- **Service mesh** integration for traffic management
- **Load balancing** across agent instances
- **Message queuing** for reliable delivery
- **Dead letter queues** for failed messages

### Monitoring & Observability
- **Distributed tracing** using OpenTelemetry
- **Metrics collection** for performance monitoring
- **Centralized logging** with correlation IDs
- **Real-time alerting** for system health

## Integration with MCP

A2A complements MCP by enabling:
1. **Agent orchestration** - Coordinating multiple MCP-enabled agents
2. **Workflow automation** - Chaining MCP tool calls across agents
3. **Load distribution** - Balancing work across agent instances
4. **Fallback mechanisms** - Routing to alternative agents

Example integration:
```json
{
  "method": "agent.mcp.proxy",
  "params": {
    "mcp_method": "invoke_method",
    "mcp_params": {
      "method": "github.get_issues",
      "params": {"repo": "nexus/platform"}
    },
    "target_agent": "github-specialist"
  }
}
```

## Future Enhancements

1. **GraphQL subscription support** for real-time updates
2. **gRPC transport** for high-performance communication
3. **Edge computing** support for distributed agents
4. **Federated learning** capabilities for collaborative AI
5. **Blockchain integration** for decentralized agent networks

## Related Research

- **NEX-789**: Investigation into OAuth and security models for A2A
- **Security whitepaper**: Comprehensive security analysis
- **Performance benchmarks**: Latency and throughput analysis
- **Integration patterns**: Best practices for A2A adoption 