/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {ImportParseCompleteEvent} from "bpmn-js/lib/BaseViewer";
import {BpmProcessDefinition, ProcessElement} from "../types";

export const findProcessDefinitions = (e: ImportParseCompleteEvent): BpmProcessDefinition[] => {
    const rootElements = e.definitions?.rootElements as Array<ProcessElement> || [];
    const processDefinitions: BpmProcessDefinition[] = [];
    rootElements.forEach((item: ProcessElement) => {
        if (item.$type === "bpmn:Process") {
            processDefinitions.push({
                key: item.id,
                name: item.name
            });
        }
    });

    return processDefinitions;
}