'use client';

import { useState } from 'react';
import { BlogRules } from '@/types/blog';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import PremiumForm from '@/components/PremiumForm';
import PremiumPreview from '@/components/PremiumPreview';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [blogRules, setBlogRules] = useState<BlogRules | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (rules: BlogRules) => {
    setIsLoading(true);
    setBlogRules(rules);
    setGeneratedContent('');
    setError(null);

    try {
      // Generate outline
      const outlineResponse = await fetch('/api/generate/outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules, allowFallbacks: true })
      });

      if (!outlineResponse.ok) {
        throw new Error('Failed to generate outline');
      }

      // Generate content
      const contentResponse = await fetch('/api/generate/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules, allowFallbacks: true })
      });

      if (!contentResponse.ok) {
        throw new Error('Failed to generate content');
      }

      const content = await contentResponse.json();
      setGeneratedContent(content.htmlContent);
    } catch (error) {
      console.error('Generation error:', error);
      setError('Failed to generate blog content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #050617 0%, #0f172a 50%, #1e293b 100%)',
      }}
    >
      <Header />

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          px: { xs: 1, sm: 1.5, md: 2, lg: 4, xl: 6 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '1fr',
              lg: '1fr 1fr'
            },
            gap: { xs: 3, sm: 4, md: 5, lg: 6 },
            alignItems: 'stretch',
            minHeight: { xs: 'auto', sm: '70vh', md: '75vh', lg: '80vh' },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <PremiumForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              initialData={blogRules || undefined}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            <PremiumPreview
              blogRules={blogRules}
              generatedContent={generatedContent}
              isLoading={isLoading}
              error={error}
            />
          </motion.div>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}