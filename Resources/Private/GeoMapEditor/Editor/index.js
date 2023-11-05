import React, { useState, Fragment } from "react";
import { TextInput } from "@neos-project/react-ui-components";
import { neos } from "@neos-project/neos-ui-decorators";
import Map from "./Map";
import style from "./style.module.css";
import clsx from "clsx";

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.GeoMapEditor"),
}));

const pointToFormatedString = ({ lat, lng }, f = 2) => `${lat.toFixed(f)}" N, ${lng.toFixed(f)}" W`;
const pointToString = ({ lat, lng }) => `${lat.toFixed(7)},${lng.toFixed(7)}`;

function Editor(props, second) {
    const handleValueChange = (value) => props.commit(value);
    const [search, setSearch] = useState("");
    const { value, highlight, options, i18nRegistry, config, identifier } = props;
    const id = `carbon-geopoint-editor-${identifier}`;

    // Merge options and config
    const { center, protomaps, defaultTileLayer, mapOptions, zoom, searchBar } = Object.assign({}, config, options);
    const hasValue = value && value.lat && value.lng;
    const point = hasValue ? value : center;

    const geoLocation = () => {
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("q", search);
        url.searchParams.set("format", "jsonv2");
        fetch(url.toString())
            .then((res) => res.json())
            .then((data) => {
                data = data[0];
                if (!data || !data.lat || !data.lon) {
                    return;
                }
                const location = {
                    lat: parseFloat(data.lat),
                    lng: parseFloat(data.lon),
                };
                handleValueChange(location);
            });
    };

    return (
        <div className={clsx(style.editor, highlight && style.hightlight)}>
            {searchBar && (
                <Fragment>
                     <label htmlFor={id} className={style.srOnly}>
                        {i18nRegistry.translate("Carbon.GeoMapEditor:Main:search")}
                    </label>
                    <TextInput
                        id={id}
                        placeholder={i18nRegistry.translate("Carbon.GeoMapEditor:Main:search")}
                        onChange={setSearch}
                        onEnterKey={geoLocation}
                        className={style.searchInput}
                    />
                </Fragment>
            )}
            <Map
                onChange={handleValueChange}
                point={point}
                value={value}
                mapOptions={mapOptions}
                protomaps={protomaps}
                defaultTileLayer={defaultTileLayer}
                zoom={zoom}
            />
            <div className={style.infoView}>
                <div className={style.propertyLabel}>{hasValue ? pointToString(value) : ""}</div>
                <div className={style.propertyValue}>{hasValue ? pointToFormatedString(value) : ""}</div>
            </div>
        </div>
    );
}

export default neosifier(Editor);
