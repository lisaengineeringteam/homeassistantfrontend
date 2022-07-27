import { PropertyValues, ReactiveElement } from "lit";
import { Constructor, ThirdEye } from "../types";

export interface ProvideHassElement {
  provideHass(element: HTMLElement);
}

export const ProvideHassLitMixin = <T extends Constructor<ReactiveElement>>(
  superClass: T
) =>
  class extends superClass {
    protected hass!: ThirdEye;

    private __provideHass: HTMLElement[] = [];

    public provideHass(el) {
      this.__provideHass.push(el);
      el.hass = this.hass;
    }

    protected updated(changedProps: PropertyValues) {
      super.updated(changedProps);

      if (changedProps.has("hass")) {
        this.__provideHass.forEach((el) => {
          (el as any).hass = this.hass;
        });
      }
    }
  };
