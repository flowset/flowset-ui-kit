/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {OverlayAttrs} from "diagram-js/lib/features/overlays/Overlays";

export interface NewIncidentOverlayData {
    tooltipMessage?: string;
    incidentCount?: number;
}

/**
 * Creates an overlay element to visually represent incident data.
 *
 * @function createIncidentOverlay
 * @param {Object} NewIncidentOverlayData - The data required to create the incident overlay.
 * @param {string} NewIncidentOverlayData.tooltipMessage - The tooltip message to display when hovering over the overlay.
 * @param {number} NewIncidentOverlayData.incidentCount - The number of incidents to display in the overlay.
 * @returns {OverlayAttrs} Object containing the overlay's HTML string and positioning attributes.
 */
export const createIncidentOverlay = ({tooltipMessage, incidentCount}: NewIncidentOverlayData): OverlayAttrs => {
    return {
        html: `<div class="incident-overlay" title="${tooltipMessage}">${incidentCount}</div>`,
        position: {
            left: -10,
            bottom: 15
        }
    }
};