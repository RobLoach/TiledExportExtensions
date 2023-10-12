# Tiled Extensions

A collection of [Tiled](https://www.mapeditor.org/) extensions.

## Extensions

The following is a list of the extensions included in this pack.

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

The [Embed JSON Map Format](EmbedJSONMapFormat.js) Tiled plugin will embed all images directly in the JSON format, base64 encoded, as `*.embed.json` files. It will replace the `image` values from their filenames to a base64 encoded data field, along add an `imagesize` property containing the byte size of the image file.

#### Before

``` json
{
    "image": "desert.png"
}
```

#### After

``` json
{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
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
