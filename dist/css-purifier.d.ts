type CssCleanerOptions = {
    output: string;
    input: string;
    /** Selectors that will be saved to the output file */
    selectors: (string | RegExp)[];
    /** Should PureCSS print the output? */
    shouldPrintOutput?: boolean;
    /** Should PureCSS print the selectors? */
    shouldPrintSelectors?: boolean;
};
declare function cssPurifier(config: CssCleanerOptions): {
    name: string;
    buildStart(): Promise<void>;
};

export { cssPurifier };
