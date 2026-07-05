'use client'

import { useEffect, useRef } from 'react'
import type { Map as LeafletMap, Marker } from 'leaflet'

import {
  KG_BOUNDS,
  KG_CENTER,
  MAP_DESTINATIONS,
  type MapDestination,
} from '@/lib/map-destinations'

type KyrgyzstanLeafletMapProps = {
  activeId: string
  onSelect: (id: string) => void
}

export function KyrgyzstanLeafletMap({ activeId, onSelect }: KyrgyzstanLeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Map<string, Marker>>(new Map())
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let cancelled = false

    void import('leaflet').then((L) => {
      if (cancelled || !containerRef.current) return

      const map = L.map(containerRef.current, {
        center: KG_CENTER,
        zoom: 7,
        minZoom: 6,
        maxZoom: 14,
        maxBounds: KG_BOUNDS,
        maxBoundsViscosity: 1,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri',
          maxZoom: 18,
        },
      ).addTo(map)

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18, opacity: 0.6 },
      ).addTo(map)

      MAP_DESTINATIONS.forEach((dest) => {
        const marker = L.marker([dest.lat, dest.lng], {
          icon: createMarkerIcon(L, dest, dest.id === activeId),
        })
        marker.on('click', () => onSelectRef.current(dest.id))
        marker.addTo(map)
        markersRef.current.set(dest.id, marker)
      })

      map.fitBounds(KG_BOUNDS, { padding: [20, 20] })
      mapRef.current = map
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const dest = MAP_DESTINATIONS.find((d) => d.id === activeId)
    if (!map || !dest) return

    void import('leaflet').then((L) => {
      markersRef.current.forEach((marker, id) => {
        const d = MAP_DESTINATIONS.find((x) => x.id === id)
        if (!d) return
        marker.setIcon(createMarkerIcon(L, d, id === activeId))
      })

      map.flyTo([dest.lat, dest.lng], Math.max(map.getZoom(), 8), { duration: 1.2 })
    })
  }, [activeId])

  return (
    <div
      ref={containerRef}
      className="h-[420px] w-full rounded-2xl md:h-[520px] [&_.leaflet-control-zoom]:border-none [&_.leaflet-control-zoom_a]:rounded-lg [&_.leaflet-control-zoom_a]:bg-white/90 [&_.leaflet-control-zoom_a]:text-navy [&_.leaflet-control-zoom_a]:shadow-md"
    />
  )
}

function createMarkerIcon(
  L: typeof import('leaflet'),
  dest: MapDestination,
  isActive: boolean,
) {
  const dotSize = isActive ? 40 : 32
  const color = isActive ? '#e8520a' : '#1bae82'
  const pulse = isActive
    ? 'box-shadow:0 0 0 0 rgba(232,82,10,0.5);animation:marker-pulse 1.8s ease-in-out infinite;'
    : 'box-shadow:0 2px 8px rgba(0,0,0,0.35);'

  return L.divIcon({
    className: 'kg-map-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none;">
        <div style="width:${dotSize}px;height:${dotSize}px;border-radius:50%;background:${color};border:3px solid white;display:flex;align-items:center;justify-content:center;${pulse}">
          <span style="width:8px;height:8px;border-radius:50%;background:white;"></span>
        </div>
        <span style="white-space:nowrap;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;background:${isActive ? '#e8520a' : 'rgba(255,255,255,0.95)'};color:${isActive ? '#fff' : '#0f3d2e'};box-shadow:0 2px 6px rgba(0,0,0,0.25);">${dest.name}</span>
      </div>
    `,
    iconSize: [110, 58],
    iconAnchor: [55, 29],
  })
}
