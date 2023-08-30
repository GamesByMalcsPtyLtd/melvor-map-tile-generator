# Melvor Map Tile Generator
A tool for generating map tiles for the Cartography skill in Melvor Idle
# Instructions
1. Clone this repository
2. Install [node.js](https://nodejs.org/)
3. Run `npm install`.
4. Download the latest release of [Basis Universal](https://github.com/BinomialLLC/basis_universal) and place the `basisu` and `basisu.exe` files into the root folder of this repository.
5. Place your world map images into the input folder. You will need to supply a full resolution `.png` file (Used to generate High quality and Medium quality map tiles), and a half resolution `.png` file (Used to generate Low quality map tiles). There are some restrictions on the dimensions of your map images and tiles:
	- The images must be divisible by the number of map tiles you plan on generating
	- The dimensions of your full resolution map tiles must be a multiple of 8
	- The dimensions of your full resolution map tiles must not exceed 2000x2000 pixels
	- In general, you want your tiles to be as close to 2000x2000 pixels as you can get
6. Modify `.scripts/main.js` based on your map image filenames and tile dimensions
	- Adjust `fullResolutionPath` to the file path of your full resolution map
	- Adjust `halfResolutionPath` to the file path of your half resolution map
	- Adjust `TILE_WIDTH` to the desired width (in pixels) of your map tiles
	- Adjust `TILE_HEIGHT` to the desired height (in pixels) of your map tiles
7. Run `npm run generateTiles`
8. Your map tiles and textures will be placed in the `output` folder for use in your mod. These should be placed in the folder specified by your maps `bgTiles.tilePath` property.