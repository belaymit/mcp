// A2A (Agent-to-Agent) Protocol Type Definitions
// Based on Google's A2A protocol specification

import { RateLimitConfig, SecurityContext } from './mcp.js';

// Core Agent Card System
export interface AgentCard {
  id: string;
  name: string;
  description: string;
  capabilities: AgentCapabilities;
  constraints: AgentConstraints;
  metadata: AgentMetadata;
}

export interface AgentCapabilities {
  tools: ToolDefinition[];
  knowledge_domains: string[];
  communication_patterns: CommunicationPattern[];
  supported_protocols: string[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: any; // JSON Schema
  returns: any; // JSON Schema
}

export interface AgentConstraints {
  rate_limits: RateLimitConfig;
  security_level: SecurityLevel;
  resource_limits: ResourceLimits;
  geographic_restrictions?: string[];
}

export interface AgentMetadata {
  version: string;
  created_by: string;
  trust_score: number;
  last_updated: Date;
  tags: string[];
}

// Task Management
export interface TaskRequest {
  id: string;
  type: TaskType;
  priority: TaskPriority;
  requirements: TaskRequirements;
  context: TaskContext;
  deadline?: Date;
}

export type TaskType = 'QUERY' | 'ANALYSIS' | 'GENERATION' | 'COORDINATION' | 'EXECUTION';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TaskRequirements {
  capabilities: string[];
  minimum_trust_score?: number;
  geographic_preferences?: string[];
  resource_constraints?: ResourceConstraints;
}

export interface TaskContext {
  conversation_id?: string;
  user_id?: string;
  session_data?: any;
  related_tasks?: string[];
}

export interface TaskExecution {
  task_id: string;
  agent_id: string;
  status: ExecutionStatus;
  progress: number; // 0-100
  checkpoints: Checkpoint[];
  resources_used: ResourceUsage;
  estimated_completion: Date;
  error?: ExecutionError;
}

export type ExecutionStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface Checkpoint {
  id: string;
  timestamp: Date;
  description: string;
  data?: any;
}

// Communication Patterns
export type CommunicationPattern = 
  | 'REQUEST_RESPONSE' 
  | 'PUBLISH_SUBSCRIBE' 
  | 'PIPELINE' 
  | 'CONSENSUS';

// Request-Response Pattern
export interface A2ARequest {
  id: string;
  from: string;
  to: string;
  method: string;
  params: any;
  context: RequestContext;
  timeout?: number;
}

export interface A2AResponse {
  id: string;
  from: string;
  to: string;
  result?: any;
  error?: A2AError;
  context: ResponseContext;
}

// Publish-Subscribe Pattern
export interface EventSubscription {
  id: string;
  topic: string;
  filters: EventFilter[];
  callback_url: string;
  expiry: Date;
  agent_id: string;
}

export interface EventFilter {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'contains' | 'regex';
  value: any;
}

export interface Event {
  id: string;
  topic: string;
  data: any;
  timestamp: Date;
  source: string;
  metadata?: any;
}

// Pipeline Coordination
export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  error_handling: ErrorHandlingStrategy;
  rollback_strategy: RollbackStrategy;
  created_by: string;
  created_at: Date;
}

export interface PipelineStage {
  id: string;
  name: string;
  agent_selector: AgentSelector;
  input_mapping: InputMapping;
  output_mapping: OutputMapping;
  dependencies?: string[];
  timeout?: number;
}

export interface AgentSelector {
  strategy: 'CAPABILITY_MATCH' | 'ROUND_ROBIN' | 'LEAST_LOADED' | 'HIGHEST_TRUST';
  filters: AgentFilter[];
}

export interface AgentFilter {
  field: string;
  operator: string;
  value: any;
}

// Consensus Building
export interface ConsensusRequest {
  id: string;
  proposal: any;
  voting_strategy: VotingStrategy;
  timeout: number;
  quorum: number;
  participants: string[];
  initiator: string;
}

export type VotingStrategy = 'MAJORITY' | 'UNANIMOUS' | 'WEIGHTED' | 'SUPERMAJORITY';

export interface ConsensusVote {
  agent_id: string;
  decision: 'APPROVE' | 'REJECT' | 'ABSTAIN';
  reasoning?: string;
  weight?: number;
  timestamp: Date;
}

export interface ConsensusResult {
  request_id: string;
  status: 'PASSED' | 'FAILED' | 'TIMEOUT';
  votes: ConsensusVote[];
  final_tally: VoteTally;
  execution_plan?: any;
}

export interface VoteTally {
  approve: number;
  reject: number;
  abstain: number;
  total_weight?: number;
}

// Security & Authentication
export interface SecurityLevel {
  classification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
  encryption_required: boolean;
  audit_level: 'NONE' | 'BASIC' | 'DETAILED' | 'COMPREHENSIVE';
}

export interface AuthenticationToken {
  type: 'JWT' | 'BEARER' | 'MTLS' | 'API_KEY';
  value: string;
  expiry?: Date;
  scopes: string[];
}

export interface RequestContext {
  authentication: AuthenticationToken;
  correlation_id: string;
  trace_id?: string;
  security_context: SecurityContext;
  timestamp: Date;
}

export interface ResponseContext {
  correlation_id: string;
  trace_id?: string;
  processing_time: number;
  agent_metadata: AgentMetadata;
  timestamp: Date;
}

// Resource Management
export interface ResourceLimits {
  max_concurrent_tasks: number;
  max_memory_mb: number;
  max_cpu_percentage: number;
  max_execution_time: number;
}

export interface ResourceConstraints {
  min_memory_mb?: number;
  min_cpu_cores?: number;
  max_latency_ms?: number;
  required_features?: string[];
}

export interface ResourceUsage {
  memory_mb: number;
  cpu_percentage: number;
  execution_time: number;
  network_bytes: number;
  storage_bytes: number;
}

// Error Handling
export interface A2AError {
  code: string;
  message: string;
  details?: any;
  retry_after?: number;
  recovery_suggestions?: string[];
}

export interface ExecutionError {
  type: 'TIMEOUT' | 'RESOURCE_LIMIT' | 'AUTHENTICATION' | 'VALIDATION' | 'INTERNAL';
  message: string;
  stack_trace?: string;
  recovery_strategy?: string;
}

export type ErrorHandlingStrategy = 'FAIL_FAST' | 'RETRY' | 'FALLBACK' | 'IGNORE';
export type RollbackStrategy = 'NONE' | 'CHECKPOINT' | 'FULL' | 'COMPENSATING';

// Audit & Compliance
export interface AuditRecord {
  timestamp: Date;
  agent_id: string;
  action: string;
  context: any;
  result: 'SUCCESS' | 'FAILURE' | 'PARTIAL';
  security_context: SecurityContext;
  data_accessed?: string[];
  compliance_flags?: string[];
}

// Input/Output Mapping
export interface InputMapping {
  source_field: string;
  target_field: string;
  transformation?: TransformationRule;
}

export interface OutputMapping {
  source_field: string;
  target_field: string;
  aggregation?: AggregationRule;
}

export interface TransformationRule {
  type: 'CONVERT' | 'FORMAT' | 'EXTRACT' | 'COMPUTE';
  expression: string;
  parameters?: any;
}

export interface AggregationRule {
  type: 'SUM' | 'AVG' | 'MAX' | 'MIN' | 'COLLECT' | 'MERGE';
  parameters?: any;
}

// Agent Discovery & Registry
export interface AgentDiscoveryRequest {
  capabilities: string[];
  constraints?: AgentConstraints;
  geographic_preference?: string;
  load_balancing?: boolean;
}

export interface AgentDiscoveryResponse {
  agents: AgentCard[];
  ranked_by: 'CAPABILITY_MATCH' | 'TRUST_SCORE' | 'AVAILABILITY' | 'LATENCY';
  total_found: number;
}

// Protocol Configuration
export interface A2AConfig {
  protocol_version: string;
  supported_patterns: CommunicationPattern[];
  security_requirements: SecurityLevel;
  timeout_defaults: TimeoutConfig;
  retry_policies: RetryPolicy[];
}

export interface TimeoutConfig {
  request_timeout: number;
  task_timeout: number;
  consensus_timeout: number;
  pipeline_timeout: number;
}

export interface RetryPolicy {
  max_attempts: number;
  initial_delay: number;
  max_delay: number;
  backoff_multiplier: number;
  retriable_errors: string[];
} 