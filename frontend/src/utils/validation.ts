import { z } from 'zod'

/**
 * Validation schemas using Zod
 */

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    full_name: z.string().optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })

export const dreamSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  content: z
    .string()
    .min(10, 'Dream description must be at least 10 characters')
    .max(5000, 'Dream description must be less than 5000 characters'),
  dream_date: z.string(),
  mood: z.enum(['positive', 'negative', 'neutral', 'mixed']).optional(),
  is_istikhara: z.boolean().default(false),
  is_public: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
})

export const profileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  full_name: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment must be less than 1000 characters'),
})

export const sleepEntrySchema = z.object({
  sleep_date: z.string(),
  bedtime: z.string(),
  wake_time: z.string(),
  sleep_quality: z.number().min(1).max(5),
  notes: z.string().max(500).optional(),
})
