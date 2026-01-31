/**
 * Token counting utility using GPT tokenizer
 *
 * Uses the gpt-tokenizer package which supports:
 * - GPT-4, GPT-3.5, GPT-2, and other OpenAI models
 * - Works in browser environments
 * - Uses cl100k_base encoding (same as GPT-4/ChatGPT)
 */

import { encode } from "gpt-tokenizer";

export interface TokenCountResult {
  /** Number of tokens in the text */
  tokenCount: number;
  /** Character count for reference */
  charCount: number;
}

/**
 * Count tokens in a text string using GPT-4's tokenizer
 *
 * @param text - The text to count tokens for
 * @returns Token count result with token and character counts
 */
export function countTokens(text: string): TokenCountResult {
  if (!text || text.trim() === "") {
    return { tokenCount: 0, charCount: 0 };
  }

  try {
    const tokens = encode(text);
    return {
      tokenCount: tokens.length,
      charCount: text.length,
    };
  } catch {
    // Fallback: estimate tokens based on character count
    // Average English word is ~4-5 characters, and ~1.3 tokens per word
    // So roughly 1 token per 4 characters
    return {
      tokenCount: Math.ceil(text.length / 4),
      charCount: text.length,
    };
  }
}

/**
 * Calculate token savings between original and optimized text
 *
 * @param originalTokens - Token count of original text
 * @param optimizedTokens - Token count of optimized text
 * @returns Savings information
 */
export function calculateSavings(
  originalTokens: number,
  optimizedTokens: number
): {
  savedTokens: number;
  savedPercentage: number;
} {
  if (originalTokens === 0) {
    return { savedTokens: 0, savedPercentage: 0 };
  }

  const savedTokens = originalTokens - optimizedTokens;
  const savedPercentage = (savedTokens / originalTokens) * 100;

  return {
    savedTokens: Math.max(0, savedTokens),
    savedPercentage: Math.max(0, Math.round(savedPercentage * 10) / 10),
  };
}

/**
 * Format a large number with commas for display
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}
