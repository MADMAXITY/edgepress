# EdgePress - AI Blog Generator

A Next.js application that generates professional, conversion-focused blog posts using OpenRouter AI models with structured content generation.

## Features

- **Two-pass generation**: Outline → Final content generation
- **Content rules enforcement**: Intent, tone, structure, and SEO compliance
- **HTML sanitization**: Safe content rendering with DOMPurify
- **Rate limiting**: Basic per-IP rate limiting to prevent abuse
- **Fallback models**: Automatic model switching if primary model fails
- **Live preview**: Real-time HTML preview with download functionality
- **Responsive design**: Mobile-friendly interface with Tailwind CSS

## Requirements

- Node.js 18+
- OpenRouter API key
- Vercel deployment (recommended)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd edgepress
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your OpenRouter API key:
```bash
OPENROUTER_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Configure your blog post**:
   - Set title, slug, and meta description
   - Choose intent (EDUCATIONAL, TRANSACTIONAL, PROOF-BASED, AUTHORITY-BUILDING)
   - Select content type, hook type, and closing style
   - Add target keywords and configure reading grade level

2. **Generate content**:
   - Click "Generate Blog Post" to start the process
   - The system first generates an outline
   - Then generates the final HTML content

3. **Preview and download**:
   - View the generated content in real-time
   - Download the complete HTML file
   - Review the blog configuration details

## API Routes

### `/api/generate/outline`
Generates a blog post outline based on provided rules.

**Method**: POST
**Body**:
```json
{
  "rules": {
    "title": "Blog Title",
    "slug": "blog-slug",
    "metaDescription": "Meta description",
    "intent": "EDUCATIONAL",
    "contentType": "Guide",
    "hookType": "Problem Mirror",
    "targetKeywords": ["keyword1", "keyword2"],
    "readingGrade": 8,
    "wordTarget": 1400,
    "influence": ["Authority"],
    "closingStyle": "Quick Recap",
    "cta": "Book a consultation",
    "disallowPhrases": ["As an AI", "In conclusion"],
    "sections": [],
    "references": []
  },
  "allowFallbacks": true
}
```

### `/api/generate/content`
Generates the final blog post content.

**Method**: POST
**Body**: Same as outline endpoint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key | Yes |
| `APP_NAME` | Application name | Optional |
| `APP_URL` | Application URL | Optional |
| `MODEL_NAME` | Default model name | Optional |
| `ALLOW_FALLBACKS` | Enable fallback models | Optional |

## Content Rules

The application enforces EdgePress blog structure guidelines:

### Intent Types
- **EDUCATIONAL**: Teach, clarify, guide
- **TRANSACTIONAL**: Drive action, decision, conversion
- **PROOF-BASED**: Demonstrate results and evidence
- **AUTHORITY-BUILDING**: Establish thought leadership

### Content Types
- Listicle, Checklist/Template, Beginner's/Ultimate Guide
- Problem→Solution, Insights/Trends, FAQ/Answer
- Stats/Data, Technical Deep-Dive, Implementation Roadmap
- Behind-the-Scenes, Tool Review, Comparison/Versus
- ROI Calculator, Case Study, Industry Predictions

### Hook Types
- Problem Mirror, Curiosity Gap, Bold Claim
- Stat Punch, Challenge, Future Vision, Mini Story

## Security Features

- **HTML Sanitization**: All content is sanitized using DOMPurify
- **Rate Limiting**: 5 requests per 60 seconds per IP
- **No Client-Side API Keys**: OpenRouter API key is only server-side
- **Input Validation**: Zod schema validation for all API inputs

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Rate Limiting

The application includes rate limiting to prevent abuse:
- 5 requests per 60 seconds per IP address
- Automatic fallback between AI models
- Graceful error handling with user-friendly messages

## Fallback Models

If the primary model fails, the system tries these alternatives:
1. `deepseek/deepseek-v3:free`
2. `anthropic/claude-3-haiku`
3. `meta-llama/llama-3.1-70b-instruct`

## Troubleshooting

### Common Issues

1. **OpenRouter API Error**: Check your API key in `.env.local`
2. **Rate Limit Exceeded**: Wait 60 seconds before trying again
3. **Generation Failed**: Check internet connection and try again

### Development Tips

- Enable fallback models for better reliability
- Monitor API usage to avoid quota limits
- Test with different content types to understand output variations

## License

This project is for educational and commercial use. Please check OpenRouter's terms of service for API usage.