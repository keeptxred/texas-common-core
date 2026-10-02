import type { BrandConfig, BrandId } from "./types";
import { texasDefinedBrand } from "./texasdefined";
import { petsDefinedBrand } from "./petsdefined";

const brands: Record<Exclude<BrandId, "keeptxred">, BrandConfig> = {
  texasdefined: texasDefinedBrand,
  petsdefined: petsDefinedBrand,
};

export function resolveActiveBrand(): BrandConfig {
  const requested = (import.meta.env.VITE_DEFINED_BRAND ?? "texasdefined").toLowerCase();
  if (requested === "petsdefined") return brands.petsdefined;
  return brands.texasdefined;
}

export const activeBrand = resolveActiveBrand();
