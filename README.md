# SkyTrace GeoFS Radar

SkyTrace is a lightweight GeoFS flight radar interface. It has a welcome page, a satellite-styled live radar scope, route and waypoint details, flight search, and a GeoFS console connector.

## Run

```bash
npm install
npm run dev
```

Open the local Vite URL, then use the `Open radar` button or the console connection form. To connect from GeoFS, paste the contents of `public/skytrace-console.js` into the GeoFS browser developer console. The website and GeoFS tab share the current flight through `localStorage`; no demo flights are seeded.

The live route currently uses the departure, a direct `DCT` leg, and arrival. A GeoFS route parser can replace the `waypoints` array in the connector when a route source is available.