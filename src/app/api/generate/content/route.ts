import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, generateWithFallback, generateWithOpenRouter } from '@/lib/openrouter';
import { GenerationRequestSchema, sanitizeHTML, validateHTMLStructure } from '@/lib/validation';
import type { BlogRules, ContentResponse } from '@/types/blog';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    await rateLimit(ip);

    // Parse and validate request
    const body = await request.json();
    const validatedData = GenerationRequestSchema.parse(body);
    const { rules, allowFallbacks = true } = validatedData;

    // Generate content using LLM
    const contentPrompt = createContentPrompt(rules);
    const rawContent = allowFallbacks
      ? await generateWithFallback(contentPrompt)
      : await generateWithOpenRouter(contentPrompt);

    // Sanitize HTML content
    const sanitizedHTML = sanitizeHTML(rawContent);

    // Validate HTML structure
    if (!validateHTMLStructure(sanitizedHTML)) {
      throw new Error('Generated HTML has invalid structure');
    }

    // Parse structured sections
    const sections = parseContentSections(sanitizedHTML, rules);

    const response: ContentResponse = {
      title: rules.title,
      slug: rules.slug,
      metaDescription: rules.metaDescription,
      htmlContent: sanitizedHTML,
      sections
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('Content generation error:', error);

    if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content' },
      { status: 500 }
    );
  }
}

function createContentPrompt(rules: BlogRules): string {
  const intentMap = {
    'EDUCATIONAL': 'Educational',
    'TRANSACTIONAL': 'Transactional',
    'PROOF-BASED': 'Proof-based',
    'AUTHORITY-BUILDING': 'Authority-building'
  };

  return `
Generate a complete, conversion-ready blog post titled "${rules.title}".

INTENT: ${intentMap[rules.intent as keyof typeof intentMap]}
CONTENT TYPE: ${rules.contentType}
HOOK TYPE: ${rules.hookType}
KEYWORDS: ${rules.targetKeywords.join(', ')}
READING GRADE: ${rules.readingGrade} (grade ${rules.readingGrade} level)
WORD TARGET: ${rules.wordTarget} words
CLOSING STYLE: ${rules.closingStyle}
CTA: "${rules.cta}"

DISALLOWED PHRASES: ${rules.disallowPhrases.join(', ')}

CONTENT REQUIREMENTS:
- Use semantic HTML only (no inline CSS or scripts)
- Exactly one <h1> for the title
- Use <h2> and <h3> for sections
- Use <ul> and <li> for lists
- Use <strong> for emphasis
- Add <a> tags with rel="nofollow noopener" for links
- Use image placeholders: <!-- image: alt="description" -->
- No external images
- Include natural keywords

STRUCTURE (use the EdgePress skeleton):
1. HOOK - Create curiosity or identify pain points
2. CONTEXT - Explain why this matters now
3. CORE DELIVERY - Method, checklist, analysis, etc.
4. PROOF - Results, metrics, evidence
5. AUTHORITY - Credibility, experience, research
6. CTA - Clear next step

Generate complete, high-quality HTML content that follows these rules and the EdgePress guidelines.
`;
}

function parseContentSections(html: string, rules: BlogRules) {
  // Use DOMParser to extract sections (would need DOMParser in browser environment)
  // For server-side, we'll create sections based on the structure

  const sections = [];
  const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [];

  if (headings.length === 0) {
    // Fallback structure
    return [
      {
        id: 'hook',
        heading: rules.title,
        summary: 'Introduction',
        bullets: ['Key point 1', 'Key point 2']
      },
      {
        id: 'context',
        heading: 'Why this matters',
        summary: 'Context information',
        bullets: ['Context point 1', 'Context point 2']
      }
    ];
  }

  // Simple section mapping based on heading content
  const firstHeading = headings[0];
  const firstContent = extractHeadingContent(firstHeading || '', html);

  sections.push({
    id: 'hook',
    heading: firstContent.heading,
    summary: firstContent.summary || 'Introduction',
    bullets: extractBulletPointsFromHTML(html)
  });

  if (headings.length > 1) {
    const secondHeading = headings[1];
    const secondContent = extractHeadingContent(secondHeading, html);
    sections.push({
      id: 'context',
      heading: secondContent.heading,
      summary: secondContent.summary || 'Context',
      bullets: []
    });
  }

  return sections.slice(0, 5); // Return max 5 sections
}

function extractHeadingContent(heading: string, _html: string) {
  const titleMatch = heading.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
  if (titleMatch && titleMatch[1]) {
    return {
      heading: titleMatch[1].trim(),
      summary: '' // Would need more complex parsing to get summary
    };
  }

  return {
    heading: 'Section',
    summary: ''
  };
}

function extractBulletPointsFromHTML(html: string): string[] {
  const listItems = html.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
  return listItems.slice(0, 5).map(item => {
    const cleanItem = item.replace(/<[^>]*>/g, '').trim();
    return cleanItem;
  });
}