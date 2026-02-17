/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

export const getDecisionRef = (element: any): string | undefined => {
    const businessObject = element.businessObject;
    const camundaDecisionRef = businessObject.get('camunda:decisionRef');
    const operatonDecisionRef = businessObject.get('operaton:decisionRef');

    return camundaDecisionRef || operatonDecisionRef;
}

export const getDecisionBinding = (element: any): string | undefined => {
    const businessObject = element.businessObject;
    const camundaBinding = businessObject.get('camunda:decisionRefBinding');
    const operatonBinding = businessObject.get('operaton:decisionRefBinding');

    return camundaBinding || operatonBinding;
}

export const getDecisionVersion = (element: any): string | undefined => {
    const businessObject = element.businessObject;
    const camundaVersion = businessObject.get('camunda:decisionRefVersion');
    const operatonVersion = businessObject.get('operaton:decisionRefVersion');

    return camundaVersion || operatonVersion;
}

export const getDecisionVersionTag = (element: any): string | undefined => {
    const businessObject = element.businessObject;
    const camundaVersionTag = businessObject.get('camunda:decisionRefVersionTag');
    const operatonVersionTag = businessObject.get('operaton:decisionRefVersionTag');

    return camundaVersionTag || operatonVersionTag;
}