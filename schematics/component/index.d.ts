import { Rule } from '@angular-devkit/schematics';
interface ComponentOptions {
    name: string;
    project?: string;
    path?: string;
}
export declare function component(options: ComponentOptions): Rule;
export {};
