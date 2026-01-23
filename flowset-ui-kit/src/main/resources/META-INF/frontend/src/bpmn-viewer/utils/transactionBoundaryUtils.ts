/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {ElementTransactionBoundary} from "../types";
import {ElementLike} from "diagram-js/lib/model/Types";
import {getBusinessObject, is, isAny} from 'bpmn-js/lib/util/ModelUtil';
import {getEventDefinitions} from "./eventDefinitionUtils";

/**
 * Determines the transaction boundary information for a given element.
 *
 * This function analyzes a specified element to determine its transaction boundaries
 * based on its asynchronous continuations properties and default engine wait states.
 *
 * @param {ElementLike} element - a diagram element.
 * @returns {ElementTransactionBoundary | undefined} an object containing transaction boundary details or undefined if element does not have transaction boundary
 */
export const getElementTransactionBoundary = (element: ElementLike): ElementTransactionBoundary | undefined => {
    const businessObject = getBusinessObject(element);
    const loopCharacteristics = businessObject.loopCharacteristics;

    const waitStateTask = isWaitStateTask(element);
    const waitStateGateway = isWaitStateGateway(element);
    const waitStateEvent = isWaitStateEvent(element);

    const asyncAfter = isAsyncAfter(businessObject) || (loopCharacteristics && isAsyncAfter(loopCharacteristics));
    const asyncBefore = isAsyncBefore(businessObject) || (loopCharacteristics && isAsyncBefore(loopCharacteristics));

    const isWaitState = waitStateTask || waitStateEvent || waitStateGateway;

    if (isWaitState || asyncBefore || asyncAfter) {
        return {
            asyncBefore,
            asyncAfter,
            engineWaitState: isWaitState
        };
    }

    return undefined;
}

const isAsyncAfter = bo => {
    const camundaAsyncAfter = !!bo.get('camunda:asyncAfter');
    if (camundaAsyncAfter) {
        return true;
    }
    return !!bo.get('operaton:asyncAfter');
};

const isAsyncBefore = bo => {
    const camundaAsyncBefore = !!(bo.get('camunda:asyncBefore') || bo.get('camunda:async'));
    if (camundaAsyncBefore) {
        return true;
    }

    return !!(bo.get('operaton:asyncBefore') || bo.get('operaton:async'));
};


const isWaitStateEvent = (element: ElementLike) => {
    const eventDefinitions = getEventDefinitions(element);
    if (!eventDefinitions || eventDefinitions.length === 0) {
        return false;
    }
    const eventDefinition = eventDefinitions[0];
    const eventDefinitionType = eventDefinition.$type;

    const isCatchEvent = is(element, 'bpmn:IntermediateCatchEvent');

    const isMessageEvent = eventDefinitionType === 'bpmn:MessageEventDefinition';
    const isTimerEvent = eventDefinitionType === 'bpmn:TimerEventDefinition';
    const isSignalEvent = eventDefinitionType === 'bpmn:SignalEventDefinition';
    const isConditionalEvent = eventDefinitionType === 'bpmn:ConditionalEventDefinition';

    if (isCatchEvent && (isMessageEvent || isTimerEvent || isSignalEvent || isConditionalEvent)) {
        return true;
    }

    const isThrowEvent = is(element, 'bpmn:IntermediateThrowEvent');
    const isEndEvent = is(element, 'bpmn:IntermediateEndEvent');

    if (isMessageEvent && (isThrowEvent || isEndEvent)) {
        const businessObject = getBusinessObject(eventDefinition);

        return hasExternalImplementation(businessObject);
    }

    return false;
}

const isWaitStateTask = (element) => {
    if (isAny(element, ['bpmn:ReceiveTask', 'bpmn:UserTask'])) {
        return true;
    }
    if (isAny(element, ['bpmn:ServiceTask', 'bpmn:SendTask', 'bpmn:BusinessRuleTask'])) {
        const businessObject = getBusinessObject(element);

        return hasExternalImplementation(businessObject);
    }

    return false;
}

const hasExternalImplementation = businessObject => {
    const camundaTaskType = businessObject.get('camunda:type');
    const operatonTaskType = businessObject.get('operaton:type');

    return camundaTaskType === 'external' || operatonTaskType === 'external';
}

const isWaitStateGateway = (element) => {
    return is(element, 'bpmn:EventBasedGateway');
}

