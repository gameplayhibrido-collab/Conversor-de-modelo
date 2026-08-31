const fs = require("fs");


const inputFile = "model.geo.json";
const outputFolder = "output";
const outputFile = `${outputFolder}/model-geckolib.geo.json`;


console.log("Iniciando conversão...");


try {

    // Ler arquivo Bedrock
    const data = JSON.parse(
        fs.readFileSync(inputFile, "utf8")
    );


    let geometry;


    // Detectar formato Bedrock
    if (data["minecraft:geometry"]) {

        geometry = data["minecraft:geometry"][0];

    } else {

        throw new Error(
            "Formato Bedrock não reconhecido"
        );

    }


    console.log(
        "Modelo encontrado:",
        geometry.description.identifier
    );


    // Criar estrutura GeckoLib
    const geckoModel = {

        format_version: "1.14.0",

        geckolib_format_version: 2,

        "minecraft:geometry": [

            {

                description: {

                    identifier:
                    geometry.description.identifier,

                    texture_width:
                    geometry.description.texture_width || 64,

                    texture_height:
                    geometry.description.texture_height || 64,

                    visible_bounds_width: 2,

                    visible_bounds_height: 2,

                    visible_bounds_offset: [
                        0,
                        0,
                        0
                    ]

                },


                bones: geometry.bones || []

            }

        ]

    };


    // Criar output temporário
    fs.mkdirSync(
        outputFolder,
        {
            recursive: true
        }
    );


    // Salvar convertido
    fs.writeFileSync(

        outputFile,

        JSON.stringify(
            geckoModel,
            null,
            4
        )

    );


    console.log(
        "Conversão concluída!"
    );


}

catch(error) {

    console.error(
        "Erro na conversão:"
    );

    console.error(
        error.message
    );

    process.exit(1);

}
