import { PurgeCSS } from 'purgecss';
import path from "path";
import fs from "fs";

type CssCleanerOptions = {
    output: string;
    input: string;
    /** Selectors that will be saved to the output file */
    selectors: (string | RegExp)[];
    /** Should PureCSS print the output? */
    shouldPrintOutput?: boolean;
    /** Should PureCSS print the selectors? */
    shouldPrintSelectors?: boolean;
}

const removeDataAttrs = (rawCss: string) => {
    return rawCss.replace(/\[data-[^=\]]*(="[^"]*")?]/g, '');
}

export function cssPurifier(config: CssCleanerOptions) {
    return {
        name: 'css-cleaner',
        async buildStart() {
            const filePath = path.resolve(process.cwd(), config.input);
            const rawCss = fs.readFileSync(filePath, 'utf8');
            const adaptedCss= removeDataAttrs(rawCss);
            const actualSelectors: string[] = [];
            const regexSelectors: string[] = [];

            config.selectors.forEach(selector => {
                selector instanceof RegExp
                    ? regexSelectors.push(selector.toString().replaceAll('/', ''))
                    : actualSelectors.push(selector.slice(1))
            })

            if (regexSelectors.length) {
                const regexParts = regexSelectors.map(selector => `${selector}[\\s\\S]*?\\{`);
                const regexPattern = regexParts.join('|');
                const regex = new RegExp(regexPattern, 'g');
                let match;

                if (config.shouldPrintSelectors) {
                    console.log('[PureCSS] Regex:', regex);
                }

                while ((match = regex.exec(adaptedCss)) !== null) {
                    actualSelectors.push(match[0].slice(0, -1).trim());
                }
            }

            const fakeContent = actualSelectors.map(selector => `${selector} {}`).join(' ');
            const purgedCss = await new PurgeCSS().purge({
                content: [{raw: fakeContent, extension: 'html'}],
                /** @ts-ignore */
                css: [{raw: adaptedCss}]
            });

            if (config.shouldPrintOutput) {
                console.group('[PureCSS] Content:');
                /** @ts-ignore */
                console.log(purgedCss[0].css);
                console.groupEnd();
            }

            if (config.shouldPrintSelectors) {
                console.group('[PureCSS] Selectors:');
                console.log(config.selectors);
                console.groupEnd();
            }

            /** @ts-ignore */
            fs.writeFileSync(path.resolve(process.cwd(), config.output), purgedCss[0].css, 'utf8');
        }
    };
}