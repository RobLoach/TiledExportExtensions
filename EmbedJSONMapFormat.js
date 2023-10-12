/**********************************************************************************************
*
*   Tiled Plugin: Embed JSON Map Format
*
*       https://github.com/robloach/tiled-plugins
*
*   DESCRIPTION:
*       This Tiled plugin will embed all images in the JSON format, base64 encoded. It will
*       replace the "image" values from their filenames to a base64 encoded data field, along
*       add an "imagesize" property containing the byte size of the image file.
*
*   DEPENDENCIES:
*       Tiled https://www.mapeditor.org/
*
*   INSTALL:
*       1. Add this file to your Tiled extensions directory
*       2. When exporting, select "Embed JSON map files (*.embed.json)" as the file type
*
*   Copyright 2023 Rob Loach (@RobLoach)
*
*   LICENSE: zlib/libpng
*
*   This is licensed under an unmodified zlib/libpng license, which is an OSI-certified,
*   BSD-like license that allows static linking with closed source software:
*
*   This software is provided "as-is", without any express or implied warranty. In no event
*   will the authors be held liable for any damages arising from the use of this software.
*
*   Permission is granted to anyone to use this software for any purpose, including commercial
*   applications, and to alter it and redistribute it freely, subject to the following restrictions:
*
*     1. The origin of this software must not be misrepresented; you must not claim that you
*     wrote the original software. If you use this software in a product, an acknowledgment
*     in the product documentation would be appreciated but is not required.
*
*     2. Altered source versions must be plainly marked as such, and must not be misrepresented
*     as being the original software.
*
*     3. This notice may not be removed or altered from any source distribution.
*
**********************************************************************************************/

function EmbedJSONMapFormatIterate(obj, baseDir) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            if (Array.isArray(obj[key])) {
                for (let i = 0; i < obj[key].length; i++) {
                    EmbedJSONMapFormatIterate(obj[key][i], baseDir);
                }
            } else {
                EmbedJSONMapFormatIterate(obj[key], baseDir);
            }
        } else if (key === 'image') {
            // Load the image data.
            const fileName = obj[key];
            const fullFilePath = FileInfo.joinPaths(baseDir, fileName)
            const binaryFile = new BinaryFile(fullFilePath, BinaryFile.ReadOnly)
            const arrayBuffer = binaryFile.readAll()
            const size = binaryFile.size
            binaryFile.close()

            // Replace the image value with a base64 encoded.
            const extension = FileInfo.suffix(fileName)
            obj[key] = "data:image/" + extension + ";base64," + Base64.encode(arrayBuffer)
            obj['imagesize'] = size;
        }
    }
}

var EmbedJSONMapFormat = {
    name: "Embed JSON map files",
    extension: "embed.json",

    write: function(map, fileName) {
        // Whitespace
        const spaces = 0

        // Load the original JSON map format.
        const jsFormat = tiled.mapFormat("json")

        // Write the JSON file using the original map format.
        jsFormat.write(map, fileName)

        // Read the output from the original JSON map format.
        let textFile = new TextFile(fileName, TextFile.ReadOnly)
        const txt = textFile.readAll()
        textFile.close()
        const jsonData = JSON.parse(txt)

        // Make sure to pass in the relative path to the export.
        const dir = FileInfo.path(fileName)
        EmbedJSONMapFormatIterate(jsonData, dir)

        // Write the file again, but use JSON.stringify to minify it.
        textFile = new TextFile(fileName, TextFile.WriteOnly)
        textFile.truncate()
        textFile.write(JSON.stringify(jsonData, null, spaces))
        textFile.commit()
    }
}

tiled.registerMapFormat("embed.json", EmbedJSONMapFormat)
