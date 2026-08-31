const fs = require("fs");


function convertModel(input, output) {

    const bedrockModel = JSON.parse(
        fs.readFileSync(input, "utf8")
    );


    const geometry =
        bedrockModel["minecraft:geometry"][0];


    const geckoModel = {

        format_version: "1.21.0",

        "minecraft:geometry": [
            {
                description:
                    geometry.description,

                bones:
                    geometry.bones
            }
        ]
    };


    fs.writeFileSync(
        output,
        JSON.stringify(
            geckoModel,
            null,
            4
        )
    );


    console.log(
        "Modelo convertido com sucesso!"
    );
}


convertModel(
    "input/model.geo.json",
    "output/model.geo.json"
);
