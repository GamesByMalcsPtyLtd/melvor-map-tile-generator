const fs = require('fs');
const PNG = require('pngjs').PNG;
/**
 * 
 * @param {string} baseImageURI Path to the base image to split into tiles
 * @param {string} mapTilePath Path to the folder to output tiles to
 * @param {number} TILE_WIDTH Width of each tile in pixels
 * @param {number} TILE_HEIGHT Height of each tile in pixels
 * @param {'1'|'0.5'} resName Resolution of the tiles
 * @returns {Promise<{numTilesX: number, numTilesY: number}>}
 */
function splitMapIntoTiles(baseImageURI, mapTilePath, TILE_WIDTH, TILE_HEIGHT, resName) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(baseImageURI).pipe(new PNG()).on('parsed', function () {
      const numTilesX = this.width / TILE_WIDTH;
      const numTilesY = this.height / TILE_HEIGHT;
      if (!Number.isInteger(numTilesX) || !Number.isInteger(numTilesY)) {
        reject('TILE_WIDTH and TILE_HEIGHT do not produce integer number of tiles.');
        return;
      }
      console.log(`Splitting map into ${numTilesX} x ${numTilesY} tiles at ${resName}x resolution.`);
      /** @type {PNG[]} */
      const tilePNGs = [];
      /** @type {string[]} */
      const fileNames = [];
      for (let j = 0; j < numTilesY; j++) {
        for (let i = 0; i < numTilesX; i++) {
          const tilePNG = new PNG({
            width: TILE_WIDTH,
            height: TILE_HEIGHT
          });
          const mapX = i * TILE_WIDTH;
          const mapY = j * TILE_HEIGHT;
          this.bitblt(tilePNG, mapX, mapY, TILE_WIDTH, TILE_HEIGHT, 0, 0);
          tilePNGs.push(tilePNG);
          fileNames.push(`tile_${i}_${j}@${resName}x.png`);
        }
      }
      Promise.all(tilePNGs.map((tilePNG, k) => {
        return new Promise((resolve) => {
          tilePNG.pack().pipe(fs.createWriteStream(mapTilePath + fileNames[k])).on('close', () => {
            resolve();
          });
        });
      })).then(() => {
        resolve({ numTilesX, numTilesY });
      });
    });
  });
}
module.exports = { splitMapIntoTiles };