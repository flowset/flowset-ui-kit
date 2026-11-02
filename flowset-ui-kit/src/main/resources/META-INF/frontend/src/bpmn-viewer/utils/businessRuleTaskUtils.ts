/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

import {getBusinessObject, is} from "bpmn-js/lib/util/ModelUtil";
import {EngineFamily, EngineType} from "../types";
import {getEngineFamily} from "./engineTypeUtils";

/**
 * Checks if a BPMN element calls a decision: a Flowable decision task for the engines of the Flowable 8 family,
 * a Business Rule Task otherwise.
 * @param element element metadata
 * @param engineType engine type of the parent process
 */
export const isDecisionTask = (element: any, engineType?: EngineType): boolean => {
    return getEngineFamily(engineType) === EngineFamily.Flowable8
        ? isDmnServiceTask(element)
        : is(element, 'bpmn:BusinessRuleTask');
}

const isDmnServiceTask = (element: any): boolean => {
    return is(element, 'bpmn:ServiceTask') && getBusinessObject(element).get('flowable:type') === 'dmn';
}

export const getDecisionRef = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    const camundaDecisionRef = businessObject.get('camunda:decisionRef');
    const operatonDecisionRef = businessObject.get('operaton:decisionRef');

    return camundaDecisionRef || operatonDecisionRef || getDmnServiceTaskDecisionRef(businessObject);
}

// <flowable:field name="decisionTableReferenceKey"><flowable:string>key</flowable:string></flowable:field>
const getDmnServiceTaskDecisionRef = (businessObject: any): string | undefined => {
    const values: any[] = businessObject.get('extensionElements')?.get('values') ?? [];
    const field = values.find(value => is(value, 'flowable:field')
        && value.get('name') === 'decisionTableReferenceKey');
    const stringElement = field?.$children?.find((child: any) => is(child, 'flowable:string'));
    const key = stringElement?.$body?.trim();

    return key || undefined;
}

export const getDecisionBinding = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    const camundaBinding = businessObject.get('camunda:decisionRefBinding');
    const operatonBinding = businessObject.get('operaton:decisionRefBinding');

    return camundaBinding || operatonBinding;
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