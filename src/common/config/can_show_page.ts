import { PageNavigation } from "../../layouts/hass-tabs-subpage";
import { ThirdEye } from "../../types";
import { isComponentLoaded } from "./is_component_loaded";

export const canShowPage = (hass: ThirdEye, page: PageNavigation) =>
  (isCore(page) || isLoadedIntegration(hass, page)) &&
  !hideAdvancedPage(hass, page);

const isLoadedIntegration = (hass: ThirdEye, page: PageNavigation) =>
  page.component
    ? isComponentLoaded(hass, page.component)
    : page.components
    ? page.components.some((integration) =>
        isComponentLoaded(hass, integration)
      )
    : true;
const isCore = (page: PageNavigation) => page.core;
const isAdvancedPage = (page: PageNavigation) => page.advancedOnly;
const userWantsAdvanced = (hass: ThirdEye) => hass.userData?.showAdvanced;
const hideAdvancedPage = (hass: ThirdEye, page: PageNavigation) =>
  isAdvancedPage(page) && !userWantsAdvanced(hass);
