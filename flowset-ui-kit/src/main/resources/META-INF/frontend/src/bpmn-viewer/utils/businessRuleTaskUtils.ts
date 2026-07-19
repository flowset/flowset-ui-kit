/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

import {find} from 'min-dash';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';

export const getDecisionRef = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    const camundaDecisionRef = businessObject.get('camunda:decisionRef');

    if (camundaDecisionRef) {
        return camundaDecisionRef;
    }
    const operatonDecisionRef = businessObject.get('operaton:decisionRef');
    if (operatonDecisionRef) {
        return operatonDecisionRef;
    }

    const flowableDecisionRef = getFlowableDecisionRef(element);
    if (flowableDecisionRef) {
        return flowableDecisionRef;
    }
    return undefined;
}

export const getDecisionBinding = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    const camundaBinding = businessObject.get('camunda:decisionRefBinding');
    if (camundaBinding) {
        return camundaBinding;
    }
    const operatonBinding = businessObject.get('operaton:decisionRefBinding');
    if (operatonBinding) {
        return operatonBinding;
    }
    const flowableSameDeployment = businessObject.get('flowable:sameDeployment');
    if (flowableSameDeployment === true || flowableSameDeployment === 'true') {
        return 'deployment';
    }

    return undefined;
}


export const getDecisionVersion = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    const camundaVersion = businessObject.get('camunda:decisionRefVersion');
    const operatonVersion = businessObject.get('operaton:decisionRefVersion');

    return camundaVersion || operatonVersion;
}

export const getDecisionVersionTag = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    const camundaVersionTag = businessObject.get('camunda:decisionRefVersionTag');
    const operatonVersionTag = businessObject.get('operaton:decisionRefVersionTag');

    return camundaVersionTag || operatonVersionTag;
}


export const isFlowableDmnTask = (element: any): boolean => {
    if (!element || !is(element, 'bpmn:ServiceTask')) {
        return false;
    }
    const businessObject = element.businessObject || element;
    const flowableServiceTaskType = businessObject.get('flowable:type');

    return flowableServiceTaskType === 'dmn';
}

// Flowable / Jmix BPM ("Decision Task") — a specialized service task carrying the
// DMN reference in a nested extension element. Shape:
//   <serviceTask flowable:type="dmn">
//     <extensionElements>
//       <flowable:field name="decisionTableReferenceKey">
//         <flowable:string>myKey</flowable:string>
//       </flowable:field>
//     </extensionElements>
//   </serviceTask>
// Docs: https://documentation.flowable.com/latest/reactmodel/bpmn/reference/decision-task

export const getFlowableDecisionRef = (element: any): string | undefined => {
    const businessObject = getBusinessObject(element);
    const extensionElements = businessObject.get('extensionElements');
    const values = extensionElements?.get('values') ?? [];

    const field = find(values, (value: any) => {
        return is(value, 'flowable:field') && value.get('name') === 'decisionTableReferenceKey';
    });
    if (!field) {
        return undefined;
    }

    const stringEl = find(field.$children, (value: any) => {
        return is(value, 'flowable:string');
    });

    const raw = stringEl?.$body;
    const key = typeof raw === 'string' ? raw.trim() : undefined;

    return key || undefined;
}