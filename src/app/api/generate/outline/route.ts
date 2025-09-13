import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, generateWithFallback, generateWithOpenRouter } from '@/lib/openrouter';
import { GenerationRequestSchema } from '@/lib/validation';
import type { BlogRules, OutlineResponse } from '@/types/blog';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    await rateLimit(ip);

    // Parse and validate request
    const body = await request.json();
    const validatedData = GenerationRequestSchema.parse(body);
    const { rules, allowFallbacks = true } = validatedData;

    // Generate outline using LLM
    const outlinePrompt = createOutlinePrompt(rules);
    const outlineContent = allowFallbacks
      ? await generateWithFallback(outlinePrompt)
      : await generateWithOpenRouter(outlinePrompt);

    // Parse outline into structured format
    const outline = parseOutlineContent(outlineContent, rules);

    return NextResponse.json(outline);
  } catch (error: unknown) {
    console.error('Outline generation error:', error);

    if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate outline' },
      { status: 500 }
    );
  }
}

function createOutlinePrompt(rules: BlogRules): string {
  const intentMap = {
    'EDUCATIONAL': 'Educational',
    'TRANSACTIONAL': 'Transactional',
    'PROOF-BASED': 'Proof-based',
    'AUTHORITY-BUILDING': 'Authority-building'
  };

  return `
Generate a comprehensive blog post outline for "${rules.title}".

INTENT: ${intentMap[rules.intent as keyof typeof intentMap]}
CONTENT TYPE: ${rules.contentType}
HOOK TYPE: ${rules.hookType}
KEYWORDS: ${rules.targetKeywords.join(', ')}
READING GRADE: ${rules.readingGrade}
WORD TARGET: ${rules.wordTarget} words
CLOSING STYLE: ${rules.closingStyle}
CTA: "${rules.cta}"

DISALLOWED PHRASES: ${rules.disallowPhrases.join(', ')}

Based on the EdgePress blog structure guide, create a detailed outline that follows this schema:
{
  "title": "${rules.title}",
  "slug": "${rules.slug}",
  "metaDescription": "${rules.metaDescription}",
  "sections": [
    {
      "id": "hook",
      "heading": "Hook heading",
      "summary": "1-2 sentence hook summary",
      "bullets": ["hook bullet 1", "hook bullet 2"]
    },
    {
      "id": "context",
      "heading": "Context heading",
      "summary": "Context summary",
      "bullets": ["context bullet 1", "context bullet 2"]
    },
    {
      "id": "core",
      "heading": "Core value heading",
      "summary": "Core value summary",
      "bullets": ["core bullet 1", "core bullet 2"],
      "media": ["<!-- image: alt=\"example\" -->"]
    },
    {
      "id": "proof",
      "heading": "Results/Evidence heading",
      "summary": "Results summary",
      "bullets": ["result 1", "result 2"]
    },
    {
      "id": "cta",
      "heading": "Next Steps heading",
      "summary": "CTA summary",
      "bullets": ["CTA item 1", "CTA item 2"]
    }
  ]
}

Ensure the outline follows the blog structure guidelines and has appropriate content for each section. Return only the valid JSON.
`;
}

function parseOutlineContent(content: string, rules: BlogRules): OutlineResponse {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const outline = JSON.parse(jsonMatch[0]);
      return {
        ...outline,
        estimatedWords: rules.wordTarget
      };
    }

    // Fallback: Basic structure if JSON parsing fails
    return {
      title: rules.title,
      slug: rules.slug,
      metaDescription: rules.metaDescription,
      sections: [
        {
          id: 'hook',
          heading: rules.title,
          summary: 'Introduction hook',
          bullets: ['Key point 1', 'Key point 2']
        },
        {
          id: 'context',
          heading: 'Why this matters',
          summary: 'Context information',
          bullets: ['Context point 1', 'Context point 2']
        },
        {
          id: 'core',
          heading: 'Core Content',
          summary: 'Main content',
          bullets: ['Main point 1', 'Main point 2']
        },
        {
          id: 'proof',
          heading: 'Results',
          summary: 'Evidence',
          bullets: ['Result 1', 'Result 2']
        },
        {
          id: 'cta',
          heading: 'Next Steps',
          summary: 'Call to action',
          bullets: [rules.cta]
        }
      ],
      estimatedWords: rules.wordTarget
    };
  } catch (error) {
    console.error('Failed to parse outline:', error);
    throw new Error('Invalid outline format received from LLM');
  }
}