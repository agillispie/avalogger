import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/themes/index.ts',
        'src/types/index.ts',
        'src/utils/index.ts',
    ],
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist',
    splitting: true,
    clean: true,
    shims: true,
    minify: true,
});