'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap, ScaleControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Image from 'next/image'

/* ─────────────── Types ─────────────── */
export type Site = {
  id: number
  title: string
  description: string
  category: string
  color: string
  emoji: string
  imageUrl: string
  position: { lat: number; lng: number }
}

type Layer = 'light' | 'satellite' | 'topo'

type Props = {
  sites: Site[]
  center: [number, number]
  zoom: number
}

/* ─────────────── Tile layers ─────────────── */
const LAYERS: Record<Layer, { url: string; attribution: string; label: string; icon: string }> = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    label: 'خريطة',
    icon: '🗺️',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar',
    label: 'قمر صناعي',
    icon: '🛰️',
  },
  topo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap &copy; OpenTopoMap',
    label: 'طبوغرافي',
    icon: '⛰️',
  },
}

/* ─────────────── Custom marker ─────────────── */
const makeMarkerIcon = (color: string, active: boolean) =>
  L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
        ${active ? `<div style="position:absolute;inset:0;border-radius:9999px;background:${color};opacity:.25;animation:ping 1.2s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}
        <div style="
          width:${active ? 24 : 18}px;height:${active ? 24 : 18}px;
          border-radius:9999px;
          background:${color};
          border:3px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,.35);
          transition:all .2s ease;
        "></div>
      </div>
      <style>
        @keyframes ping{75%,100%{transform:scale(1.8);opacity:0}}
      </style>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })

/* ─────────────── Inner map effects ─────────────── */
function FitBounds({ sites }: { sites: Site[] }) {
  const map = useMap()
  useEffect(() => {
    if (!sites.length) return
    const bounds = L.latLngBounds(sites.map((s) => [s.position.lat, s.position.lng]))
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map, sites])
  return null
}

function FlyToSite({ site }: { site: Site | null }) {
  const map = useMap()
  useEffect(() => {
    if (site) map.flyTo([site.position.lat, site.position.lng], 9, { duration: 1.4 })
  }, [map, site])
  return null
}

function ActiveLayer({ layer }: { layer: Layer }) {
  const map = useMap()
  const tileRef = useRef<L.TileLayer | null>(null)

  useEffect(() => {
    if (tileRef.current) map.removeLayer(tileRef.current)
    const cfg = LAYERS[layer]
    tileRef.current = L.tileLayer(cfg.url, { attribution: cfg.attribution }).addTo(map)
    return () => { if (tileRef.current) map.removeLayer(tileRef.current) }
  }, [map, layer])

  return null
}

/* ─────────────── Main component ─────────────── */
export default function LeafletMapInner({ sites, center, zoom }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [layer, setLayer] = useState<Layer>('light')
  const [filterCat, setFilterCat] = useState<string>('الكل')

  const categories = useMemo(
    () => ['الكل', ...Array.from(new Set(sites.map((s) => s.category)))],
    [sites]
  )

  const visibleSites = useMemo(
    () => (filterCat === 'الكل' ? sites : sites.filter((s) => s.category === filterCat)),
    [sites, filterCat]
  )

  const selectedSite = useMemo(
    () => sites.find((s) => s.id === selectedId) ?? null,
    [sites, selectedId]
  )

  return (
    <div dir="rtl" className="flex flex-col gap-4">
      {/* ── Header stats bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-l from-sky-700 to-blue-900 px-5 py-3 text-white shadow-lg">
        <div>
          <p className="text-xs font-medium text-sky-200">المواقع الجيولوجية</p>
          <p className="text-2xl font-bold">{visibleSites.length} <span className="text-sm font-normal text-sky-200">موقع</span></p>
        </div>
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setFilterCat(cat); setSelectedId(null) }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                filterCat === cat
                  ? 'bg-white text-blue-900 shadow'
                  : 'bg-white/15 text-white hover:bg-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Layer switcher */}
        <div className="flex gap-1 rounded-xl bg-white/15 p-1">
          {(Object.keys(LAYERS) as Layer[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setLayer(key)}
              title={LAYERS[key].label}
              className={`rounded-lg px-2.5 py-1 text-sm transition-all ${
                layer === key ? 'bg-white text-blue-900 shadow' : 'text-white hover:bg-white/20'
              }`}
            >
              {LAYERS[key].icon} <span className="hidden sm:inline text-xs">{LAYERS[key].label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Map + sidebar layout ── */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Map */}
        <div className="relative flex-1 overflow-hidden rounded-2xl shadow-2xl border border-slate-200" style={{ minHeight: 480 }}>
          <MapContainer
            center={center}
            zoom={zoom}
            className="w-full h-full"
            style={{ height: '520px', zIndex: 0 }}
            zoomControl={false}
          >
            <ActiveLayer layer={layer} />
            <FitBounds sites={visibleSites} />
            <FlyToSite site={selectedSite} />
            <ScaleControl position="bottomright" />

            {visibleSites.map((site) => {
              const isActive = site.id === selectedId
              return (
                <Marker
                  key={site.id}
                  position={[site.position.lat, site.position.lng]}
                  icon={makeMarkerIcon(site.color, isActive)}
                  eventHandlers={{ click: () => setSelectedId(site.id) }}
                />
              )
            })}
            <ZoomControls />
          </MapContainer>

          {/* Reset view */}
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="absolute top-3 left-3 z-[1000] flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-md backdrop-blur hover:bg-white transition"
          >
            🔍 كل المواقع
          </button>
        </div>

        {/* Sidebar */}
        <div className="flex w-full flex-col gap-3 lg:w-72">
          {/* Selected site info panel */}
          {selectedSite ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="relative h-36 w-full">
                <Image
                  src={selectedSite.imageUrl}
                  alt={selectedSite.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div
                  className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ background: selectedSite.color + 'cc' }}
                >
                  {selectedSite.emoji} {selectedSite.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-lg font-bold text-slate-900">{selectedSite.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-slate-600">{selectedSite.description}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <span>📍</span>
                  <span>{selectedSite.position.lat.toFixed(4)}°N, {selectedSite.position.lng.toFixed(4)}°E</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-36 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
              <span>اختر موقعاً لعرض تفاصيله</span>
            </div>
          )}

          {/* Site list */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow">
            <p className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-500">
              قائمة المواقع ({visibleSites.length})
            </p>
            <ul className="divide-y divide-slate-50">
              {visibleSites.map((site) => (
                <li key={site.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(site.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-right transition hover:bg-slate-50 ${
                      site.id === selectedId ? 'bg-sky-50' : ''
                    }`}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base"
                      style={{ background: site.color + '22', color: site.color }}
                    >
                      {site.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">{site.title}</p>
                      <p className="text-xs text-slate-400">{site.category}</p>
                    </div>
                    {site.id === selectedId && (
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: site.color }} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Zoom controls (inside MapContainer) ─────────────── */
function ZoomControls() {
  const map = useMap()
  return (
    <div className="leaflet-bottom leaflet-left" style={{ pointerEvents: 'auto' }}>
      <div className="leaflet-control flex flex-col gap-1 mb-2 ml-2">
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-md backdrop-blur hover:bg-white transition font-bold text-lg"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => map.zoomOut()}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-md backdrop-blur hover:bg-white transition font-bold text-lg"
        >
          −
        </button>
      </div>
    </div>
  )
}

