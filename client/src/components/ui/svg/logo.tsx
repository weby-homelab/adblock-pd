import React, { memo } from 'react';

type Props = {
    className?: string;
};

export const Logo = memo(({ className }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="40" viewBox="0 0 220 40" className={className}>
            <defs>
                <linearGradient id="pdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0072ff', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
                {/* Shield Icon - Always visible blue gradient */}
                <path
                    d="M20 0C25 0 32 1.5 36 4C36 10 36.5 22 20 32C3.5 22 4 10 4 4C8 1.5 15 0 20 0Z"
                    fill="url(#pdGradient)"
                />
                {/* Inner shield highlight */}
                <path
                    d="M20 6C23 6 28 7 30 9C30 14 30.5 20 20 26C9.5 20 10 14 10 9C12 7 17 6 20 6Z"
                    fill="#FFFFFF"
                    opacity="0.2"
                />
                {/* Text ADBlock - uses currentColor to adapt to theme (black/white) */}
                <text
                    x="45"
                    y="28"
                    fontFamily="Arial, sans-serif"
                    fontSize="22"
                    fontWeight="bold"
                    fill="currentColor"
                    className="logo-text-base"
                >
                    ADBlock
                </text>
                {/* Text -PD - stays bright for accent */}
                <text
                    x="135"
                    y="28"
                    fontFamily="Arial, sans-serif"
                    fontSize="22"
                    fontWeight="bold"
                    fill="url(#pdGradient)"
                    className="logo-text-accent"
                >
                    -PD
                </text>
            </g>
        </svg>
    );
});

Logo.displayName = 'Logo';
