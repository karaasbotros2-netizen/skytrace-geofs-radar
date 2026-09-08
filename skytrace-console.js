/* SkyTrace GeoFS console connector. Paste this script in the GeoFS developer console. */
(() => {
  const key = 'skytrace-geofs-flight'
  const old = document.getElementById('skytrace-console-ui')
  if (old) old.remove()
  const panel = document.createElement('div')
  panel.id = 'skytrace-console-ui'
  panel.innerHTML = `<style>#skytrace-console-ui{position:fixed;z-index:2147483647;right:24px;bottom:24px;width:290px;background:#071a29;color:#effaf5;border:1px solid #376b70;border-radius:4px;box-shadow:0 14px 40px #0009;font:12px Arial,sans-serif;padding:18px}#skytrace-console-ui h3{margin:0 0 4px;font-size:16px;color:#8de6d2}#skytrace-console-ui p{margin:0 0 15px;color:#8aa6ac;font-size:11px}#skytrace-console-ui label{display:block;color:#8aa6ac;font-size:9px;letter-spacing:1px;margin:10px 0}#skytrace-console-ui input{display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:9px;background:#0d2b3a;color:#fff;border:1px solid #28535a;border-radius:2px;text-transform:uppercase}#skytrace-console-ui button{width:100%;padding:10px;background:#8de6d2;color:#071521;border:0;border-radius:2px;font-weight:bold;margin-top:7px}#skytrace-console-ui small{display:block;text-align:center;color:#78959c;margin-top:10px}</style><h3>SKYTRACE CONNECTOR</h3><p>Broadcast your GeoFS flight to the radar.</p><label>DEPARTURE ICAO<input id="st-departure" maxlength="4" placeholder="KJFK"></label><label>ARRIVAL ICAO<input id="st-arrival" maxlength="4" placeholder="EGLL"></label><label>CALLSIGN<input id="st-callsign" placeholder="SKY472"></label><label>SQUAWK <small style="display:inline">OPTIONAL</small><input id="st-squawk" maxlength="4" placeholder="1200"></label><button id="st-connect">CONNECT FLIGHT</button><small id="st-message">SkyTrace is ready.</small>`
  document.body.appendChild(panel)
  panel.querySelector('#st-connect').onclick = () => {
    const value = { departure: panel.querySelector('#st-departure').value.toUpperCase(), arrival: panel.querySelector('#st-arrival').value.toUpperCase(), callsign: panel.querySelector('#st-callsign').value.toUpperCase(), squawk: panel.querySelector('#st-squawk').value, waypoints: [panel.querySelector('#st-departure').value.toUpperCase(), 'DCT', panel.querySelector('#st-arrival').value.toUpperCase()], connectedAt: new Date().toISOString() }
    if (!value.departure || !value.arrival || !value.callsign) { panel.querySelector('#st-message').textContent = 'Departure, arrival, and callsign are required.'; return }
    localStorage.setItem(key, JSON.stringify(value))
    panel.querySelector('#st-message').textContent = 'Connected. Your flight is live on SkyTrace.'
  }
})()