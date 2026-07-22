import { defineConfig } from 'vitest/config';

export default defineConfig({
    define: {
        'process.env.APP_VERSION': JSON.stringify('1.0.8'),
    },
    test: {
        environment: 'jsdom',
        include: ['src/__tests__/**'],
    },
});

