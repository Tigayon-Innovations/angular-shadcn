import { Rule } from '@angular-devkit/schematics';
type ThemeVariant = 'shadcn' | 'github' | 'vercel' | 'apple' | 'openai' | 'clickup' | 'linear';
interface NgAddOptions {
  project?: string;
  theme?: ThemeVariant;
  skipInstall?: boolean;
  skipStyles?: boolean;
  components?: string;
}
export declare function ngAdd(options: NgAddOptions): Rule;
export {};
