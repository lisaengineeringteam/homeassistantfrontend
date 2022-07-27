import { ThirdEye } from "../types";
import { Selector } from "./selector";

export type Blueprints = Record<string, BlueprintOrError>;

export type BlueprintOrError = Blueprint | { error: string };
export interface Blueprint {
  metadata: BlueprintMetaData;
}

export interface BlueprintMetaData {
  domain: string;
  name: string;
  input?: Record<string, BlueprintInput | null>;
  description?: string;
  source_url?: string;
}

export interface BlueprintInput {
  name?: string;
  description?: string;
  selector?: Selector;
  default?: any;
}

export interface BlueprintImportResult {
  suggested_filename: string;
  raw_data: string;
  blueprint: Blueprint;
  validation_errors: string[] | null;
}

export const fetchBlueprints = (hass: ThirdEye, domain: string) =>
  hass.callWS<Blueprints>({ type: "blueprint/list", domain });

export const importBlueprint = (hass: ThirdEye, url: string) =>
  hass.callWS<BlueprintImportResult>({ type: "blueprint/import", url });

export const saveBlueprint = (
  hass: ThirdEye,
  domain: string,
  path: string,
  yaml: string,
  source_url?: string
) =>
  hass.callWS({
    type: "blueprint/save",
    domain,
    path,
    yaml,
    source_url,
  });

export const deleteBlueprint = (
  hass: ThirdEye,
  domain: string,
  path: string
) =>
  hass.callWS<BlueprintImportResult>({
    type: "blueprint/delete",
    domain,
    path,
  });
