import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiting for API calls
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'openrouter',
  points: 5, // 5 requests
  duration: 60, // per 60 seconds
});

export async function rateLimit(ip: string): Promise<void> {
  try {
    await rateLimiter.consume(ip);
  } catch (rejRes: unknown) {
    const msBeforeNext = (rejRes as { msBeforeNext: number }).msBeforeNext;
    throw new Error(`Rate limit exceeded. Try again in ${Math.round(msBeforeNext / 1000)} seconds`);
  }
}

export async function generateWithOpenRouter(
  prompt: string,
  model: string = 'deepseek/deepseek-v3:free'
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenRouter API key not configured');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
      'X-Title': process.env.APP_NAME || 'EdgePress',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: `You are a professional blog content generator that creates high-quality, conversion-focused articles. Follow the provided rules strictly and generate semantic HTML without inline CSS or scripts.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

export async function generateWithFallback(prompt: string): Promise<string> {
  // Mock mode for testing
  if (process.env.MOCK_MODE === 'true') {
    return generateMockContent(prompt);
  }

  const models = [
    process.env.MODEL_NAME || 'deepseek/deepseek-chat-v3.1:free',
    'deepseek/deepseek-v3:free',
    'anthropic/claude-3-haiku',
    'meta-llama/llama-3.1-70b-instruct'
  ];

  let lastError: Error | null = null;

  for (const model of models) {
    try {
      return await generateWithOpenRouter(prompt, model);
    } catch (error) {
      lastError = error as Error;
      console.warn(`Model ${model} failed:`, error);
    }
  }

  throw lastError || new Error('All fallback models failed');
}

function generateMockContent(prompt: string): string {
  // Extract title from prompt
  const titleMatch = prompt.match(/titled "(.*?)"/);
  const title = titleMatch ? titleMatch[1] : 'Sample Blog Post';

  // Extract intent from prompt
  const intentMatch = prompt.match(/INTENT: (.*?)\n/);
  const intent = intentMatch ? intentMatch[1] : 'EDUCATIONAL';

  // Extract keywords from prompt
  const keywordsMatch = prompt.match(/KEYWORDS: (.*?)\n/);
  const keywords = keywordsMatch ? keywordsMatch[1] : 'AI, technology';

  // Generate mock HTML content based on the blog structure
  return `<h1>${title}</h1>
<p>Are you struggling to keep up with the rapid pace of technological change? You're not alone. Many businesses find themselves overwhelmed by the constant evolution of artificial intelligence and its applications.</p>

<h2>Why This Matters Now</h2>
<p>The business landscape is being fundamentally reshaped by artificial intelligence. Organizations that fail to adapt risk falling behind competitors who embrace these powerful tools.</p>

<h2>The Core Transformation</h2>
<p>Artificial intelligence is no longer a futuristic concept—it's a present reality that's transforming how we work, communicate, and make decisions. From automating routine tasks to providing deep insights into customer behavior, AI is becoming an indispensable tool for modern businesses.</p>

<h3>Key Areas of Impact</h3>
<ul>
<li><strong>Customer Service:</strong> AI-powered chatbots and support systems provide 24/7 assistance</li>
<li><strong>Data Analysis:</strong> Machine learning algorithms uncover patterns invisible to human analysts</li>
<li><strong>Process Automation:</strong> Repetitive tasks are automated, freeing human talent for strategic work</li>
<li><strong>Personalization:</strong> AI delivers tailored experiences to individual customers at scale</li>
</ul>

<h2>Real-World Results</h2>
<p>Companies implementing AI solutions report significant improvements in efficiency and customer satisfaction. Early adopters are seeing ROI within months, not years, making the investment increasingly attractive.</p>

<h2>Building Your AI Strategy</h2>
<p>Start small but think big. Begin with pilot projects that address specific business challenges, measure results, and scale successful initiatives across your organization.</p>

<h2>Getting Started</h2>
<p>The journey to AI transformation doesn't have to be overwhelming. With the right approach and partners, you can leverage artificial intelligence to drive meaningful business outcomes.</p>

<p><a href="#" rel="nofollow noopener">${intent === 'TRANSACTIONAL' ? 'Book your free consultation today' : 'Learn more about AI transformation'}</a></p>`;
}
