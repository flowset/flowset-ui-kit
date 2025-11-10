/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {css} from 'lit';

export const bpmnViewerStyles = css`
    .running-activity:not(.djs-connection) .djs-visual > :nth-child(1) {
        fill: var(--bpmn-running-activity-color) !important;
    }

    .modification-source-activity:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: var(--bpmn-modification-source-activity-stroke-color) !important;
        fill: var(--bpmn-modification-source-activity-bg-color) !important;
    }

    .modification-target-activity:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: var(--bpmn-modification-target-activity-stroke-color) !important;
        fill: var(--bpmn-modification-target-activity-bg-color) !important;
    }

    .activity-hover:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: var(--bpmn-activity-hover-stroke-color) !important;
        fill: var(--bpmn-activity-hover-fill-color) !important;
        cursor: pointer;
    }

    .primary-color-activity:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: var(--lumo-primary-color) !important;
        fill: var(--lumo-primary-color-10pct) !important;
    }

    .activity-statistics-overlay {
        display: flex;
        flex-direction: row;
        gap: var(--lumo-space-xs);
    }

    .running-instances-overlay {
        background-color: var(--bpmn-running-instances-overlay-bg-color);
        color: var(--bpmn-running-instances-overlay-text-color);
        border-radius: var(--lumo-border-radius-m);
        line-height: var(--default-bpmn-element-overlay-size);
        padding: 0.1em;
        text-align: center;
        vertical-align: middle;
        font-size: var(--default-bpmn-element-overlay-font-size);
        font-weight: bold;
        border: var(--bpmn-running-instances-overlay-border);
        min-width: var(--default-bpmn-element-overlay-size);
        height: var(--default-bpmn-element-overlay-size);
        display: flex;
        justify-content: center;
    }

    .overlay-hidden {
        display: none;
    }

    .incident-overlay {
        background-color: var(--bpmn-incident-overlay-bg-color);
        color: var(--bpmn-incident-overlay-text-color);
        border-radius: var(--lumo-border-radius-m);
        line-height: var(--default-bpmn-element-overlay-size);
        padding: 0.1em;
        text-align: center;
        vertical-align: middle;
        font-size: var(--default-bpmn-element-overlay-font-size);
        font-weight: bold;
        border: var(--bpmn-incident-overlay-border);
        min-width: var(--default-bpmn-element-overlay-size);
        height: var(--default-bpmn-element-overlay-size);
        display: flex;
        justify-content: center;
    }

    .navigation-overlay {
        background-color: var(--bpmn-navigation-overlay-background);
        cursor: pointer;
        display: flex;
        border-radius: var(--lumo-border-radius-m);
        justify-content: center;
        align-items: center;
        width: calc(var(--default-bpmn-element-overlay-size) + 2px);
        height: calc(var(--default-bpmn-element-overlay-size) + 2px);
    }

    .documentation-overlay {
        background-color: var(--bpmn-navigation-overlay-background);
        cursor: pointer;
        display: flex;
        border-radius: var(--lumo-border-radius-m);
        justify-content: center;
        align-items: center;
        width: calc(var(--default-bpmn-element-overlay-size) + 2px);
        height: calc(var(--default-bpmn-element-overlay-size) + 2px);
    }

    .send-message-overlay {
        background-color: var(--bpmn-send-message-overlay-background);
        fill: var(--bpmn-send-message-overlay-fill);
        cursor: pointer;
        display: flex;
        border-radius: var(--lumo-border-radius-m);
        justify-content: center;
        align-items: center;
        width: calc(var(--default-bpmn-element-overlay-size) + 2px);
        height: calc(var(--default-bpmn-element-overlay-size) + 2px);
    }

    .overlay-group-item-root {
        background-color: var(--bpmn-group-overlay-background-color);
        padding: 2px;
        border-radius: inherit;
    }

    .djs-overlays > .djs-overlay-send-message:first-child:not(:only-child) {
        border-radius: 0 0 var(--lumo-border-radius-m) var(--lumo-border-radius-m);
        border-bottom: var(--bpmn-group-overlay-border);
        border-left: var(--bpmn-group-overlay-border);
        border-right: var(--bpmn-group-overlay-border);
    }

    .djs-overlays > .djs-overlay-documentation:last-child:not(:only-child) {
        border-radius: var(--lumo-border-radius-m) var(--lumo-border-radius-m) 0 0;
        border-top: var(--bpmn-group-overlay-border);
        border-left: var(--bpmn-group-overlay-border);
        border-right: var(--bpmn-group-overlay-border);
    }

    .djs-overlays > .djs-overlay-send-message:only-child,
    .djs-overlays > .djs-overlay-documentation:only-child {
        border-radius: var(--lumo-border-radius-m);
        border: var(--bpmn-group-overlay-border);
    }
`;