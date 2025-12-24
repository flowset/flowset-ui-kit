/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {OverlayPosition} from "./types";

import {OverlayAttrs} from "diagram-js/lib/features/overlays/Overlays";
import {BeforeElementTransactionType, ElementTransactionBoundary} from "../types";
import {getOrientation} from "diagram-js/lib/layout/LayoutUtil";
import {ShapeLike} from "bpmn-js/lib/draw/BpmnRenderUtil";

export type TransactionBoundaryOverlayData = {
    shape: ShapeLike;
    waypoint: any;
    beforeType?: BeforeElementTransactionType;
    transactionBoundary?: ElementTransactionBoundary;
}

type Orientation =
    'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'intersect';

/**
 * Creates an overlay representing a transaction boundary at a given position on a shape.
 *
 * The function calculates the overlay position based on the relative position of the point and the element.
 * For example, in the case of an overlay for a gateway with 3 incoming elements (top/bottom and right):
 * 1. For the left connection, there will be a vertical overlay on the left of element
 * 2. For the top and bottom connections, there will be a horizontal overlay on the top and bottom of element
 *
 * @param {TransactionBoundaryOverlayData} config - the configuration object for creating the overlay
 * @param {Shape} config.shape - the diagram shape for which the overlay is created.
 * @param {Waypoint} config.waypoint - a waypoint used for alignment and orientation.
 * @param {string} config.beforeType - the type of transaction if transaction is done before the element.
 * @param {TransactionBoundary} config.transactionBoundary - transaction boundary details.
 * @returns {OverlayAttrs} The calculated attributes for the overlay, such as HTML structure and position.
 */
export const createTransactionBoundaryOverlay = ({

                                                     shape,
                                                     waypoint,
                                                     beforeType,
                                                     transactionBoundary
                                                 }: TransactionBoundaryOverlayData): OverlayAttrs => {

    let orientation: Orientation = getOrientation(waypoint, shape, -7);

    if (orientation === 'intersect') {
        // Try again using a bigger padding to get an orientation which is not 'intersect'.
        // Otherwise the boundary would not be visible if the connection is attached on the
        // diagonal edge of a gateway. Not perfect, but much better than showing no overlay at all.
        orientation = getOrientation(waypoint, shape, -20);
    }

    let strokeWidth = 7; //width of overlay dot line
    const offset = 5; //overlay offset from top/right

    let margin = 2;

    let position: OverlayPosition = {};
    let height: number;
    let width: number;

    if (beforeType === BeforeElementTransactionType.ENGINE_WAIT_STATE && transactionBoundary && transactionBoundary.asyncBefore) {
        margin = margin + strokeWidth + 5; //the "waiting state" overlay is always added to the left of the "async before" overlay
    }

    // if orientation is either 'left', 'top-left' or 'bottom-left'
    if (/left/.test(orientation)) {
        width = strokeWidth;
        height = shape.height + 2 * offset;

        // horizontal position: at the left border respecting margin
        // vertical position: slightly above the diagram element
        position.left = -width - margin;
        position.top = -offset;

        console.log("left position: ", beforeType, width, margin)

        // if orientation is either 'right', 'top-right' or 'bottom-right'
    } else if (/right/.test(orientation)) {

        width = strokeWidth;
        height = shape.height + 2 * offset;

        // horizontal position: at the right border respecting margin
        // vertical position: slightly above the diagram element
        position.right = -margin;
        position.top = -offset;

    } else if (orientation === 'top') {
        width = shape.width;
        height = strokeWidth;

        // horizontal position: slightly right to the diagram element start
        // vertical position: at the top border respecting margin
        position.left = -offset;
        position.top = -offset - margin;

    } else if (orientation === 'bottom') {
        width = shape.width;
        height = strokeWidth;

        // horizontal position: slightly right to the diagram element start
        // vertical position: at the bottom border respecting margin
        position.bottom = -margin;
        position.left = -offset;
    }

    const isHorizontalOverlay = orientation === 'top' || orientation === 'bottom';
    const className = isHorizontalOverlay ? 'transaction-boundary-horizontal-overlay' :
        'transaction-boundary-vertical-overlay';

    const additionalClassName = beforeType === BeforeElementTransactionType.ENGINE_WAIT_STATE ? 'engine-wait-state' : '';

    return {
        html: `<div style="width: ${width}px; height: ${height}px" class="${className} ${additionalClassName}"></div>`,
        position: position
    }
};