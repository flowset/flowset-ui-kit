/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

import {getBusinessObject} from "bpmn-js/lib/util/ModelUtil";
import {ActivityData, BusinessRuleTaskData, CallActivityData} from "../types";
import {getBinding, getCalledElement, getVersion, getVersionTag} from "../utils/callActivityUtils";
import {
    getDecisionBinding,
    getDecisionRef,
    getDecisionVersion,
    getDecisionVersionTag,
    getFlowableDecisionRef,
    isFlowableDmnTask
} from "../utils/businessRuleTaskUtils";
import {ModdleElementsById} from "bpmn-js/lib/BaseViewer";
import {isMultiInstanceSupported} from "../utils/multiInstanceTaskUtils";
import {getActivityData} from "../utils/elementMetadataUtils";

export interface CalledReferences {
    processes: CallActivityData[];
    decisions: BusinessRuleTaskData[];
}

export class BpmnElementDataExtractor {

    /**
     * Extracts called processes and decision tables from the Call Activity and Business Rule Tasks from the provided elements.
     * @param elementsById diagram elements from the imported BPMN 2.0 XML
     * @param engineType   optional engine type ("JMIX_BPM_3" enables the Flowable Decision Task shape).
     */
    public getCalledReferences(elementsById: ModdleElementsById, engineType?: string): CalledReferences {
        const calledProcesses: CallActivityData[] = [];
        const calledDecisions: BusinessRuleTaskData[] = [];

        const isJmixBpm = engineType === 'JMIX_BPM_3';

        for (const key of Object.keys(elementsById)) {
            const element = elementsById[key];

            const type = element.$type;
            if (type == 'bpmn:CallActivity') {
                const calledElement = getCalledElement(element);
                if (!calledElement) {
                    continue;
                }

                calledProcesses.push({
                    elementId: key,
                    elementName: getBusinessObject(element)?.name,
                    calledElement: calledElement,
                    version: getVersion(element),
                    versionTag: getVersionTag(element),
                    binding: getBinding(element)
                });
            } else if (isJmixBpm && isFlowableDmnTask(element)) {
                const decisionRef = getFlowableDecisionRef(element);
                if (!decisionRef) {
                    console.warn('Decision ref not found for element', element);
                    continue;
                }
                calledDecisions.push({
                    elementId: element.id,
                    elementName: getBusinessObject(element)?.name,
                    decisionRef: decisionRef,
                    binding: undefined,
                });
            } else if (!isJmixBpm && type == 'bpmn:BusinessRuleTask') {
                const decisionRef = getDecisionRef(element);
                if (!decisionRef) {
                    continue;
                }

                calledDecisions.push({
                    elementId: element.id,
                    elementName: getBusinessObject(element)?.name,
                    decisionRef: decisionRef,
                    version: getDecisionVersion(element),
                    versionTag: getDecisionVersionTag(element),
                    binding: getDecisionBinding(element)
                });
            }
        }

        return {processes: calledProcesses, decisions: calledDecisions};
    }

    public getMultiInstanceActivities(elementsById: ModdleElementsById): ActivityData [] {
        return Object.keys(elementsById)
            .filter(key => isMultiInstanceSupported(elementsById[key]))
            .map(key => {
                const diagramElement = elementsById[key];
                return getActivityData(diagramElement)
            })
            .filter(value => value != undefined);
    }
}
