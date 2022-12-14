import "../../../../../components/ha-form/ha-form";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import memoizeOne from "memoize-one";
import { fireEvent } from "../../../../../common/dom/fire_event";
import type { HassTrigger } from "../../../../../data/automation";
import type { ThirdEye } from "../../../../../types";
import type { HaFormSchema } from "../../../../../components/ha-form/types";
import type { LocalizeFunc } from "../../../../../common/translations/localize";

@customElement("ha-automation-trigger-thirdeye")
export class HaHassTrigger extends LitElement {
  @property({ attribute: false }) public hass!: ThirdEye;

  @property({ attribute: false }) public trigger!: HassTrigger;

  private _schema = memoizeOne((localize: LocalizeFunc) => [
    {
      name: "event",
      type: "select",
      required: true,
      options: [
        [
          "start",
          localize(
            "ui.panel.config.automation.editor.triggers.type.thirdeye.start"
          ),
        ],
        [
          "shutdown",
          localize(
            "ui.panel.config.automation.editor.triggers.type.thirdeye.shutdown"
          ),
        ],
      ],
    },
  ]);

  public static get defaultConfig() {
    return {
      event: "start" as HassTrigger["event"],
    };
  }

  protected render() {
    return html`
      <ha-form
        .schema=${this._schema(this.hass.localize)}
        .data=${this.trigger}
        .hass=${this.hass}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const newTrigger = ev.detail.value;
    fireEvent(this, "value-changed", { value: newTrigger });
  }

  private _computeLabelCallback = (schema: HaFormSchema): string =>
    this.hass.localize(
      `ui.panel.config.automation.editor.triggers.type.geo_location.${schema.name}`
    );

  static styles = css`
    label {
      display: flex;
      align-items: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-automation-trigger-thirdeye": HaHassTrigger;
  }
}
