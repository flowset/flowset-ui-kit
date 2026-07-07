import {ShapeLike} from "bpmn-js/lib/draw/BpmnRenderUtil";
import {OverlayPosition, VariableChangeData} from "./types";

/**
 * Data for creating a variable change overlay.
 */
export interface VariableChangeOverlayData {
    shape: ShapeLike;
    changes: VariableChangeData[];
}

/**
 * Creates an overlay for displaying variable changes.
 * @param data containg variable changes data
 */
export const createVariableChangeOverlay = (data: VariableChangeOverlayData) => {
    const {shape, changes} = data;

    const position: OverlayPosition = {
        top: -35
    };

    if (changes.length == 1) {
        const {ordinalNumber, changeType, tooltipMessage} = changes[0];

        const additionalClassName = `variable-change-${changeType.toLowerCase()}`;
        return {
            html: `<div class="variable-change-overlay-root" style="width: ${shape.width}px">`
                + `<div class="variable-change-overlay ${additionalClassName}" title="${tooltipMessage}">${ordinalNumber}</div>`
                + `</div>`,
            position
        }
    }
    const tooltipMessage = changes.map(variableRevision => `${variableRevision.ordinalNumber} - ${variableRevision.tooltipMessage};`)
        .join(
            '\n'
        )
    return {
        html: `<div class="variable-change-overlay-root" style="width: ${shape.width}px"><div class="variable-change-overlay variable-change-update variable-multiple-changes-overlay" title="${tooltipMessage}">`
            + `<svg class="variable-change-changes-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">`
            + `<path d="M12 5.6V3.277865c0-.208689.160305-.377865.358052-.377865.09496 0 .186033.03981.25318.110674l3.179026 3.354944c.279656.295131.279656.773633 0 1.068764l-3.179026 3.354944c-.139828.147565-.366533.147565-.506361 0C12.037723 10.718462 12 10.62235 12 10.522135V7.4c-2.816652 0-5.1 2.283348-5.1 5.1 0 2.816652 2.283348 5.1 5.1 5.1 2.816652 0 5.1-2.283348 5.1-5.1 0-.497056.402944-.9.9-.9s.9.402944.9.9c0 3.810765-3.089235 6.9-6.9 6.9-3.810765 0-6.9-3.089235-6.9-6.9 0-3.810765 3.089235-6.9 6.9-6.9z"/>`
            + `</svg>${changes.length}</div>`
            + `</div>`,
        position
    }

}