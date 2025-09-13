'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  IconButton,
  Divider,
  FormHelperText,
} from '@mui/material';
import {
  Title,
  Link,
  Description,
  Psychology,
  Category,
  AutoAwesome,
  AddCircle,
  RemoveCircle,
  KeyboardDoubleArrowRight,
  Settings,
  TrendingUp,
  Speed,
  Block,
} from '@mui/icons-material';
import { BlogRules } from '@/types/blog';

interface PremiumFormProps {
  onSubmit: (rules: BlogRules) => void;
  isLoading: boolean;
  initialData?: Partial<BlogRules>;
}

const intentOptions = [
  { value: 'EDUCATIONAL', label: 'Educational', icon: <Psychology /> },
  { value: 'TRANSACTIONAL', label: 'Transactional', icon: <TrendingUp /> },
  { value: 'PROOF-BASED', label: 'Proof-Based', icon: <Speed /> },
  { value: 'AUTHORITY-BUILDING', label: 'Authority Building', icon: <Settings /> },
];

const hookTypeOptions = [
  'Question Hook',
  'Statistic Hook',
  'Story Hook',
  'Problem Hook',
  'Controversy Hook',
  'Benefit Hook',
];

const closingStyleOptions = [
  'Summary + CTA',
  'Question + Discussion',
  'Story + Moral',
  'Statistics + Future',
  'Call to Action Only',
];

const contentTypeOptions = [
  'Guide',
  'Tutorial',
  'Listicle',
  'How-To',
  'Review',
  'Comparison',
  'Case Study',
  'Interview',
  'Opinion Piece',
  'News Article',
  'Research Summary',
  'FAQ',
  'Checklist',
  'Template',
  'Resource Roundup',
];

export default function PremiumForm({ onSubmit, isLoading, initialData }: PremiumFormProps) {

  // Clean, modern input field styling - no animations or effects
  const inputFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(15, 23, 42, 1)',
      borderRadius: '12px',
      border: '1px solid rgba(148, 163, 184, 0.5)',
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    '& .MuiInputLabel-root': {
      color: '#94a3b8',
      fontSize: '1rem',
      fontWeight: 400,
      transform: 'translate(14px, 16px) scale(1)',
      '&.Mui-focused': {
        color: '#6366f1',
        fontWeight: 600,
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
        color: '#e2e8f0',
        fontWeight: 500,
      },
    },
    '& .MuiFormHelperText-root': {
      color: '#94a3b8',
      fontSize: '0.75rem',
      marginTop: '4px',
    },
    '& .MuiInputAdornment-root': {
      color: '#6366f1',
    },
  };

  // Specific styling for Select fields - no animations or effects
  const selectFieldStyle = {
    ...inputFieldStyle,
    '& .MuiSelect-select': {
      color: '#ffffff',
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    '& .MuiSelect-icon': {
      color: '#6366f1',
    },
    '& .MuiInputLabel-root': {
      color: '#e2e8f0',
      fontSize: '0.875rem',
      fontWeight: 500,
      transform: 'translate(14px, 16px) scale(1)',
      '&.Mui-focused': {
        color: '#6366f1',
        fontWeight: 600,
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
        color: '#e2e8f0',
        fontWeight: 500,
      },
    },
  };

  const [formData, setFormData] = React.useState<BlogRules>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    metaDescription: initialData?.metaDescription || '',
    intent: initialData?.intent || 'EDUCATIONAL',
    contentType: initialData?.contentType || '',
    hookType: initialData?.hookType || '',
    targetKeywords: initialData?.targetKeywords || [],
    readingGrade: initialData?.readingGrade || 8,
    wordTarget: initialData?.wordTarget || 1500,
    influence: initialData?.influence || [],
    closingStyle: initialData?.closingStyle || '',
    cta: initialData?.cta || '',
    disallowPhrases: initialData?.disallowPhrases || [],
    sections: initialData?.sections || [],
    references: initialData?.references || [],
  });

  const [keywordInput, setKeywordInput] = React.useState('');

  const handleInputChange = (field: keyof BlogRules, value: string | string[] | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleKeywordAdd = () => {
    if (keywordInput.trim()) {
      handleInputChange('targetKeywords', [...formData.targetKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleKeywordRemove = (index: number) => {
    handleInputChange('targetKeywords', formData.targetKeywords.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  React.useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      handleInputChange('slug', slug);
    }
  }, [formData.title, formData.slug]);

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <CardContent
        sx={{
          p: 3,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 1,
              fontSize: '1.75rem',
            }}
          >
            Create Premium Content
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#94a3b8',
              fontSize: '0.95rem',
            }}
          >
            Generate high-converting blog posts with AI-powered precision
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: 'rgba(148, 163, 184, 0.1)' }} />

        {/* Form Content */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Blog Title */}
              <Box>
                <TextField
                  fullWidth
                  label="Blog Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  helperText="Enter a compelling title for your blog post"
                  slotProps={{
                    input: {
                      startAdornment: <Title sx={{ mr: 1, color: '#6366f1' }} />,
                    },
                    inputLabel: {
                      shrink: Boolean(formData.title),
                    }
                  }}
                  sx={inputFieldStyle}
                />
              </Box>

              {/* URL Slug */}
              <Box>
                <TextField
                  fullWidth
                  label="URL Slug"
                  value={formData.slug}
                  onChange={(e) => {
                    const manualSlug = e.target.value.toLowerCase().replace(/\s+/g, '-');
                    handleInputChange('slug', manualSlug);
                  }}
                  required
                  helperText="Auto-generated from title, but you can edit it manually"
                  slotProps={{
                    input: {
                      startAdornment: <Link sx={{ mr: 1, color: '#6366f1' }} />,
                    },
                    inputLabel: {
                      shrink: Boolean(formData.slug),
                    }
                  }}
                  sx={inputFieldStyle}
                />
              </Box>

              {/* Meta Description */}
              <Box>
                <TextField
                  fullWidth
                  label="Meta Description"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  required
                  multiline
                  rows={3}
                  helperText="SEO description for search engines (150-160 characters)"
                  slotProps={{
                    input: {
                      startAdornment: <Description sx={{ mr: 1, color: '#6366f1', alignSelf: 'flex-start', mt: 1 }} />,
                    },
                    inputLabel: {
                      shrink: Boolean(formData.metaDescription),
                    }
                  }}
                  sx={inputFieldStyle}
                />
              </Box>

              <Divider sx={{ my: 1, borderColor: 'rgba(148, 163, 184, 0.1)' }} />

              {/* Two Column Layout for Intent and Content Type */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                {/* Intent Selection */}
                <Box>
                  <FormControl fullWidth required>
                    <InputLabel>Content Intent</InputLabel>
                    <Select
                      value={formData.intent}
                      onChange={(e) => handleInputChange('intent', e.target.value)}
                      label="Content Intent"
                      sx={selectFieldStyle}
                    >
                      {intentOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ color: '#6366f1' }}>{option.icon}</Box>
                            <Typography sx={{ color: '#f8fafc', fontSize: '0.9rem' }}>{option.label}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>What&apos;s the primary goal of this content?</FormHelperText>
                  </FormControl>
                </Box>

                {/* Content Type */}
                <Box>
                  <FormControl fullWidth required>
                    <InputLabel>Content Type</InputLabel>
                    <Select
                      value={formData.contentType}
                      onChange={(e) => handleInputChange('contentType', e.target.value)}
                      label="Content Type"
                      sx={selectFieldStyle}
                    >
                      {contentTypeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ color: '#6366f1' }}><Category /></Box>
                            <Typography sx={{ color: '#f8fafc', fontSize: '0.9rem' }}>{option}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>What type of content are you creating?</FormHelperText>
                  </FormControl>
                </Box>
              </Box>

              {/* Two Column Layout for Hook Type and Closing Style */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                {/* Hook Type */}
                <Box>
                  <FormControl fullWidth required>
                    <InputLabel>Hook Type</InputLabel>
                    <Select
                      value={formData.hookType}
                      onChange={(e) => handleInputChange('hookType', e.target.value)}
                      label="Hook Type"
                      sx={selectFieldStyle}
                    >
                      {hookTypeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Typography sx={{ color: '#f8fafc', fontSize: '0.9rem' }}>{option}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>How will you grab reader attention?</FormHelperText>
                  </FormControl>
                </Box>

                {/* Closing Style */}
                <Box>
                  <FormControl fullWidth required>
                    <InputLabel>Closing Style</InputLabel>
                    <Select
                      value={formData.closingStyle}
                      onChange={(e) => handleInputChange('closingStyle', e.target.value)}
                      label="Closing Style"
                      sx={selectFieldStyle}
                    >
                      {closingStyleOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Typography sx={{ color: '#f8fafc', fontSize: '0.9rem' }}>{option}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>How should the post conclude?</FormHelperText>
                  </FormControl>
                </Box>
              </Box>

              {/* Keywords */}
              <Box>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, fontSize: '0.875rem' }}>
                  Target Keywords
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Add SEO keywords..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleKeywordAdd())}
                    sx={inputFieldStyle}
                  />
                  <IconButton
                    onClick={handleKeywordAdd}
                    sx={{
                      backgroundColor: '#6366f1',
                      color: '#ffffff',
                      '&:hover': { backgroundColor: '#4f46e5' },
                      width: '48px',
                      height: '48px',
                    }}
                  >
                    <AddCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.targetKeywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      onDelete={() => handleKeywordRemove(index)}
                      deleteIcon={<RemoveCircle />}
                      sx={{
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        color: '#6366f1',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Call to Action */}
              <Box>
                <TextField
                  fullWidth
                  label="Call to Action"
                  value={formData.cta}
                  onChange={(e) => handleInputChange('cta', e.target.value)}
                  required
                  placeholder="Book a consultation, Learn more, etc."
                  slotProps={{
                    input: {
                      startAdornment: <KeyboardDoubleArrowRight sx={{ mr: 1, color: '#6366f1' }} />,
                    },
                    inputLabel: {
                      shrink: Boolean(formData.cta),
                    }
                  }}
                  sx={inputFieldStyle}
                />
              </Box>

              {/* Disallowed Phrases */}
              <Box>
                <TextField
                  fullWidth
                  label="Disallowed Phrases"
                  value={formData.disallowPhrases.join(', ')}
                  onChange={(e) => handleInputChange('disallowPhrases', e.target.value.split(',').map(p => p.trim()))}
                  helperText="Comma-separated phrases to avoid"
                  multiline
                  rows={2}
                  slotProps={{
                    input: {
                      startAdornment: <Block sx={{ mr: 1, color: '#6366f1', alignSelf: 'flex-start', mt: 1 }} />,
                    }
                  }}
                  sx={inputFieldStyle}
                />
              </Box>
            </Box>
          </form>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 'auto', pt: 3 }}>
          <Button
            type="submit"
            fullWidth
            size="large"
            disabled={isLoading}
            onClick={handleSubmit}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 600,
              py: 2,
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
              '&:disabled': {
                background: 'rgba(148, 163, 184, 0.2)',
                boxShadow: 'none',
              },
            }}
            startIcon={<AutoAwesome sx={{ fontSize: 24 }} />}
          >
            {isLoading ? 'Generating Magic...' : 'Generate Blog Post'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}