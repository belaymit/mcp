export interface MCPRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: any;
}

export interface MCPResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: any;
  error?: MCPError;
}

export interface MCPNotification {
  jsonrpc: "2.0";
  method: string;
  params?: any;
}

export interface MCPError {
  code: number;
  message: string;
  data?: any;
}

// MCP Protocol Capabilities
export interface MCPCapabilities {
  tools?: ToolsCapability;
  resources?: ResourcesCapability;
  prompts?: PromptsCapability;
  roots?: RootsCapability;
  sampling?: SamplingCapability;
}

export interface ToolsCapability {
  listChanged?: boolean;
}

export interface ResourcesCapability {
  subscribe?: boolean;
  listChanged?: boolean;
}

export interface PromptsCapability {
  listChanged?: boolean;
}

export interface RootsCapability {
  listChanged?: boolean;
}

export interface SamplingCapability {}

// Initialization
export interface InitializeParams {
  protocolVersion: string;
  capabilities: MCPCapabilities;
  clientInfo: ClientInfo;
}

export interface ClientInfo {
  name: string;
  version: string;
}

export interface InitializeResult {
  protocolVersion: string;
  capabilities: MCPCapabilities;
  serverInfo: ServerInfo;
}

export interface ServerInfo {
  name: string;
  version: string;
}

// Tools
export interface Tool {
  name: string;
  description?: string;
  inputSchema: any; // JSON Schema
}

export interface ListToolsResult {
  tools: Tool[];
}

export interface CallToolParams {
  name: string;
  arguments?: any;
}

export interface CallToolResult {
  content: TextContent[];
  isError?: boolean;
}

// Resources
export interface Resource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface ListResourcesResult {
  resources: Resource[];
}

export interface ReadResourceParams {
  uri: string;
}

export interface ReadResourceResult {
  contents: TextContent[];
}

// Content Types
export interface TextContent {
  type: "text";
  text: string;
}

export interface ImageContent {
  type: "image";
  data: string;
  mimeType: string;
}

export interface ResourceContent {
  type: "resource";
  resource: ResourceReference;
}

export interface ResourceReference {
  uri: string;
  type?: string;
}

export type Content = TextContent | ImageContent | ResourceContent;

// Pagination
export interface PaginatedRequest {
  cursor?: string;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
}

// Error Codes
export enum MCPErrorCode {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  // Server error range: -32000 to -32099
  ServerError = -32000,
}

// Transport Types
export type TransportType = 'stdio' | 'http' | 'websocket' | 'sse';

export interface MCPTransportConfig {
  type: TransportType;
  endpoint?: string;
  headers?: Record<string, string>;
  timeout?: number;
}

// Security Context
export interface SecurityContext {
  readonly capabilities: string[];
  readonly permissions: ResourcePermission[];
  readonly rateLimits: RateLimitConfig;
  readonly auditLog: AuditLogger;
}

export interface ResourcePermission {
  resource: string;
  actions: string[];
}

export interface RateLimitConfig {
  requestsPerMinute: number;
  burstLimit: number;
}

export interface AuditLogger {
  log(event: string, context: any): void;
} 