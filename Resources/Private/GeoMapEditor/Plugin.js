import manifest from "@neos-project/neos-ui-extensibility";

import Editor from "./Editor";

manifest("Carbon.GeoMapEditor:Editor", {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get("inspector").get("editors");

    editorsRegistry.set("Carbon.GeoMapEditor/Editor", {
        component: Editor,
    });
});
