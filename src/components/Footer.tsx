'use client';

import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        textAlign: 'center',
        borderTop: '1px solid rgba(148, 163, 184, 0.08)',
        background: 'rgba(5, 6, 23, 0.4)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            fontWeight: 500,
            mb: 1,
          }}
        >
          Powered by{' '}
          <Typography
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600,
            }}
          >
            EdgePress AI
          </Typography>
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: '#475569',
            display: 'block',
            fontSize: '0.75rem',
          }}
        >
          Crafted with precision for professional content creation
        </Typography>
      </motion.div>
    </Box>
  );
}