import { describe, it, expect, beforeEach } from 'vitest';
import { MCPIntegrationChallenge } from '../src/index';

describe('MCP Integration Challenge - Task 1 Setup', () => {
  let challenge: MCPIntegrationChallenge;

  beforeEach(() => {
    challenge = new MCPIntegrationChallenge();
  });

  describe('Project Initialization', () => {
    it('should create challenge instance successfully', () => {
      expect(challenge).toBeInstanceOf(MCPIntegrationChallenge);
    });

    it('should have correct project information', () => {
      // Access private property for testing
      const projectInfo = (challenge as any).projectInfo;
      
      expect(projectInfo.name).toBe('MCP Integration Challenge');
      expect(projectInfo.version).toBe('1.0.0');
      expect(projectInfo.description).toContain('AI Protocol Engineer Challenge');
      expect(projectInfo.technologies).toContain('TypeScript');
      expect(projectInfo.technologies).toContain('LangGraph.js');
    });
  });

  describe('Environment Check', () => {
    it('should check environment without throwing errors', async () => {
      await expect(challenge.checkEnvironment()).resolves.not.toThrow();
    });

    it('should detect Node.js version', () => {
      expect(process.version).toMatch(/^v\d+\.\d+/);
    });
  });

  describe('TypeScript Features', () => {
    it('should demonstrate TypeScript features without errors', async () => {
      await expect(challenge.demonstrateTypeScript()).resolves.not.toThrow();
    });
  });

  describe('Display Methods', () => {
    it('should display welcome message without errors', () => {
      expect(() => challenge.displayWelcome()).not.toThrow();
    });

    it('should display next steps without errors', () => {
      expect(() => challenge.displayNextSteps()).not.toThrow();
    });
  });
});

describe('TypeScript Configuration', () => {
  it('should support modern TypeScript features', async () => {
    // Test async/await
    const asyncFunction = async (): Promise<string> => {
      return 'async works';
    };
    await expect(asyncFunction()).resolves.toBe('async works');

    // Test generics
    function identity<T>(arg: T): T {
      return arg;
    }
    expect(identity<string>('test')).toBe('test');
    expect(identity<number>(42)).toBe(42);

    // Test optional chaining
    const obj = { nested: { value: 'test' } };
    expect(obj.nested?.value).toBe('test');
    expect((obj as any).missing?.value).toBeUndefined();

    // Test nullish coalescing
    const nullValue: string | null = null;
    const undefinedValue: string | undefined = undefined;
    const emptyString: string = '';
    expect(nullValue ?? 'default').toBe('default');
    expect(undefinedValue ?? 'default').toBe('default');
    expect(emptyString ?? 'default').toBe('');
  });

  it('should support ES modules', () => {
    expect(import.meta).toBeDefined();
    expect(import.meta.url).toContain('file://');
  });
});

describe('Mock Knowledge Base', () => {
  it('should have required directory structure', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const mockKbPath = path.join(process.cwd(), 'mock_knowledge_base');
    
    // Check main directories exist
    await expect(fs.access(path.join(mockKbPath, 'docs'))).resolves.not.toThrow();
    await expect(fs.access(path.join(mockKbPath, 'code'))).resolves.not.toThrow();
    await expect(fs.access(path.join(mockKbPath, 'tickets'))).resolves.not.toThrow();
    
    // Check key files exist
    await expect(fs.access(path.join(mockKbPath, 'jira_tickets.json'))).resolves.not.toThrow();
  });

  it('should have valid JIRA tickets JSON', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const ticketsPath = path.join(process.cwd(), 'mock_knowledge_base', 'jira_tickets.json');
    const ticketsContent = await fs.readFile(ticketsPath, 'utf-8');
    const tickets = JSON.parse(ticketsContent);
    
    expect(Array.isArray(tickets)).toBe(true);
    expect(tickets.length).toBeGreaterThan(0);
    
    // Check ticket structure
    tickets.forEach((ticket: any) => {
      expect(ticket).toHaveProperty('ticket_id');
      expect(ticket).toHaveProperty('summary');
      expect(ticket).toHaveProperty('description');
      expect(ticket).toHaveProperty('status');
    });
  });
});

describe('Documentation', () => {
  it('should have protocols understanding document', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const docPath = path.join(process.cwd(), 'docs', 'protocols_understanding.md');
    await expect(fs.access(docPath)).resolves.not.toThrow();
    
    const content = await fs.readFile(docPath, 'utf-8');
    expect(content).toContain('MCP invoke_method Flow');
    expect(content).toContain('MCP vs A2A Use Cases Comparison');
    expect(content).toContain('Target MCP Server Functions Summary');
  });

  it('should have comprehensive README', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const readmePath = path.join(process.cwd(), 'README.md');
    await expect(fs.access(readmePath)).resolves.not.toThrow();
    
    const content = await fs.readFile(readmePath, 'utf-8');
    expect(content).toContain('MCP Integration Challenge');
    expect(content).toContain('Architecture');
    expect(content).toContain('Quick Start');
    expect(content).toContain('TypeScript/NodeJS');
    expect(content).toContain('LangGraph.js');
  });
});

describe('Package Configuration', () => {
  it('should have correct package.json configuration', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageContent = await fs.readFile(packagePath, 'utf-8');
    const packageJson = JSON.parse(packageContent);
    
    expect(packageJson.name).toBe('mcp-integration-challenge');
    expect(packageJson.type).toBe('module');
    expect(packageJson.scripts).toHaveProperty('build');
    expect(packageJson.scripts).toHaveProperty('dev');
    expect(packageJson.scripts).toHaveProperty('test');
    
    // Check for required dependencies
    expect(packageJson.dependencies).toHaveProperty('@langchain/langgraph');
    expect(packageJson.dependencies).toHaveProperty('langchain');
    expect(packageJson.dependencies).toHaveProperty('express');
    
    // Check for dev dependencies
    expect(packageJson.devDependencies).toHaveProperty('typescript');
    expect(packageJson.devDependencies).toHaveProperty('vitest');
    expect(packageJson.devDependencies).toHaveProperty('tsx');
  });

  it('should have correct TypeScript configuration', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    const tsconfigContent = await fs.readFile(tsconfigPath, 'utf-8');
    const tsconfig = JSON.parse(tsconfigContent);
    
    expect(tsconfig.compilerOptions.target).toBe('ES2022');
    expect(tsconfig.compilerOptions.module).toBe('ESNext');
    expect(tsconfig.compilerOptions.strict).toBe(true);
    expect(tsconfig.compilerOptions.esModuleInterop).toBe(true);
  });
}); 