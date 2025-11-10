/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {OverlayAttrs} from "diagram-js/lib/features/overlays/Overlays";

export interface NewSendMessageOverlayData {
    title: string;
    handleClick: () => void;
}

/**
 * Creates a clickable "send message" overlay.
 *
 * @param {Object} data - The input data required to create the "send message" overlay.
 * @param {string} data.title - The tooltip title associated with the overlay.
 * @param {Function} data.handleClick - The callback function to execute when the overlay is clicked.
 * @returns {OverlayAttrs} The generated overlay attributes, including the HTML element and its position.
 */
export const createSendMessageOverlay = ({title, handleClick}: NewSendMessageOverlayData): OverlayAttrs => {
    const htmlDiv = document.createElement("div");
    htmlDiv.classList.add("overlay-group-item-root");

    htmlDiv.innerHTML = `
                <div class="send-message-overlay" title="${title}"> 
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" aria-hidden="true" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">
                        <g id="svg-group"><!----><!--?lit$050071294$--><g><path d="M0 8l4.9 1.4h0.1v-0.1l7.1-5.3-1.1 1.2-6.2 6.6 0.2 3.2 2.9-3.2 2.1 4.2 6-16z"></path></g><!--?--></g>
                        <g id="use-group" visibility="hidden">
                          <use></use>
                        </g>
                     </svg>
                </div>
                `;

    htmlDiv.addEventListener("click", (event: MouseEvent) => {
        handleClick();
    });

    return {
        html: htmlDiv,
        position: {
            top: -15,
            left: -15,
        },
    };
}
