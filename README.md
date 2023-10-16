# TiledExportExtensions

A collection of [Tiled](https://www.mapeditor.org/) extensions to assist with exporting Tiled map data.

## Extensions

The following is a list of the extensions included in this pack:

1. [Minified JSON Map Format](#minified-json-map-format)
1. [Embed JSON Map Format](#embed-json-map-format)

### Minified JSON Map Format

The [Minified JSON Map Format](MinifiedJSONMapFormat.js) Tiled plugin will export minified JSON files `*.min.json`, to decrease the output file size by removing the whitespace.

#### Before

``` json
{ "compressionlevel":-1,
 "height":40,
 "infinite":false,
 "layers":[
        {
         "data":[...
```

#### After

``` json
{"compressionlevel":-1,"height":40,"infinite":false,"layers":[{"data":[...
```

### Embed JSON Map Format

The [Embed JSON Map Format](EmbedJSONMapFormat.js) Tiled plugin will embed all images directly in the JSON format, [Base64](https://en.wikipedia.org/wiki/Base64) encoded, as `*.embed.json` files. It will add the `image` data to a base64 encoded [data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme) `imagedata` property, along add the size of the image to `imagesize`.

#### Before

``` json
{
    "image": "desert.png"
}
```

#### After

``` json
{
    "image": "desert.png",
    "imagedata": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
    "imagesize": 37830
}
```

## Installation

To install the extensions...

1. Open Tiled and go to _Edit > Preferences > Plugins_ and click the **Open** button to open the extensions directory.
2. [Download](https://github.com/robloach/tiled-plugins/archive/master.zip)
3. Extract the files to your extensions directory. The scripts can be directly in the extensions directory or a subdirectory. Alternatively, clone this git repository into the extensions directory:

      - **Windows**
       `C:/Users/%USERNAME%/AppData/Local/Tiled/extensions/`
      - **macOS**
      `~/Library/Preferences/Tiled/extensions/`
      - **Linux**
      `~/.config/tiled/extensions/`
4. See the script itself for specific plugin usage instructions

## License

Unless stated otherwise, all works are:

- Copyright (c) 2023 [Rob Loach](https://robloach.net)

... and licensed under:

- [zlib License](LICENSE)
