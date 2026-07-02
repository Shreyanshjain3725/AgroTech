import React, { useMemo, useState } from 'react';
import './AgriSmartTools.css';

const GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST = 'https://api.open-meteo.com/v1/forecast';
const REVERSE = 'https://geocoding-api.open-meteo.com/v1/reverse';

function wmoLabel(code) {
  const c = Number(code);
  if (c === 0) return 'Clear sky';
  if (c <= 3) return 'Mostly clear / cloudy';
  if (c <= 48) return 'Fog';
  if (c <= 57) return 'Drizzle';
  if (c <= 67) return 'Rain';
  if (c <= 77) return 'Snow';
  if (c <= 82) return 'Rain showers';
  if (c <= 86) return 'Snow showers';
  if (c <= 99) return 'Thunderstorm';
  return 'Mixed conditions';
}

function buildInsights(daily) {
  const insights = [];
  if (!daily?.time?.length) return insights;

  const maxTemp = Math.max(...daily.temperature_2m_max);
  const minTemp = Math.min(...daily.temperature_2m_min);
  const rains = daily.precipitation_sum || [];
  const totalRain = rains.reduce((a, b) => a + b, 0);
  const maxDayRain = Math.max(...rains);

  if (maxDayRain >= 8) {
    insights.push({
      icon: '🌧️',
      title: 'Heavy rain expected',
      text: 'Delay pesticide or fertilizer spraying until 24–48h after heavy showers. Check field drainage and harvest readiness if grain is mature.',
    });
  } else if (totalRain < 0.5 && maxTemp > 32) {
    insights.push({
      icon: '💧',
      title: 'Dry & warm stretch',
      text: 'Soil moisture may drop quickly. Prefer early morning or evening irrigation to reduce evaporation.',
    });
  }

  if (maxTemp >= 38) {
    insights.push({
      icon: '🌡️',
      title: 'Heat stress risk',
      text: 'Limit strenuous field work during midday. Increase shade and water for livestock and nursery plants if applicable.',
    });
  }

  if (minTemp <= 12) {
    insights.push({
      icon: '🌙',
      title: 'Cool nights',
      text: 'Protect sensitive seedlings where possible. Dew-heavy mornings can favor fungal issues—scout crops regularly.',
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: '🌾',
      title: 'Stable conditions',
      text: 'No strong weather alerts for the next week. Keep monitoring soil moisture and crop health as usual.',
    });
  }

  return insights;
}

function monthSowingHint(monthIndex) {
  const m = [
    { title: 'Rabi harvest window', crops: 'Wheat, barley, chickpea (north & central India)' },
    { title: 'Late Rabi / early prep', crops: 'Sugarcane ratoon care; spring vegetable nurseries' },
    { title: 'Summer crop planning', crops: 'Zaid crops: maize, moong, vegetables (region-specific)' },
    { title: 'Late Rabi / summer sowing', crops: 'Cotton, groundnut (southern zones), summer moong' },
    { title: 'Kharif preparation', crops: 'Rice, cotton, maize (as monsoon onset nears)' },
    { title: 'Monsoon sowing', crops: 'Rice, soybean, cotton, millets, pulses' },
    { title: 'Peak Kharif', crops: 'Rice, cotton, maize, groundnut, sesame' },
    { title: 'Kharif mid-season', crops: 'Vegetables, pulses; pest scouting after monsoon peaks' },
    { title: 'Late Kharif / Rabi prep', crops: 'Potato, mustard, lentil (north India) as temperatures cool' },
    { title: 'Rabi sowing', crops: 'Wheat, mustard, chickpea, lentil (north & central India)' },
    { title: 'Rabi sowing continues', crops: 'Wheat, barley, chickpea, lentil' },
    { title: 'Winter vegetables', crops: 'Peas, cauliflower, cabbage, tomato (polytunnel / open field)' },
  ];
  return m[monthIndex];
}

function AgriSmartTools() {
  const [tab, setTab] = useState('weather');

  const [city, setCity] = useState('Lucknow');
  const [label, setLabel] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState(null);

  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [costPerKg, setCostPerKg] = useState('');
  const [extraCost, setExtraCost] = useState('');

  const insights = useMemo(() => (forecast?.daily ? buildInsights(forecast.daily) : []), [forecast]);

  const profit = useMemo(() => {
    const q = parseFloat(qty);
    const p = parseFloat(price);
    const c = parseFloat(costPerKg);
    const x = parseFloat(extraCost) || 0;
    if (!q || q <= 0 || !p || p < 0 || !c || c < 0) return null;
    const revenue = q * p;
    const totalCost = q * c + x;
    const net = revenue - totalCost;
    const margin = revenue > 0 ? (net / revenue) * 100 : 0;
    return { revenue, totalCost, net, margin };
  }, [qty, price, costPerKg, extraCost]);

  const sowing = monthSowingHint(new Date().getMonth());

  const loadForecast = async (lat, lon, name) => {
    setLoading(true);
    setError('');
    try {
      const url = `${FORECAST}?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather service unavailable');
      const data = await res.json();
      setForecast(data);
      setCoords({ lat, lon });
      setLabel(name || `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`);
    } catch (e) {
      setForecast(null);
      setError(e.message || 'Could not load weather.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCity = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${GEO}?name=${encodeURIComponent(city.trim())}&count=1&language=en&format=json`);
      const data = await res.json();
      const r = data.results?.[0];
      if (!r) {
        setError('Location not found. Try another spelling or add state, e.g. “Lucknow Uttar Pradesh”.');
        setLoading(false);
        return;
      }
      const name = [r.name, r.admin1, r.country_code].filter(Boolean).join(', ');
      await loadForecast(r.latitude, r.longitude, name);
    } catch (e) {
      setError('Could not reach location search.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeo = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser.');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const r = await fetch(`${REVERSE}?latitude=${latitude}&longitude=${longitude}&format=json`);
          const j = await r.json();
          const place = j.results?.[0];
          const name = place
            ? [place.name, place.admin1, place.country_code].filter(Boolean).join(', ')
            : 'Your location';
          await loadForecast(latitude, longitude, name);
        } catch {
          await loadForecast(latitude, longitude, 'Your location');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError('Location permission denied. Search by city or use a browser that allows location.');
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  return (
    <div className="agri-tools">
      <header className="agri-tools-hero">
        <div className="agri-tools-hero-inner">
          <span className="agri-tools-badge">Agri Smart Tools</span>
          <h1>Weather & Profit Lab</h1>
          <p>
            Live 7-day forecast from Open-Meteo, plus farming-oriented insights and a quick profit-margin
            calculator for your crop deals.
          </p>
          <p className="agri-tools-muted">Data source: Open-Meteo • Forecasts are estimates for planning.</p>
        </div>
      </header>

      <div className="agri-tools-tabs">
        <button type="button" className={tab === 'weather' ? 'active' : ''} onClick={() => setTab('weather')}>
          Field weather
        </button>
        <button type="button" className={tab === 'profit' ? 'active' : ''} onClick={() => setTab('profit')}>
          Profit margin
        </button>
      </div>

      {tab === 'weather' && (
        <section className="agri-tools-panel">
          <form className="agri-tools-search" onSubmit={handleSearchCity}>
            <label htmlFor="city">City or region</label>
            <div className="agri-tools-search-row">
              <input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Lucknow, Pune, Ludhiana"
                autoComplete="off"
              />
              <button type="submit" disabled={loading}>
                {loading ? '…' : 'Search'}
              </button>
              <button type="button" className="secondary" onClick={handleGeo} disabled={loading}>
                My location
              </button>
            </div>
            {error && <p className="agri-tools-error">{error}</p>}
            {label && !error && (
              <p className="agri-tools-location">
                Showing: <strong>{label}</strong>
                {coords && (
                  <span className="agri-tools-coords">
                    {' '}
                    ({coords.lat.toFixed(2)}°, {coords.lon.toFixed(2)}°)
                  </span>
                )}
              </p>
            )}
          </form>

          <div className="agri-tools-sowing">
            <h3>Seasonal sowing hint (India)</h3>
            <p>
              <strong>{sowing.title}</strong> — typical focus: {sowing.crops}
            </p>
            <p className="agri-tools-muted">Illustrative guidance only; adapt to your agro-climatic zone and local advice.</p>
          </div>

          {forecast?.daily && (
            <>
              <div className="agri-tools-insights">
                <h3>Field insights</h3>
                <ul>
                  {insights.map((it) => (
                    <li key={it.title}>
                      <span className="icon" aria-hidden>
                        {it.icon}
                      </span>
                      <div>
                        <strong>{it.title}</strong>
                        <p>{it.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="agri-tools-grid">
                {forecast.daily.time.map((day, i) => (
                  <article key={day} className="agri-tools-day">
                    <div className="day-date">
                      {new Date(day).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="day-code">{wmoLabel(forecast.daily.weathercode[i])}</div>
                    <div className="day-temps">
                      {Math.round(forecast.daily.temperature_2m_max[i])}° /{' '}
                      {Math.round(forecast.daily.temperature_2m_min[i])}°
                    </div>
                    <div className="day-rain">
                      Rain: {forecast.daily.precipitation_sum[i]?.toFixed(1) ?? '0'} mm
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {tab === 'profit' && (
        <section className="agri-tools-panel">
          <p className="agri-tools-intro">
            Estimate net margin per sale: enter quantity you expect to sell, your asking price, and your cost of
            production per kg (seed, labor, fertilizer, packaging, etc.).
          </p>
          <div className="agri-tools-form">
            <label>
              Quantity (kg)
              <input type="number" min="0" step="1" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="500" />
            </label>
            <label>
              Price (₹ / kg)
              <input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="28" />
            </label>
            <label>
              Cost (₹ / kg)
              <input type="number" min="0" step="0.01" value={costPerKg} onChange={(e) => setCostPerKg(e.target.value)} placeholder="18" />
            </label>
            <label>
              Extra one-time costs (₹)
              <input
                type="number"
                min="0"
                step="1"
                value={extraCost}
                onChange={(e) => setExtraCost(e.target.value)}
                placeholder="e.g. transport 500"
              />
            </label>
          </div>

          {profit && (
            <div className="agri-tools-result">
              <div className="result-row">
                <span>Gross revenue</span>
                <strong>₹{profit.revenue.toFixed(2)}</strong>
              </div>
              <div className="result-row">
                <span>Total costs</span>
                <strong>₹{profit.totalCost.toFixed(2)}</strong>
              </div>
              <div className="result-row highlight">
                <span>Estimated net</span>
                <strong>₹{profit.net.toFixed(2)}</strong>
              </div>
              <div className="result-row">
                <span>Margin on revenue</span>
                <strong>{profit.margin.toFixed(1)}%</strong>
              </div>
            </div>
          )}
          <p className="agri-tools-muted">For planning only — not a substitute for bookkeeping or tax advice.</p>
        </section>
      )}
    </div>
  );
}

export default AgriSmartTools;
