[![Latest stable version]][packagist] [![Total downloads]][packagist] [![License]][packagist] [![GitHub forks]][fork] [![GitHub stars]][stargazers] [![GitHub watchers]][subscription]

# Geo Protomaps Inspector Editor for Neos CMS

https://github.com/CarbonPackages/Carbon.GeoMapEditor/assets/4510166/74015c44-14db-4b80-80a7-7a988d3f07a7

## Configuration

You either need to configure you API Key on [Protomaps](https://app.protomaps.com/signup) or install Protomaps on your
own server.

After that you have to set the correct url in the settings:

```yaml
Neos:
  Neos:
    Ui:
      frontendConfiguration:
        'Carbon.GeoMapEditor':
          url: 'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=YOUR_API_KEY'
          mapOptions:
            scrollWheelZoom: false
            minZoom: 3
            maxZoom: 18
            attributionControl: true
            fullscreenControl: true
          zoom: 13
          center:
            lat: 46.948
            lng: 7.459
```

The change the inital zoom or the position of the map change `zoom` and/or `center`. `mapOptions` is used to set the
settings for the [map](https://leafletjs.com/reference.html#map-l-map)


## How to use it

```yaml
'Foo.Bar:Map':
  properties:
    geo:
      type: array
      ui:
        label: Geo Location
        reloadIfChanged: true
        inspector:
          editor: 'Carbon.GeoMapEditor/Editor'
          editorOptions:
            zoom: 4
```

With `editorOptions`, you can alter each settings for a map.

[packagist]: https://packagist.org/packages/carbon/geomapeditor
[latest stable version]: https://poser.pugx.org/carbon/geomapeditor/v/stable
[total downloads]: https://poser.pugx.org/carbon/geomapeditor/downloads
[license]: https://poser.pugx.org/carbon/geomapeditor/license
[github forks]: https://img.shields.io/github/forks/CarbonPackages/Carbon.GeoMapEditor.svg?style=social&label=Fork
[github stars]: https://img.shields.io/github/stars/CarbonPackages/Carbon.GeoMapEditor.svg?style=social&label=Stars
[github watchers]: https://img.shields.io/github/watchers/CarbonPackages/Carbon.GeoMapEditor.svg?style=social&label=Watch
[fork]: https://github.com/CarbonPackages/Carbon.GeoMapEditor/fork
[stargazers]: https://github.com/CarbonPackages/Carbon.GeoMapEditor/stargazers
[subscription]: https://github.com/CarbonPackages/Carbon.GeoMapEditor/subscription
