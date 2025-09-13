import { useTheme, useMediaQuery } from '@mui/material';

interface AnimationConfig {
  duration: number;
  delay?: number;
  stagger?: number;
}

export const useMobileAnimation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const getAnimationConfig = (config: AnimationConfig = { duration: 0.5 }) => {
    let baseDuration = config.duration;
    let baseDelay = config.delay || 0;
    let baseStagger = config.stagger || 0.1;

    if (isMobile) {
      baseDuration = config.duration * 0.6; // Faster animations on mobile
      baseDelay = config.delay ? config.delay * 0.4 : 0;
      baseStagger = config.stagger ? config.stagger * 0.5 : 0.08;
    } else if (isTablet) {
      baseDuration = config.duration * 0.8;
      baseDelay = config.delay ? config.delay * 0.7 : 0;
      baseStagger = config.stagger ? config.stagger * 0.7 : 0.09;
    }

    return {
      duration: baseDuration,
      delay: baseDelay,
      stagger: baseStagger,
    };
  };

  const getInitialProps = (direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
    let distance = 20;

    if (isMobile) {
      distance = 8; // Subtle movements on mobile
    } else if (isTablet) {
      distance = 14;
    }

    const directions = {
      left: { x: -distance, y: 0 },
      right: { x: distance, y: 0 },
      up: { x: 0, y: -distance },
      down: { x: 0, y: distance },
    };

    return {
      opacity: 0,
      ...directions[direction],
    };
  };

  const getAnimateProps = () => ({
    opacity: 1,
    x: 0,
    y: 0,
  });

  const getScaleProps = (initialScale = 0.8) => {
    let mobileScale = initialScale;

    if (isMobile) {
      mobileScale = initialScale + 0.15; // Less dramatic scale on mobile
    } else if (isTablet) {
      mobileScale = initialScale + 0.08;
    }

    return {
      initial: { opacity: 0, scale: mobileScale },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: mobileScale },
    };
  };

  const getHoverProps = () => ({
    whileHover: isMobile ? {} : { scale: 1.02, y: -2 },
    whileTap: {
      scale: isMobile ? 0.96 : 0.98,
      transition: { duration: 0.1 }
    },
  });

  const getStaggerProps = (index: number, baseDelay = 0) => {
    const staggerDelay = getAnimationConfig().stagger;
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: baseDelay + (index * staggerDelay),
        duration: getAnimationConfig().duration
      }
    };
  };

  const getButtonProps = () => ({
    whileHover: isMobile ? {} : { scale: 1.05 },
    whileTap: { scale: isMobile ? 0.94 : 0.96 },
    transition: {
      type: "spring",
      stiffness: isMobile ? 400 : 300,
      damping: isMobile ? 25 : 20
    }
  });

  const getCardProps = () => ({
    initial: { opacity: 0, y: isMobile ? 15 : 25 },
    animate: { opacity: 1, y: 0 },
    whileHover: isMobile ? {} : {
      y: -3,
      transition: { duration: 0.2 }
    },
    transition: {
      duration: getAnimationConfig().duration,
      ease: "easeOut"
    }
  });

  return {
    getAnimationConfig,
    getInitialProps,
    getAnimateProps,
    getScaleProps,
    getHoverProps,
    getStaggerProps,
    getButtonProps,
    getCardProps,
    isMobile,
    isTablet,
  };
};