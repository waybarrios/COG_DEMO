# Cloud Optimized GeoTIFF Map (cog map)

DEMO BASED ON  [Cloud Optimized GeoTIFF](http://cogeo.org) (COG) posted online and [Chris Holmes Repo](https://github.com/cholmes/cog-map)
This project enables users to view any. Works out of the box with 3-band RGB data, more advanced data is hopefully coming soon.

Available for use at https://cholmes.github.io/cog-map/


## Installation and Running

If you want to clone the project and start developing against it, or just run your own, installation is pretty simple. You 
need to have [Node and NPM](https://www.npmjs.com/get-npm) installed (at least Node 8, for Parcel support - see below), and then you just clone this repo, go to the root and type:

```npm install```

This _should_ install all the dependencies (unless of course I forgot some global dependencies - please file an issue if you have errors, or even just let me know that it works). A key one is [parcel](https://parceljs.org/) which builds the application and updates it on the fly as you edit files. It's quite cool. 

To run the project locally, using parcel, just type:

```npm start```

This will compile it and start a server that makes it available at http://localhost:1234. And if you edit the html or javascript files it will update things automatically.
