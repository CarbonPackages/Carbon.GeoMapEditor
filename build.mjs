import esbuild from "esbuild";
import extensibilityMap from "@neos-project/neos-ui-extensibility/extensibilityMap.json" with { type: "json" };
import { cssModules } from "esbuild-plugin-lightningcss-modules";

const dev = !process.argv.includes("--production");
const watch = process.argv.includes("--watch");

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    minify: !dev,
    sourcemap: dev,
    target: "es2020",
    format: "esm",
    splitting: true,
    legalComments: "none",
    entryPoints: ["Resources/Private/GeoMapEditor/*.js"],
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

if (watch) {
    esbuild.context(options).then((ctx) => ctx.watch());
} else {
    esbuild.build(options);
}
