import { useEffect, useState } from "react";
import { locationsApi } from "./api";
import type { District, Province } from "./types";

/** Provinces are reference data — fetched once and shared across mounts. */
let provinceCache: Province[] | null = null;
const districtCache = new Map<number, District[]>();

export function useProvinces() {
  const [provinces, setProvinces] = useState<Province[]>(provinceCache ?? []);

  useEffect(() => {
    if (provinceCache) return;
    let active = true;
    locationsApi
      .provinces()
      .then((list) => {
        provinceCache = list;
        if (active) setProvinces(list);
      })
      .catch(() => {
        /* the form still works; the dropdown just stays empty */
      });
    return () => {
      active = false;
    };
  }, []);

  return provinces;
}

export function useDistricts(provinceId: number | null) {
  const [districts, setDistricts] = useState<District[]>(() =>
    provinceId ? (districtCache.get(provinceId) ?? []) : [],
  );

  useEffect(() => {
    if (!provinceId) {
      setDistricts([]);
      return;
    }
    const cached = districtCache.get(provinceId);
    if (cached) {
      setDistricts(cached);
      return;
    }
    let active = true;
    locationsApi
      .districts(provinceId)
      .then((list) => {
        districtCache.set(provinceId, list);
        if (active) setDistricts(list);
      })
      .catch(() => {
        if (active) setDistricts([]);
      });
    return () => {
      active = false;
    };
  }, [provinceId]);

  return districts;
}
