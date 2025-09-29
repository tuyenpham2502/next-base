import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Server-side env
    SERVER_URL: z.string().url().optional(),
  },

  /**
   * Prefix cho biến môi trường client-side.
   /**
    * Trong Next.js, tất cả biến muốn expose ra client phải bắt đầu bằng NEXT_PUBLIC_
    */
  client: {
    // App Configuration
    NEXT_PUBLIC_APP_TITLE: z.string().min(1).optional(),

    // API Configuration
    NEXT_PUBLIC_APP_API_URL: z.string().url(),
    NEXT_PUBLIC_APP_TIMEOUT: z
      .string()
      .regex(/^\d+$/)
      .transform(Number)
      .optional()
      .default(30000),

    // Development Configuration
    NEXT_PUBLIC_APP_ENABLE_LOGGER: z
      .enum(['true', 'false'])
      .optional()
      .default('false'),

    // Optional Configuration
    NEXT_PUBLIC_APP_ENVIRONMENT: z
      .enum(['development', 'staging', 'production'])
      .optional(),
    NEXT_PUBLIC_APP_VERSION: z.string().optional(),
  },

  /**
   /**
    * Trong Next.js runtime env nằm ở process.env
    * Đảm bảo ép kiểu cho runtimeEnv để tránh lỗi thiếu thuộc tính
    */
  runtimeEnv: {
    SERVER_URL: process.env.SERVER_URL,
    NEXT_PUBLIC_APP_TITLE: process.env.NEXT_PUBLIC_APP_TITLE,
    NEXT_PUBLIC_APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
    NEXT_PUBLIC_APP_TIMEOUT: process.env.NEXT_PUBLIC_APP_TIMEOUT,
    NEXT_PUBLIC_APP_ENABLE_LOGGER: process.env.NEXT_PUBLIC_APP_ENABLE_LOGGER,
    NEXT_PUBLIC_APP_ENVIRONMENT: process.env.NEXT_PUBLIC_APP_ENVIRONMENT,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  },

  emptyStringAsUndefined: true,
});
