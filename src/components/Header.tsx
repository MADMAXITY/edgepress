'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  AutoAwesome,
  RocketLaunch,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useMobileAnimation } from '@/hooks/useMobileAnimation';

export default function Header() {
  const theme = useTheme();
  const mobileAnimation = useMobileAnimation();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'rgba(5, 6, 23, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.06)',
      }}
    >
      <Toolbar sx={{
        py: { xs: 0.75, sm: 1, md: 1.5, lg: 2 },
        minHeight: { xs: 48, sm: 56, md: 64, lg: 72 },
        px: { xs: 1, sm: 2, md: 3 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2, md: 3 }, flexGrow: 1 }}>
          <motion.div
            whileHover={mobileAnimation.isMobile ? {} : { rotate: 360 }}
            whileTap={mobileAnimation.isMobile ? { scale: 0.9 } : {}}
            transition={{
              duration: mobileAnimation.isMobile ? 0.8 : 0.6,
              ease: 'easeInOut'
            }}
          >
            <Box
              sx={{
                width: { xs: 36, sm: 42, md: 48, lg: 56 },
                height: { xs: 36, sm: 42, md: 48, lg: 56 },
                borderRadius: { xs: 10, sm: 12, md: 14, lg: 16 },
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: mobileAnimation.isMobile ? '0 4px 14px rgba(99, 102, 241, 0.4)' : '0 6px 20px rgba(99, 102, 241, 0.6)',
                  transform: mobileAnimation.isMobile ? 'scale(1)' : 'scale(1.05)',
                },
                '&:active': {
                  transform: mobileAnimation.isMobile ? 'scale(0.95)' : 'scale(1.02)',
                },
              }}
            >
              <AutoAwesome sx={{
                color: 'white',
                fontSize: { xs: 18, sm: 20, md: 22, lg: 28 },
                filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))',
              }} />
            </Box>
          </motion.div>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: { xs: '-0.01em', sm: '-0.01em', md: '-0.01em' },
                lineHeight: { xs: 1.1, sm: 1.2, md: 1.2 },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {mobileAnimation.isMobile ? 'EdgePress' : 'EdgePress AI'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.875rem' },
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: { xs: 0.5, sm: 0.75, md: 1 },
                fontWeight: 500,
                mt: { xs: 0.1, sm: 0.25 },
                whiteSpace: 'nowrap',
              }}
            >
              <Star sx={{
                fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.875rem' },
                color: '#fbbf24',
                filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.4))',
              }} />
              {mobileAnimation.isMobile ? 'Blog Generator' : 'Professional Blog Generator'}
            </Typography>
          </Box>
        </Box>

        <motion.div
          whileHover={mobileAnimation.isMobile ? {} : { scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.1 }}
        >
          <IconButton
            size="large"
            sx={{
              width: { xs: 36, sm: 40, md: 44, lg: 52 },
              height: { xs: 36, sm: 40, md: 44, lg: 52 },
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              borderRadius: { xs: 8, sm: 10, md: 12 },
              transition: 'all 0.15s ease',
              '&:hover': {
                background: 'rgba(99, 102, 241, 0.12)',
                borderColor: 'rgba(99, 102, 241, 0.25)',
                transform: mobileAnimation.isMobile ? 'translateY(0)' : 'translateY(-1px)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <RocketLaunch sx={{
              color: '#6366f1',
              fontSize: { xs: 16, sm: 18, md: 20, lg: 24 },
              filter: 'drop-shadow(0 0 3px rgba(99, 102, 241, 0.3))',
            }} />
          </IconButton>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}