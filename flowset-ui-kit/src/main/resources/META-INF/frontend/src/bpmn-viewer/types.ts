/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

export interface ProcessElement {
    $type: string;
    id?: string;
    name?: string;
}

export interface BpmProcessDefinition {
    key?: string;
    name?: string;
}

export interface SetElementColorCmd {
    elementId: string;
    fill: string;
    stroke: string;
}

export interface AddMarkerCmd {
    elementId: string;
    marker: string;
}

export interface RemoveMarkerCmd {
    elementId: string;
    marker: string;
}

export interface ScrollToElementCmd {
    elementId: string;
    useAnimation: boolean;
    durationInSec: number;
}

export enum ViewerMode {
    ReadOnly = 'READ_ONLY',
    Interactive = 'INTERACTIVE'
}

export interface ActivityData {
    id: string;
    name?: string;
    type: string;
}

export interface ElementTransactionBoundary {
    asyncBefore: boolean;
    asyncAfter: boolean;
    engineWaitState: boolean;
}

export enum BeforeElementTransactionType {
    ENGINE_WAIT_STATE = 'ENGINE_WAIT_STATE',
    ASYNC_BEFORE = 'ASYNC_BEFORE'
}