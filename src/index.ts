import { config } from 'dotenv';

// Load environment variables
config();

interface ProjectInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  technologies: string[];
  challenges: string[];
}

class MCPIntegrationChallenge {
  private readonly projectInfo: ProjectInfo;

  constructor() {
    this.projectInfo = {
      name: 'MCP Integration Challenge',
      version: '1.0.0',
      description: 'AI Protocol Engineer Challenge: MCP Integration, Proxy & RAG Foundations',
      author: 'AI Protocol Engineer Trainee',
      technologies: [
        'TypeScript',
        'Node.js',
        'LangGraph.js',
        'LangChain JS',
        'Express.js',
        'Model Context Protocol (MCP)',
        'Agent-to-Agent Protocol (A2A)'
      ],
      challenges: [
        'Task 1: Environment Setup & Protocol Study ',
        'Task 2: Explore & Test Existing MCP Servers',
        'Task 3: Design & Implement MCP Proxy Server',
        'Task 4: Implement Basic RAG Agent with MCP Integration',
        'Task 5: Research Advanced MCP Concepts',
        'Task 6: Test MCP Proxy with IDE Integration',
        'Task 7: Documentation & Stand-up Preparation'
      ]
    };
  }

  public displayWelcome(): void {
    console.log('\n Welcome to the MCP Integration Challenge!');
    console.log('=' .repeat(50));
    console.log(` Project: ${this.projectInfo.name}`);
    console.log(` Version: ${this.projectInfo.version}`);
    console.log(` Description: ${this.projectInfo.description}`);
    console.log(` Author: ${this.projectInfo.author}`);
    
    console.log('\n🔧 Technologies Used:');
    this.projectInfo.technologies.forEach(tech => {
      console.log(`  • ${tech}`);
    });

    console.log('\n Challenge Progress:');
    this.projectInfo.challenges.forEach(challenge => {
      console.log(`  ${challenge}`);
    });

    console.log('\n Current Status: Task 1 Completed Successfully!');
    console.log('=' .repeat(50));
  }

  public async checkEnvironment(): Promise<void> {
    console.log('\n Environment Check:');
    
    const requiredEnvVars = [
      'NODE_ENV',
      // 'OPENAI_API_KEY', // Optional for now
      // 'GITHUB_TOKEN', // Optional for now
    ];

    const nodeVersion = process.version;
    console.log(`   Node.js Version: ${nodeVersion}`);
    
    const hasRequiredVars = requiredEnvVars.every(envVar => {
      const exists = process.env[envVar] !== undefined;
      console.log(`  ${exists ? '✅' : '⚠️ '} ${envVar}: ${exists ? 'Set' : 'Not Set'}`);
      return exists;
    });

    if (hasRequiredVars) {
      console.log('   Environment setup is complete!');
    } else {
      console.log('    Some optional environment variables are not set');
      console.log('     Copy .env.template to .env and fill in your values');
    }
  }

  public async demonstrateTypeScript(): Promise<void> {
    console.log('\n TypeScript Features Demo:');
    
    // Async/await
    const asyncDemo = async (): Promise<string> => {
      return new Promise(resolve => {
        setTimeout(() => resolve('Async/await works!'), 100);
      });
    };

    const result = await asyncDemo();
    console.log(`   ${result}`);

    // Generics
    function identity<T>(arg: T): T {
      return arg;
    }

    const stringResult = identity<string>('Generics work!');
    console.log(`   ${stringResult}`);

    // Destructuring
    const { name, version } = this.projectInfo;
    console.log(`   Destructuring: ${name} v${version}`);

    // Optional chaining and nullish coalescing
    const optional = { nested: { value: 'Optional chaining works!' } };
    console.log(`   ${optional.nested?.value ?? 'Default value'}`);
  }

  public displayNextSteps(): void {
    console.log('\n Next Steps:');
    console.log('  1.  Set up downstream MCP servers');
    console.log('  2.   Build MCP client tester');
    console.log('  3.   Implement MCP proxy server');
    console.log('  4.  Create RAG-enabled agent with LangGraph.js');
    console.log('  5.  Configure IDE integration');
    console.log('  6.  Complete documentation');
    
    console.log('\n Available Commands:');
    console.log('  • npm run build    - Build TypeScript project');
    console.log('  • npm run dev      - Run in development mode');
    console.log('  • npm test         - Run test suite');
    console.log('  • npm run lint     - Run ESLint');
    console.log('  • npm run format   - Format code with Prettier');
  }
}

async function main(): Promise<void> {
  try {
    const challenge = new MCPIntegrationChallenge();
    
    challenge.displayWelcome();
    await challenge.checkEnvironment();
    await challenge.demonstrateTypeScript();
    challenge.displayNextSteps();
    
    console.log('\n Task 1 Setup Complete! Ready for implementation.\n');
  } catch (error) {
    console.error(' Error during initialization:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { MCPIntegrationChallenge };
export default main; 