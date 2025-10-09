/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {find} from 'min-dash';
import {getBusinessObject, is} from 'bpmn-js/lib/util/ModelUtil';
import {ElementLike} from 'diagram-js/lib/model/Types';

export const SUPPORTED_MESSAGE_TYPES = ['bpmn:StartEvent', 'bpmn:IntermediateCatchEvent', 'bpmn:BoundaryEvent', 'bpmn:ReceiveTask'];

export const isMessageSupported = (element: ElementLike) => {
    const isSupportedElementType = SUPPORTED_MESSAGE_TYPES.indexOf(element.type) !== -1;
    if (!isSupportedElementType) {
        return false;
    }

    const messageEventDefinition = getMessageEventDefinition(element);
    return !!messageEventDefinition;
};

export const getMessageEventDefinition = (element: ElementLike) => {
    if (is(element, 'bpmn:ReceiveTask')) {
        return getBusinessObject(element);
    }

    return getEventDefinition(element, 'bpmn:MessageEventDefinition');
};

export const getEventDefinition = (element: ElementLike, eventType: string)=> {
    const businessObject = getBusinessObject(element);

    const eventDefinitions = businessObject.get('eventDefinitions') || [];

    return find(eventDefinitions, function (definition: ElementLike) {
        return is(definition, eventType);
    });
}

export const getMessage = (element: ElementLike) => {
    const messageEventDefinition = getMessageEventDefinition(element);

    return messageEventDefinition && messageEventDefinition.get('messageRef');
}