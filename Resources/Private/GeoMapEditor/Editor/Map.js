import React, { useEffect, useRef, memo } from "react";
import L from "leaflet";
import { leafletLayer } from "protomaps";
import "leaflet.fullscreen";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import style from "./style.module.css";

const areEqual = (prevProps, nextProps) => {
    if (!marker) {
        return true;
    }
    const currentLocation = { ...marker.getLatLng() };
    if (currentLocation.lat != nextProps.value.lat || currentLocation.lng != nextProps.value.lng) {
        map.setView(nextProps.value, map.getZoom(), {
            animate: true,
        });
        if (marker) {
            marker.setLatLng(nextProps.value);
        }
    }

    return true;
};

let map;
let marker;

const Map = memo(({ point, zoom = 13, mapOptions = {}, protomaps, defaultTileLayer, value, onChange = () => {} }) => {
    const mapContainer = useRef();

    function addMarker(map, latlng) {
        marker = L.marker(latlng, {
            draggable: true,
            autoPan: true,
        });
        marker.on("dragend", (event) => {
            const { lat, lng } = event.target.getLatLng();
            onChange({ lat, lng });
            map.setView({ lat, lng }, map.getZoom(), {
                animate: true,
            });
        });
        marker.addTo(map);
        return marker;
    }

    useEffect(() => {
        let marker = null;

        map = L.map(mapContainer.current, mapOptions).setView(point, zoom);
        if (protomaps?.url) {
            const layer = leafletLayer(protomaps);
            layer.addTo(map);
        } else {
            L.tileLayer(defaultTileLayer.url, {
                attribution: defaultTileLayer.attribution
            }).addTo(map);
        }

        if (value && value.lat && value.lng) {
            marker = addMarker(map, value);
        }

        map.on("click", ({ latlng }) => {
            if (!marker) {
                marker = addMarker(map, latlng);
                onChange(latlng);
            }

            map.setView(latlng, map.getZoom(), {
                animate: true,
            });
        });

        if (mapOptions.scrollWheelZoom == false) {
            // Enable scroll wheel zoom when map is fullscreen
            map.on("enterFullscreen", () => {
                map.scrollWheelZoom.enable();
            });

            map.on("exitFullscreen", function () {
                map.scrollWheelZoom.disable();
            });
        }

        // unmount map function
        return () => {
            map.remove();
            if (marker) {
                marker.remove();
            }
        };
    });

    return <div className={style.mapContainer} ref={(el) => (mapContainer.current = el)}></div>;
}, areEqual);

export default Map;
