/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {OverlayPosition} from "./types";
import {OverlayAttrs} from "diagram-js/lib/features/overlays/Overlays";

export interface NewNavigationOverlayData {
    title: string;
    handleClick?: () => void;
}

/**
 * Creates a clickable "navigation" overlay.
 *
 * @param {Object} params - The configuration parameters for creating the navigation overlay.
 * @param {string} params.title - The title/tooltip for the navigation overlay element.
 * @param {Function} [params.handleClick] - An optional callback function that executes when the overlay is clicked.
 * @returns {OverlayAttrs} The attributes of the created navigation overlay, including its DOM element and position.
 */
export const createNavigationOverlay = ({title, handleClick}: NewNavigationOverlayData): OverlayAttrs => {
    const htmlDiv = document.createElement('div');
    htmlDiv.innerHTML = `
                <div class="navigation-overlay" title="${title}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7.9L10 3V6C9.5 6 8.9 6 8 6C0 6 0 14 0 14C0 14 1 10 7.8 10C8.9 10 9.6 10 10 10V12.9L16 7.9Z" fill="#ffffff"/>
                    </svg>
                </div>
                `;
    if (handleClick) {
        htmlDiv.addEventListener('click', (event: MouseEvent) => {
            handleClick();
        });
    }

    const position: OverlayPosition = {  // right bottom corner
        right: 10,
        bottom: 15
    };

    return {
        html: htmlDiv,
        position
    };
}