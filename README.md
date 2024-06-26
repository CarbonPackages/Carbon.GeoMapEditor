[![Latest stable version]][packagist] [![Total downloads]][packagist] [![License]][packagist] [![GitHub forks]][fork] [![GitHub stars]][stargazers] [![GitHub watchers]][subscription]

# Geo Inspector Editor for Neos CMS

https://github.com/CarbonPackages/Carbon.GeoMapEditor/assets/4510166/d4b0c094-6597-4b5b-870a-dacfdce3036a

## Installation

Most of the time you have to make small adjustments to a package (e.g. configuration in Settings.yaml). Because of that, it is important to add the corresponding package to the composer from your theme package.

```bash
composer require carbon/geomapeditor --no-update
```

The --no-update command prevent the automatic update of the dependencies. After the package was added to your theme composer.json, go back to the root of the Neos installation and run composer update. Et voilà! Your desired package is now installed correctly.

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

## Use Protomaps

If you want to use [Protomaps](https://protomaps.com) you have to set the `protomaps.url`.
You either need to configure your [API Key on Protomaps](https://app.protomaps.com/signup) or install Protomaps on your
own server.

After that you have to set the correct url in the settings:

```yaml
Neos:
  Neos:
    Ui:
      frontendConfiguration:
        'Carbon.GeoMapEditor':
          protomaps:
            url: 'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=YOUR_API_KEY'
```

## Change global settings

The change the inital zoom or the position of the map change `zoom` and/or `center`. `mapOptions` is used to set the
settings for the [map](https://leafletjs.com/reference.html#map-l-map)

```yaml
Neos:
  Neos:
    Ui:
      frontendConfiguration:
        'Carbon.GeoMapEditor':
          protomaps:
            url: null
          defaultTileLayer:
            url: https://tile.openstreetmap.org/{z}/{x}/{y}.png
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          mapOptions:
            scrollWheelZoom: false
            minZoom: 3
            maxZoom: 18
            attributionControl: true
          zoom: 13
          center:
            lat: 46.948
            lng: 7.459
```

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
