const fs = require("fs");

const input = "model.geo.json";
const output = "output/model-geckolib.geo.json";

console.log("Iniciando conversão...");

try {

    const bedrock = JSON.parse(
        fs.readFileSync(input, "utf8")
    );


    const geometry =
        bedrock["minecraft:geometry"][0];


    const gecko = {

        format_version: "1.12.0",

        "minecraft:geometry": [
            {
                description: {
                    identifier:
                    geometry.description.identifier,

                    texture_width:
                    geometry.description.texture_width,

                    texture_height:
                    geometry.description.texture_height
                },

                bones: []
            }
        ]
    };


    for (const bone of geometry.bones) {

        const newBone = {

            name: bone.name,

            pivot:
            bone.pivot || [0,0,0]

        };


        if (bone.rotation) {
            newBone.rotation =
            bone.rotation;
        }


        if (bone.cubes) {

            newBone.cubes =
            bone.cubes.map(cube => ({

                origin: cube.origin,

                size: cube.size,

                uv: cube.uv

            }));

        }


        gecko["minecraft:geometry"][0]
        .bones.push(newBone);

    }


    fs.mkdirSync("output", {
        recursive: true
    });


    fs.writeFileSync(
        output,
        JSON.stringify(
            gecko,
            null,
            4
        )
    );


    console.log(
        "Conversão concluída!"
    );


} catch(error) {

    console.error(
        "Erro:",
        error.message
    );

}
