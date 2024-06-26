import React, { useEffect, useRef, memo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import style from "./style.module.css";

const areEqual = (prevProps, nextProps) => {
    if (
        !nextProps.value ||
        !nextProps.value?.lat ||
        !nextProps.value?.lng ||
        !marker
    ) {
        return true;
    }
    try {
        const currentLocation = { ...marker.getLatLng() };
        if (
            currentLocation.lat != nextProps.value?.lat ||
            currentLocation.lng != nextProps.value?.lng
        ) {
            map.setView(nextProps.value, map.getZoom(), {
                animate: true,
            });
            if (marker) {
                marker.setLatLng(nextProps.value);
            }
        }
    } catch (error) {}

    return true;
};

let map;
let marker;

const Map = memo(
    ({
        point,
        zoom = 13,
        mapOptions = {},
        protomaps,
        defaultTileLayer,
        value,
        onChange = () => {},
    }) => {
        const mapContainer = useRef();

        function addMarker(map, latlng) {
            let marker = L.marker(latlng, {
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
            map = L.map(mapContainer.current, mapOptions).setView(point, zoom);
            const fetchProtomaps = async () => {
                if (protomaps?.url) {
                    const { leafletLayer } = await import("protomaps");
                    const layer = leafletLayer(protomaps);
                    layer.addTo(map);
                } else {
                    L.tileLayer(defaultTileLayer.url, {
                        attribution: defaultTileLayer.attribution,
                    }).addTo(map);
                }
            };
            fetchProtomaps();
            if (value && value?.lat && value?.lng) {
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

            // unmount map function
            return () => {
                if (marker) {
                    marker.remove();
                }
                map.remove();
                marker = null;
                map = null;
            };
        });

        return (
            <div
                className={style.mapContainer}
                ref={(el) => (mapContainer.current = el)}
            ></div>
        );
    },
    areEqual,
);

export default Map;
