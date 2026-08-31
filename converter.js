const fs = require("fs");

const inputFile = "model.geo.json";
const outputFile = "output/model-geckolib.geo.json";


console.log("Iniciando conversão...");


try {

    // Ler o modelo Bedrock
    const bedrockModel = JSON.parse(
        fs.readFileSync(inputFile, "utf8")
    );


    // Pegar a geometria do modelo
    const geometry =
        bedrockModel["minecraft:geometry"][0];


    console.log(
        "Modelo encontrado:",
        geometry.description.identifier
    );


    // Criar o modelo convertido
    const geckoModel = {

        format_version: "1.12.0",

        "minecraft:geometry": [

            {

                description:
                geometry.description,


                bones:
                geometry.bones

            }

        ]

    };


    // Salvar o resultado
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


} catch (error) {

    console.log(
        "Erro na conversão:"
    );

    console.log(error.message);

}
