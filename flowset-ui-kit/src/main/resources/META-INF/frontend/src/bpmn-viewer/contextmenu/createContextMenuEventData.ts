/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

import {ElementLike} from "diagram-js/lib/model/Types";
import {getElementMetadata} from "../utils/elementMetadataUtils";


interface ContextMenuEvent {
    element: ElementLike;
    originalEvent: MouseEvent;
}

/**
 * Create context menu click event data.
 * @param event context menu event
 */
export const createContextMenuEventData = (event: ContextMenuEvent): JSON => {
    const {element, originalEvent} = event;

    return <JSON><unknown>{
        elementId: element.id,
        elementType: element.type,
        x: originalEvent.clientX,
        y: originalEvent.clientY,
        offsetX: originalEvent.offsetX,
        offsetY: originalEvent.offsetY,
        element: element,
        elementMetadata: getElementMetadata(element),
    };
}