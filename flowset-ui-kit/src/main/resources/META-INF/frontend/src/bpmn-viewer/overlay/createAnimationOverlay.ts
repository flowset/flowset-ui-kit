/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

import {OverlayAttrs} from "diagram-js/lib/features/overlays/Overlays";
import {getBBox} from 'diagram-js/lib/util/Elements';

export type AnimationOverlayData = {
    overlayData: OverlayAttrs;
    animationContainer: HTMLDivElement;
}

/**
 * Creates an overlay element with animation effect.
 * @param element - BPMN element to be highlighted.
 */
export const createAnimationOverlay = (element): AnimationOverlayData => {

    const bbox = getBBox(element); //get element size (wight and height)

    const highlightContainer = document.createElement('div'); //create a root container for overlay with size of the element
    highlightContainer.className = 'bpmn-animation-overlay-container';
    highlightContainer.style.cssText = `
            position: 'absolute',
            width: \`${bbox.width}px\`,
            height: \`${bbox.height}px\`,
            top: '0',
            left: '0',
            pointerEvents: 'none',
            overflow: 'visible'
        `;

    const highlightRing = document.createElement('div'); // create an animation element
    highlightRing.className = 'bpmn-animation-overlay';
    const glowSize = 5;
    const width = bbox.width + glowSize * 4;
    const height = bbox.height + glowSize * 4;
    highlightRing.style.cssText = `
            top: 0;
            left: 0;
            width: ${width}px;
            height:  ${height}px;
        `;

    highlightContainer.appendChild(highlightRing);

    return {
        overlayData: {
            position: {
                top: -glowSize * 2,
                left: -glowSize * 2,
            },
            html: highlightContainer
        },
        animationContainer: highlightRing
    };
}