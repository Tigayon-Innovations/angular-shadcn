import { Rule } from '@angular-devkit/schematics';
interface NgAddOptions {
    project?: string;
    skipInstall?: boolean;
    skipStyles?: boolean;
}
export declare function ngAdd(options: NgAddOptions): Rule;
export {};
