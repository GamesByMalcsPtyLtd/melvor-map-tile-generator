const { exec } = require('child_process');
/**
 * Calls the basisu binary to convert the split map tiles into textures
 * @param {string} inputPath Input path where the uncompressed map tiles are located
 * @param {number} numTilesX The number of tiles in the X-direction
 * @param {number} numTilesY The number of tiles in the Y-direction
 * @param {'1'|'0.5'} resName Resultion of the tiles
 * @param {string} outputPath The output folder the place the compressed tiles
 */
function generateTileTextures(inputPath, numTilesX, numTilesY, resName, outputPath) {
  console.log(`Compressing ${numTilesX} x ${numTilesY} map tiles at ${resName}x resolution.`);
  for (let i = 0; i < numTilesX; i++) {
    for (let j = 0; j < numTilesY; j++) {
      exec(`basisu -uastc -uastc_level 3 -no_alpha -file ${inputPath}tile_${i}_${j}@${resName}x.png -output_path ${outputPath}`, (error, stdout, stderr) => {
        if (error !== null) console.error(error);
      });
    }
  }
}
module.exports = { generateTileTextures };