const splitMapIntoTiles = require('./splitMapIntoTiles.js').splitMapIntoTiles;
const generateTileTextures = require('./generateTileTextures.js').generateTileTextures;
/**
 * 
 * @param {string} fullResolutionPath The path to the full resolution map .png
 * @param {string} halfResolutionPath The path to the half resolution map .png
 * @param {string} outputPath The output path for the map tiles
 * @param {number} TILE_WIDTH The width of the full resolution map tiles in pixels
 * @param {number} TILE_HEIGHT The height of the full resolution map tiles in pixels
 */
async function splitAndGenerateTextures(fullResolutionPath, halfResolutionPath, outputPath, TILE_WIDTH, TILE_HEIGHT) {
  if (TILE_WIDTH % 8 !== 0) throw new Error('Invalid tile width. Must be a multiple of 8.');
  if (TILE_HEIGHT % 8 !== 0) throw new Error('Invalid tile height. Must be a multiple of 8.');
  if (TILE_WIDTH > 2000 || TILE_HEIGHT > 2000) throw new Error('Invalid Tile Width or Height. Tile dimensions must not exceed 2000x2000 pixels.')
  const fullTileDims = await splitMapIntoTiles(fullResolutionPath, outputPath, TILE_WIDTH, TILE_HEIGHT, '1');
  generateTileTextures(outputPath, fullTileDims.numTilesX, fullTileDims.numTilesY, '1', outputPath);
  const halfTileDims = await splitMapIntoTiles(halfResolutionPath, 'temp/', TILE_WIDTH/2, TILE_HEIGHT/2, '0.5');
  generateTileTextures('temp/', halfTileDims.numTilesX, halfTileDims.numTilesY, '0.5', outputPath);
}
module.exports = { splitAndGenerateTextures };