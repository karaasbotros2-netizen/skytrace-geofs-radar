import './styles.css'

const flightStoreKey = 'skytrace-geofs-flight'
const app = document.querySelector('#app')

app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#welcome" aria-label="SkyTrace home">
        <span class="brand-mark"><span></span><span></span><span></span></span>
        <span><strong>SKYTRACE</strong><small>GeoFS radar network</small></span>
      </a>
      <nav class="topnav" aria-label="Primary navigation">
        <a href="#welcome" data-view="welcome">Overview</a>
        <a href="#radar" data-view="radar">Live radar</a>
      </nav>
      <div class="connection-pill"><i></i><span id="header-status">Waiting for GeoFS</span></div>
    </header>

    <main>
      <section class="view welcome-view" id="welcome-view">
        <div class="welcome-copy">
          <div class="eyebrow"><span></span> LIVE AIRSPACE INTELLIGENCE</div>
          <h1>See your<br /><em>flight path</em><br />come alive.</h1>
          <p class="lede">SkyTrace turns your GeoFS flight into a clear, live radar picture. Connect once, then follow your route, callsign, and waypoint trail from a beautiful satellite view.</p>
          <div class="welcome-actions">
            <button class="button button-primary" id="open-radar">Open radar <span>↗</span></button>
            <a class="text-link" href="#console">Get the console script <span>↓</span></a>
          </div>
          <div class="welcome-note"><span class="lock">⌁</span><span>Private by design. SkyTrace only reads the flight you choose to broadcast.</span></div>
        </div>
        <div class="welcome-visual" aria-label="Satellite radar preview">
          <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
          <div class="visual-label visual-label-top"><span class="live-dot"></span> GEOFS / CONNECTOR READY</div>
          <div class="route-preview"><div class="route-line"></div><div class="route-dot dot-a"></div><div class="route-dot dot-b"></div><div class="route-dot dot-c"></div><div class="route-tag tag-a">KJFK</div><div class="route-tag tag-b">EGLL</div></div>
          <div class="visual-card"><small>RADAR PREVIEW</small><strong>Awaiting your flight</strong><span>Connect GeoFS to populate airspace</span></div>
        </div>
      </section>

      <section class="view radar-view" id="radar-view">
        <div class="radar-toolbar">
          <div><div class="eyebrow"><span></span> LIVE AIRSPACE</div><h2>Radar <em>scope</em></h2></div>
          <label class="search-box"><span>⌕</span><input id="flight-search" placeholder="Search callsign or airport" /></label>
          <button class="button button-outline" id="console-toggle">Open console <span>⌘</span></button>
        </div>
        <div class="radar-layout">
          <div class="map-panel">
            <div class="map-grid"></div><div class="map-land land-one"></div><div class="map-land land-two"></div><div class="map-land land-three"></div>
            <div class="map-crosshair"><span></span></div>
            <div class="map-controls"><button aria-label="Zoom in">+</button><button aria-label="Zoom out">−</button><button aria-label="Recenter">⌖</button></div>
            <div class="map-legend"><span><i class="legend-plane"></i> Active flight</span><span><i class="legend-route"></i> Route trace</span></div>
            <div class="map-mode">SATELLITE <span>⌄</span></div>
            <div class="map-empty"><div class="empty-ring"><span>✦</span></div><h3>No active flights yet</h3><p>Connect GeoFS with the SkyTrace console<br />to see your aircraft on the satellite scope.</p><button class="button button-primary" id="empty-connect">Connect GeoFS <span>↗</span></button></div>
            <div class="map-scale">100 km <span></span></div>
          </div>
          <aside class="flight-panel">
            <div class="panel-heading"><div><span class="section-kicker">FLIGHT FEED</span><h3>Live flights <b id="flight-count">0</b></h3></div><span class="refresh-icon">↻</span></div>
            <div class="flight-list" id="flight-list"><div class="list-empty"><span>◌</span><p>Your connected flight<br />will appear here.</p></div></div>
            <div class="panel-footer"><span class="pulse"></span><span id="footer-status">Listening for GeoFS broadcast</span></div>
          </aside>
        </div>
      </section>

      <section class="console-section" id="console">
        <div class="console-copy"><div class="eyebrow"><span></span> QUICK CONNECT</div><h2>One script.<br /><em>Full visibility.</em></h2><p>Paste the SkyTrace console script into GeoFS, enter your flight details, and your radar scope will come online instantly.</p><div class="script-install"><span class="install-icon">↗</span><div><strong>skytrace-console.js</strong><small>Paste in the GeoFS developer console</small></div><button id="copy-script" aria-label="Copy console script">⧉</button></div></div>
        <div class="console-window"><div class="window-bar"><div class="window-dots"><i></i><i></i><i></i></div><span>SKYTRACE CONNECTOR</span><b>v1.0.0</b></div><form id="connect-form"><div class="window-intro"><span class="mini-plane">✈</span><div><strong>Connect to SkyTrace</strong><small>Broadcast this flight to your radar</small></div></div><label>DEPARTURE ICAO<input name="departure" placeholder="e.g. KJFK" maxlength="4" required /></label><label>ARRIVAL ICAO<input name="arrival" placeholder="e.g. EGLL" maxlength="4" required /></label><div class="form-row"><label>CALLSIGN<input name="callsign" placeholder="e.g. SKY472" required /></label><label>SQUAWK <small>OPTIONAL</small><input name="squawk" placeholder="1200" maxlength="4" /></label></div><button class="button button-connect" type="submit"><span class="button-status"></span><span id="connect-label">Connect flight</span><span>↗</span></button><p class="form-message" id="form-message">Your data stays in this browser tab.</p></form></div>
      </section>
    </main>
    <footer><span>© 2026 SKYTRACE</span><span>BUILT FOR GEOFS PILOTS</span><span>LOCAL CONNECTION · NO TRACKING</span></footer>
  </div>
`

const views = { welcome: document.querySelector('#welcome-view'), radar: document.querySelector('#radar-view') }
const setView = (view) => {
  Object.entries(views).forEach(([key, element]) => element.classList.toggle('active', key === view))
  document.querySelectorAll('[data-view]').forEach((link) => link.classList.toggle('active', link.dataset.view === view))
  if (view === 'radar') renderFlight()
}
const goRadar = () => { window.location.hash = 'radar'; setView('radar') }
document.querySelector('#open-radar').addEventListener('click', goRadar)
document.querySelector('#empty-connect').addEventListener('click', () => document.querySelector('#console').scrollIntoView({ behavior: 'smooth' }))
document.querySelector('#console-toggle').addEventListener('click', () => document.querySelector('#console').scrollIntoView({ behavior: 'smooth' }))
document.querySelectorAll('[data-view]').forEach((link) => link.addEventListener('click', () => setView(link.dataset.view)))

const getFlight = () => { try { return JSON.parse(localStorage.getItem(flightStoreKey) || 'null') } catch { return null } }
const renderFlight = () => {
  const flight = getFlight()
  const count = document.querySelector('#flight-count')
  const list = document.querySelector('#flight-list')
  if (!flight) { count.textContent = '0'; document.querySelector('.map-empty').style.display = 'block'; return }
  count.textContent = '1'
  document.querySelector('.map-empty').style.display = 'none'
  list.innerHTML = `<button class="flight-card selected"><span class="flight-icon">✈</span><span><strong>${flight.callsign}</strong><small>${flight.departure} → ${flight.arrival}</small></span><b>LIVE</b></button><div class="selected-flight"><span class="section-kicker">SELECTED FLIGHT</span><h4>${flight.departure} <i>→</i> ${flight.arrival}</h4><div class="waypoint-title"><span>ROUTE WAYPOINTS</span><b>${flight.waypoints?.length || 0}</b></div><div class="waypoints">${(flight.waypoints || []).map((point, index) => `<div><span>${String(index + 1).padStart(2, '0')}</span><strong>${point}</strong><i>${index === 0 ? 'DEP' : index === (flight.waypoints.length - 1) ? 'ARR' : 'FIX'}</i></div>`).join('')}</div></div>`
  document.querySelector('#header-status').textContent = `${flight.callsign} connected`
  document.querySelector('#footer-status').textContent = 'Live flight received from GeoFS'
}

document.querySelector('#connect-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = new FormData(event.currentTarget)
  const departure = form.get('departure').toString().toUpperCase()
  const arrival = form.get('arrival').toString().toUpperCase()
  const flight = { departure, arrival, callsign: form.get('callsign').toString().toUpperCase(), squawk: form.get('squawk').toString(), waypoints: [departure, 'DCT', arrival], connectedAt: new Date().toISOString() }
  localStorage.setItem(flightStoreKey, JSON.stringify(flight))
  document.querySelector('#connect-label').textContent = 'Connected to radar'
  document.querySelector('#form-message').textContent = `${flight.callsign} is now visible on your radar scope.`
  document.querySelector('#form-message').classList.add('success')
  renderFlight()
  setTimeout(goRadar, 500)
})
window.addEventListener('storage', (event) => { if (event.key === flightStoreKey) renderFlight() })
document.querySelector('#flight-search').addEventListener('input', (event) => { const flight = getFlight(); if (flight && !`${flight.callsign} ${flight.departure} ${flight.arrival}`.includes(event.target.value.toUpperCase())) document.querySelector('.flight-card').style.display = 'none'; else if (flight) document.querySelector('.flight-card').style.display = 'flex' })
document.querySelector('#copy-script').addEventListener('click', async () => { await navigator.clipboard?.writeText('javascript:' + new URL('skytrace-console.js', location.href).href); document.querySelector('#copy-script').textContent = '✓' })

setView(window.location.hash === '#radar' ? 'radar' : 'welcome')