import {
  CUSTOM_TYPE_PREFIX,
  getCustomCardEntry,
} from "../../../data/lovelace_custom_cards";
import { ThirdEye } from "../../../types";
import { documentationUrl } from "../../../util/documentation-url";

export const getCardDocumentationURL = (
  hass: ThirdEye,
  type: string
): string | undefined => {
  if (type.startsWith(CUSTOM_TYPE_PREFIX)) {
    return getCustomCardEntry(type)?.documentationURL;
  }

  return `${documentationUrl(hass, "/lovelace/")}${type}`;
};
