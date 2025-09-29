// eslint.config.js
import globals from 'globals';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  { ignores: ['dist', '.next'] }, // bỏ qua dist và .next
  js.configs.recommended, // ✅ áp dụng các rule JS cơ bản
  ...tseslint.configs.recommended, // ✅ áp dụng các rule TypeScript khuyến nghị
  ...pluginQuery.configs['flat/recommended'], // ✅ áp dụng các rule TanStack Query
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // ✅ để lint được cả file server-side (API routes, next.config.mjs,…)
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@next/next': nextPlugin, // ✅ plugin next.js
    },
    rules: {
      // Next.js core web vitals rules
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'error',
      '@next/next/no-title-in-document-head': 'error',

      // React hooks
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error', // nên bật lại cho an toàn
      'react-refresh/only-export-components': 'off',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/exhaustive-deps': 'off',

      // JS
      'no-console': 'error',
      'no-unused-vars': 'off',
      'no-duplicate-imports': 'error',
    },
  }
);
