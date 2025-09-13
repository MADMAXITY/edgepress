import { z } from 'zod';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export const BlogRulesSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  intent: z.enum(['EDUCATIONAL', 'TRANSACTIONAL', 'PROOF-BASED', 'AUTHORITY-BUILDING']),
  contentType: z.string().min(1, 'Content type is required'),
  hookType: z.string().min(1, 'Hook type is required'),
  targetKeywords: z.array(z.string()).min(1, 'At least one keyword is required'),
  readingGrade: z.number().min(6).max(12),
  wordTarget: z.number().min(500).max(5000),
  influence: z.array(z.string()),
  closingStyle: z.string().min(1, 'Closing style is required'),
  cta: z.string().min(1, 'CTA is required'),
  disallowPhrases: z.array(z.string()),
  sections: z.array(z.object({
    id: z.string(),
    heading: z.string(),
    summary: z.string(),
    bullets: z.array(z.string()),
    code: z.string().optional(),
    media: z.array(z.string()).optional()
  })),
  references: z.array(z.object({
    label: z.string(),
    url: z.string()
  }))
}).refine(data => data.slug.replace(/\s+/g, '-').toLowerCase() === data.slug, {
  message: 'Slug should be URL-friendly (lowercase, hyphens only)',
  path: ['slug']
});

export const GenerationRequestSchema = z.object({
  rules: BlogRulesSchema,
  model: z.string().optional(),
  allowFallbacks: z.boolean().optional()
});

export type BlogRules = z.infer<typeof BlogRulesSchema>;
export type GenerationRequest = z.infer<typeof GenerationRequestSchema>;

export function sanitizeHTML(html: string): string {
  try {
    return DOMPurify.sanitize(html);
  } catch (error) {
    // Fallback: basic HTML sanitization
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/gi, '');
  }
}

export function validateHTMLStructure(html: string): boolean {
  const hasSingleH1 = (html.match(/<h1>/g) || []).length === 1;
  const hasValidHeadings = !html.match(/<h1.*?<\/h1>/) || html.match(/<\/h[1-6]>/g)!.length >= html.match(/<h[1-6]>/g)!.length;

  return hasSingleH1 && hasValidHeadings;
}

export function extractTextFromHTML(html: string): string {
  const tempDiv = new JSDOM(html).window.document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || '';
}