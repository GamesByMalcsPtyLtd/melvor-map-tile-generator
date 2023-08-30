const splitAndGenerateTextures = require('./splitAndGenerateTextures').splitAndGenerateTextures;
/** The path to the full resolution map tile .png file */
const fullResolutionPath = 'input/example@1x.png';
/** The path to the half resolution map tile .png file */
const halfResolutionPath = 'input/example@0.5x.png';
/** The folder to output the map tiles and textures to */
const outputPath = 'output/';
/** The width of the full resolution map tiles in pixels. Must be a multiple of 8. */
const TILE_WIDTH = 400;
/** The height of the full resolution map tiles in pixels. Must be a multiple of 8. */
const TILE_HEIGHT = 400;
splitAndGenerateTextures(fullResolutionPath, halfResolutionPath, outputPath, TILE_WIDTH, TILE_HEIGHT);