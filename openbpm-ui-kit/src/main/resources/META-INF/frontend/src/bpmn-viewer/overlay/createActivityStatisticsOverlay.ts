/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {NewActivityStatisticsOverlayData} from "./types";
import {OverlayAttrs} from "diagram-js/lib/features/overlays/Overlays";

/**
 * Creates an overlay for displaying activity statistics.
 *
 * This function generates an overlay element containing information about
 * the running instances count and incident count of a specific activity.
 *
 * @param {NewActivityStatisticsOverlayData} element - The data used to generate the activity statistics overlay.
 *     Contains details such as the instance count, incident count, and their respective tooltip messages.
 * @returns {OverlayAttrs} The attributes of the generated overlay, including its HTML content and position.
 */
export const createActivityStatisticsOverlay = (element: NewActivityStatisticsOverlayData): OverlayAttrs => {
    const incidentClassName = element.incidentCount ? 'incident-overlay' : 'overlay-hidden';

    return {
        html: `<div class="activity-statistics-overlay">
                   <span class="running-instances-overlay" title="${element.instanceCountTooltipMessage}">${element.instanceCount}</span>
                   <span class="${incidentClassName}" title="${element.incidentCountTooltipMessage}">${element.incidentCount}</span>
                </div>`,
        position: {
            left: -10,
            bottom: 15
        }
    }
};