'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  AlertTitle,
  Paper,
  useTheme,
  alpha,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
} from '@mui/material';
import {
  Download,
  Article,
  Settings,
  Visibility,
  RocketLaunch,
  CheckCircle,
  Error,
  Warning,
  Info,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { BlogRules } from '@/types/blog';

interface PremiumPreviewProps {
  blogRules: BlogRules | null;
  generatedContent: string;
  isLoading: boolean;
  error?: string | null;
}

export default function PremiumPreview({ blogRules, generatedContent, isLoading, error }: PremiumPreviewProps) {
  const theme = useTheme();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const generatePreviewHTML = () => {
    if (!blogRules || !generatedContent) return '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${blogRules.title}</title>
    <meta name="description" content="${blogRules.metaDescription}">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #1f2937;
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        .container {
            background: white;
            padding: 60px;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        h1 {
            font-size: 3rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        h2 {
            font-size: 2.25rem;
            font-weight: 700;
            color: #334155;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            line-height: 1.3;
        }
        h3 {
            font-size: 1.75rem;
            font-weight: 600;
            color: #475569;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.4;
        }
        p {
            margin-bottom: 1.5rem;
            color: #475569;
            font-size: 1.125rem;
            line-height: 1.7;
        }
        ul {
            margin-bottom: 1.5rem;
            padding-left: 2rem;
        }
        li {
            margin-bottom: 0.75rem;
            color: #475569;
            font-size: 1.125rem;
            line-height: 1.7;
        }
        strong {
            font-weight: 600;
            color: #1e293b;
        }
        .cta {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            display: inline-block;
            margin-top: 3rem;
            font-weight: 600;
            font-size: 1.125rem;
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
            transition: all 0.3s ease;
        }
        .cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.4);
        }
        .metadata {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 3rem;
            border: 1px solid rgba(148, 163, 184, 0.1);
        }
        .metadata-item {
            display: inline-block;
            margin-right: 2rem;
            margin-bottom: 0.5rem;
            color: #64748b;
            font-size: 0.875rem;
            font-weight: 500;
        }
        .metadata-value {
            color: #334155;
            font-weight: 600;
        }
        @media (max-width: 768px) {
            body {
                padding: 20px;
            }
            .container {
                padding: 30px;
            }
            h1 {
                font-size: 2.25rem;
            }
            h2 {
                font-size: 1.875rem;
            }
            h3 {
                font-size: 1.5rem;
            }
            p, li {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="metadata">
            <div class="metadata-item">Generated by: <span class="metadata-value">EdgePress AI</span></div>
            <div class="metadata-item">Intent: <span class="metadata-value">${blogRules.intent}</span></div>
            <div class="metadata-item">Reading Level: <span class="metadata-value">${blogRules.readingGrade}th Grade</span></div>
            <div class="metadata-item">Content Type: <span class="metadata-value">${blogRules.contentType}</span></div>
        </div>
        ${generatedContent}
    </div>
</body>
</html>`;
  };

  const downloadHTML = () => {
    if (!blogRules || !generatedContent) return;

    setIsDownloading(true);

    const fullHTML = generatePreviewHTML();

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${blogRules.slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsDownloading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          border: '1px solid rgba(148, 163, 184, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Article sx={{
                  fontSize: 32,
                  color: '#6366f1',
                  filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))'
                }} />
              </motion.div>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Blog Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your premium content, ready to download
                </Typography>
              </Box>
            </Box>

            {blogRules && !isLoading && generatedContent && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonGroup>
                  <Button
                    onClick={downloadHTML}
                    disabled={isDownloading}
                    variant="contained"
                    startIcon={<Download />}
                    sx={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                      },
                      '&:disabled': {
                        background: 'rgba(148, 163, 184, 0.2)',
                      },
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </Button>
                  <Button
                    onClick={() => setPreviewOpen(true)}
                    variant="contained"
                    startIcon={<Visibility />}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
                      },
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    Preview
                  </Button>
                </ButtonGroup>
              </motion.div>
            )}
          </Box>

          {/* Error/Status Alerts */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 2 }}
              icon={<Error />}
            >
              <AlertTitle>Generation Error</AlertTitle>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <Box sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <CircularProgress
                  size={64}
                  thickness={2}
                  sx={{
                    color: '#6366f1',
                    filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))',
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Crafting Your Premium Content
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Our AI is generating professional blog content...
                </Typography>
              </motion.div>
            </Box>
          )}

          {/* Content Display */}
          {generatedContent && !isLoading && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Content Stats */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  background: alpha('#6366f1', 0.1),
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Chip
                    icon={<Visibility />}
                    label={`Intent: ${blogRules?.intent}`}
                    size="small"
                    sx={{
                      background: alpha('#6366f1', 0.2),
                      color: '#cbd5e1',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                    }}
                  />
                  <Chip
                    icon={<Settings />}
                    label={`${blogRules?.readingGrade}th Grade`}
                    size="small"
                    sx={{
                      background: alpha('#10b981', 0.2),
                      color: '#cbd5e1',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  />
                  <Chip
                    icon={<Article />}
                    label={`~${blogRules?.wordTarget} words`}
                    size="small"
                    sx={{
                      background: alpha('#f59e0b', 0.2),
                      color: '#cbd5e1',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}
                  />
                </Box>
              </Paper>

              {/* Content Preview */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 4,
                  background: alpha('#0f172a', 0.5),
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: '#f1f5f9',
                  }}
                >
                  Content Preview
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    overflow: 'auto',
                    maxHeight: 400,
                    '& img': {
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: 1,
                    },
                    '& h1, & h2, & h3': {
                      color: '#f1f5f9',
                      mt: 2,
                      mb: 1,
                    },
                    '& p': {
                      color: '#cbd5e1',
                      mb: 1.5,
                      lineHeight: 1.7,
                    },
                    '& ul, & ol': {
                      color: '#cbd5e1',
                      mb: 1.5,
                    },
                    '& strong': {
                      color: '#f1f5f9',
                      fontWeight: 600,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: generatedContent }}
                />
              </Paper>
            </Box>
          )}

          {/* Empty State */}
          {!generatedContent && !isLoading && !error && (
            <Box sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              textAlign: 'center',
            }}>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Article sx={{
                  fontSize: 80,
                  color: '#475569',
                  mb: 4,
                }} />
              </motion.div>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#f1f5f9' }}>
                Ready to Create
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Configure your blog settings and generate premium content
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  icon={<RocketLaunch />}
                  label="Start Creating"
                  color="primary"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    fontWeight: 600,
                    px: 3,
                    py: 2,
                  }}
                />
              </motion.div>
            </Box>
          )}

          {/* Configuration Summary */}
          {blogRules && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3, borderColor: 'rgba(148, 163, 184, 0.1)' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Settings sx={{ color: '#6366f1' }} />
                Configuration Summary
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr' }, gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Title</Typography>
                  <Typography variant="body1" fontWeight={500} color="#f1f5f9">
                    {blogRules.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Content Type</Typography>
                  <Typography variant="body1" fontWeight={500} color="#f1f5f9">
                    {blogRules.contentType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Call to Action</Typography>
                  <Typography variant="body1" fontWeight={500} color="#f1f5f9">
                    {blogRules.cta}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Target Keywords</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {blogRules.targetKeywords.filter(k => k.trim()).map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                          borderColor: 'rgba(99, 102, 241, 0.3)',
                          color: '#94a3b8',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            minHeight: '80vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2,
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Visibility sx={{ color: '#6366f1' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
              Blog Preview
            </Typography>
          </Box>
          <IconButton
            onClick={() => setPreviewOpen(false)}
            sx={{
              color: '#94a3b8',
              '&:hover': {
                color: '#f1f5f9',
                background: 'rgba(148, 163, 184, 0.1)',
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 0,
            background: '#0f172a',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '70vh',
              overflow: 'auto',
              '& iframe': {
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'white',
              },
            }}
          >
            {blogRules && generatedContent && (
              <iframe
                srcDoc={generatePreviewHTML()}
                title="Blog Preview"
                sandbox="allow-same-origin"
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            background: alpha('#0f172a', 0.5),
          }}
        >
          <Button
            onClick={() => setPreviewOpen(false)}
            variant="outlined"
            sx={{
              borderColor: 'rgba(148, 163, 184, 0.3)',
              color: '#cbd5e1',
              '&:hover': {
                borderColor: 'rgba(148, 163, 184, 0.5)',
                background: 'rgba(148, 163, 184, 0.1)',
              },
            }}
          >
            Close
          </Button>
          <Button
            onClick={downloadHTML}
            disabled={isDownloading}
            variant="contained"
            startIcon={<Download />}
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
              },
            }}
          >
            {isDownloading ? 'Downloading...' : 'Download HTML'}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}