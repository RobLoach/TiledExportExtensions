/**********************************************************************************************
*
*   Tiled Plugin: Minified JSON Map Format
*
*       https://github.com/robloach/tiled-plugins
*
*   DESCRIPTION:
*       This Tiled plugin will export minified JSON files to decrease the size of the
*       output .json map files.
*
*   DEPENDENCIES:
*       Tiled https://www.mapeditor.org/
*
*   INSTALL:
*       1. Add this file to your Tiled extensions directory
*       2. When exporting, select "Minified JSON map files (*.min.json)" as the file type
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

var MinifiedJsonMapFormat = {
    name: "Minified JSON map files",
    extension: "min.json",

    write: function(map, fileName) {
        // Load the original JSON map format.
        const jsFormat = tiled.mapFormat("json")

        // Write the JSON file using the original map format.
        jsFormat.write(map, fileName)

        // Read the output from the original JSON map format.
        let textFile = new TextFile(fileName, TextFile.ReadOnly)
        const txt = textFile.readAll()
        textFile.close()
        const jsonData = JSON.parse(txt)

        // Write the file again, but use JSON.stringify to minify it.
        textFile = new TextFile(fileName, TextFile.WriteOnly)
        textFile.truncate()
        textFile.write(JSON.stringify(jsonData))
        textFile.commit()
    }
}

tiled.registerMapFormat("min.json", MinifiedJsonMapFormat)
