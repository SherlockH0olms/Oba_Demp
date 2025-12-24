import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface EmojiRatingProps {
    onChange?: (rating: number) => void;
    value?: number;
    label?: string;
}

const ratingData = [
    { emoji: '😔', label: 'Pis', color: '#ef4444' },
    { emoji: '😕', label: 'Zəif', color: '#f97316' },
    { emoji: '😐', label: 'Normal', color: '#eab308' },
    { emoji: '🙂', label: 'Yaxşı', color: '#84cc16' },
    { emoji: '😍', label: 'Əla', color: '#22c55e' },
];

export default function EmojiRating({ onChange, value = 0, label = 'Qiymətləndir' }: EmojiRatingProps) {
    const [rating, setRating] = useState(value);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (newRating: number) => {
        setRating(newRating);
        onChange?.(newRating);
    };

    const displayRating = hoverRating || rating;
    const activeData = displayRating > 0 ? ratingData[displayRating - 1] : null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {/* Main label */}
            <Typography
                variant="caption"
                sx={{
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    color: 'text.secondary',
                    fontWeight: 500
                }}
            >
                {label}
            </Typography>

            {/* Emoji buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {ratingData.map((item, i) => {
                    const emojiValue = i + 1;
                    const isActive = emojiValue <= displayRating;
                    const isExact = emojiValue === displayRating;

                    return (
                        <motion.button
                            key={emojiValue}
                            onClick={() => handleClick(emojiValue)}
                            onMouseEnter={() => setHoverRating(emojiValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                scale: isExact ? 1.2 : 1,
                                filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                                opacity: isActive ? 1 : 0.4,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '2.5rem',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '16px',
                                outline: 'none',
                            }}
                            aria-label={`Rate ${emojiValue}: ${item.label}`}
                        >
                            {item.emoji}
                        </motion.button>
                    );
                })}
            </Box>

            {/* Dynamic label */}
            <Box sx={{ position: 'relative', height: 28, width: 120 }}>
                {/* Default text */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: displayRating > 0 ? 0 : 1,
                        filter: displayRating > 0 ? 'blur(8px)' : 'blur(0)',
                        scale: displayRating > 0 ? 0.95 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Seç
                    </Typography>
                </motion.div>

                {/* Rating labels */}
                {ratingData.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={false}
                        animate={{
                            opacity: displayRating === i + 1 ? 1 : 0,
                            filter: displayRating === i + 1 ? 'blur(0)' : 'blur(8px)',
                            scale: displayRating === i + 1 ? 1 : 1.05,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: item.color,
                            }}
                        >
                            {item.label}
                        </Typography>
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
}
