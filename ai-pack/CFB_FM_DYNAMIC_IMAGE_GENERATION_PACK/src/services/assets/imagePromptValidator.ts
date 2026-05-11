import type { NewsImageContext } from "../../domain/assets/newsImage";

export type ImagePromptValidationResult = {
  passed: boolean;
  errors: string[];
};

export function validateImagePrompt(input: {
  prompt: string;
  context: NewsImageContext;
}): ImagePromptValidationResult {
  const errors: string[] = [];
  const prompt = input.prompt.toLowerCase();

  const forbiddenPatterns = [
    { pattern: /\barrest(ed)?\b/, label: "arrest" },
    { pattern: /\bsuspended\b/, label: "suspension" },
    { pattern: /\binjured\b|\binjury\b/, label: "injury" },
    { pattern: /\$[0-9]/, label: "dollar amount" },
    { pattern: /\bnike\b|\badidas\b|\bunder armour\b/i, label: "real brand" },
    { pattern: /\bespn\b|\bfox sports\b|\bcbs\b/i, label: "real media brand" }
  ];

  for (const item of forbiddenPatterns) {
    if (item.pattern.test(prompt)) {
      const explicitlyAllowed = input.context.allowedFacts.some(f =>
        f.toLowerCase().includes(item.label)
      );

      if (!explicitlyAllowed) {
        errors.push(`Prompt contains unsupported ${item.label} reference.`);
      }
    }
  }

  for (const forbidden of input.context.forbiddenClaims) {
    if (prompt.includes(forbidden.toLowerCase())) {
      errors.push(`Prompt includes forbidden claim: ${forbidden}`);
    }
  }

  return {
    passed: errors.length === 0,
    errors
  };
}
