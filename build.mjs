import esbuild from "esbuild";
import extensibilityMap from "@neos-project/neos-ui-extensibility/extensibilityMap.json" assert { type: "json" };
import { cssModules } from "esbuild-plugin-lightningcss-modules";

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    minify: process.argv.includes("--production"),
    sourcemap: true,
    target: "es2020",
    format: "esm",
    splitting: true,
    legalComments: "none",
    entryPoints: { Plugin: "Resources/Private/GeoMapEditor/manifest.js" },
    loader: {
        ".js": "tsx",
        ".pcss": "css",
    },
    external: ["images/*", "icon-fullscreen.svg"],
    outdir: "Resources/Public",
    alias: extensibilityMap,
    plugins: [
        cssModules({
            targets: {
                chrome: 80, // aligns somewhat to es2020
            },
            cssModules: {
                dashedIdents: true,
                pattern: "carbon-geomapeditor-[hash]-[local]",
            },
        }),
    ],
};

if (process.argv.includes("--watch")) {
    esbuild.context(options).then((ctx) => ctx.watch());
} else {
    esbuild.build(options);
}
