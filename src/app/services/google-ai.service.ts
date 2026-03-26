import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

interface GenerationConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
}

interface SafetySetting {
  category: string;
  threshold: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface Part {
  text?: string;
  inlineData?: {
    data: string;
    mimeType: string;
  };
}

const THEME_GENERATION_PROMPT = `You are an expert UI/UX designer and color theory specialist. Your task is to generate harmonious CSS theme color palettes.

You have deep knowledge of brand colors (e.g., Angular red, React blue, Vue green) and modern design systems (Material, Tailwind, Shadcn). When a user asks for a theme related to a specific brand, framework, or concept, use its signature colors and aesthetic as the foundation for the primary palette.

When given a description, generate a complete theme with both light and dark mode colors in OKLCH format.

OKLCH format: oklch(lightness chroma hue)
- Lightness: 0-1 (0 = black, 1 = white)
- Chroma: 0-0.4 (0 = gray, higher = more saturated)
- Hue: 0-360 (color wheel degrees)

Guidelines:
1. Ensure good contrast ratios (WCAG AA: 4.5:1 for text)
2. Primary colors should be vibrant and stand out
3. Background/foreground should have high contrast
4. Muted colors should be subtle versions of the theme
5. Dark mode should invert lightness while maintaining harmony
6. Keep chroma values reasonable (0.1-0.25 for most colors)`;

/**
 * Service for interacting with Google's Generative AI (Gemini)
 * Used for AI-powered theme generation in the theme editor
 */
@Injectable({ providedIn: 'root' })
export class GoogleAiService {
  private readonly API_KEY = environment.googleAiApiKey;
  private readonly MODEL = 'gemini-flash-lite-latest';
  private readonly BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

  private readonly generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 7900,
  };

  private readonly safetySettings: SafetySetting[] = [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_LOW_AND_ABOVE',
    },
  ];

  private chatHistory: ChatMessage[] = [
    {
      role: 'user',
      parts: [{ text: THEME_GENERATION_PROMPT }],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'I understand. I will generate harmonious CSS theme palettes in OKLCH format following the guidelines provided. Ready to create beautiful themes!',
        },
      ],
    },
  ];

  /**
   * Generate content from a text prompt
   */
  async prompt(text: string): Promise<string> {
    const response = await fetch(
      `${this.BASE_URL}/${this.MODEL}:generateContent?key=${this.API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          systemInstruction: {
            parts: [{ text: THEME_GENERATION_PROMPT }],
          },
          generationConfig: this.generationConfig,
          safetySettings: this.safetySettings,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  /**
   * Generate content and parse as JSON
   */
  async promptAsJson<T>(prompt: string): Promise<T> {
    const response = await this.prompt(prompt);
    const jsonString = response.replace(/```json?|```/g, '').trim();
    return JSON.parse(jsonString) as T;
  }

  /**
   * Chat with Gemini using conversation history
   */
  async chatWithGemini(text: string): Promise<string> {
    // Add user message to history
    this.chatHistory.push({
      role: 'user',
      parts: [{ text }],
    });

    const response = await fetch(
      `${this.BASE_URL}/${this.MODEL}:generateContent?key=${this.API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: this.chatHistory,
          systemInstruction: {
            parts: [{ text: THEME_GENERATION_PROMPT }],
          },
          generationConfig: this.generationConfig,
          safetySettings: this.safetySettings,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Add model response to history
    this.chatHistory.push({
      role: 'model',
      parts: [{ text: responseText }],
    });

    return responseText;
  }

  /**
   * Chat with file attachments (images, etc.)
   */
  async chatWithFileAttachments(
    text: string,
    files: { data: string; mimeType: string }[],
    isJson = false,
  ): Promise<string | object> {
    try {
      const fileParts: Part[] = files.map((file) => {
        let data = file.data;
        // Extract base64 data if it includes the data URL prefix
        if (typeof data === 'string' && data.includes(',')) {
          data = data.split(',')[1];
        }
        return {
          inlineData: {
            data,
            mimeType: file.mimeType,
          },
        };
      });

      const parts: Part[] = [...fileParts, { text }];

      const response = await fetch(
        `${this.BASE_URL}/${this.MODEL}:generateContent?key=${this.API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts }],
            systemInstruction: {
              parts: [{ text: THEME_GENERATION_PROMPT }],
            },
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (isJson) {
        try {
          const jsonString = responseText.replace(/```json?|```/g, '').trim();
          return JSON.parse(jsonString);
        } catch {
          console.error('Error parsing JSON response');
          return responseText;
        }
      }

      return responseText;
    } catch (error) {
      console.error('Error in Gemini API call:', error);
      throw error;
    }
  }

  /**
   * Generate a theme from a description
   */
  async generateTheme(
    description: string,
  ): Promise<Record<string, { light: string; dark: string }>> {
    const prompt = `Generate a CSS color theme based on this description: "${description}".

CRITICAL: If the description refers to a specific brand or framework (e.g., "Angular", "React", "Vue", "Tailwind"), you MUST use its official brand colors as the primary palette.
For "Angular", use the iconic Red (#DD0031), Purple (#C3002F), and Pink/Magenta gradients. Do NOT use generic blue unless specifically asked.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "primary": { "light": "oklch(L C H)", "dark": "oklch(L C H)" },
  "secondary": { "light": "oklch(L C H)", "dark": "oklch(L C H)" },
  "accent": { "light": "oklch(L C H)", "dark": "oklch(L C H)" },
  "background": { "light": "oklch(1 0 0)", "dark": "oklch(0.15 0 0)" },
  "foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" },
  "card": { "light": "oklch(1 0 0)", "dark": "oklch(0.2 0 0)" },
  "card-foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" },
  "border": { "light": "oklch(0.92 0 0)", "dark": "oklch(0.27 0 0)" },
  "input": { "light": "oklch(0.92 0 0)", "dark": "oklch(0.27 0 0)" },
  "ring": { "light": "oklch(L C H)", "dark": "oklch(L C H)" },
  "muted": { "light": "oklch(0.97 0.01 H)", "dark": "oklch(0.2 0.01 H)" },
  "muted-foreground": { "light": "oklch(0.55 0 0)", "dark": "oklch(0.65 0 0)" },
  "primary-foreground": { "light": "oklch(0.98 0 0)", "dark": "oklch(0.15 0 0)" },
  "secondary-foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" },
  "accent-foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" }
}

Replace L, C, H with appropriate values:
- L (lightness): 0-1
- C (chroma): 0-0.4 (use 0 for neutrals, 0.1-0.25 for colors)
- H (hue): 0-360 degrees

Use the theme description to choose appropriate hues and saturation levels.
Ensure good contrast and accessibility.`;

    return this.promptAsJson<Record<string, { light: string; dark: string }>>(prompt);
  }

  /**
   * Reset chat history
   */
  resetChat(): void {
    this.chatHistory = [
      {
        role: 'user',
        parts: [{ text: THEME_GENERATION_PROMPT }],
      },
      {
        role: 'model',
        parts: [
          {
            text: 'I understand. I will generate harmonious CSS theme palettes in OKLCH format following the guidelines provided. Ready to create beautiful themes!',
          },
        ],
      },
    ];
  }
}
