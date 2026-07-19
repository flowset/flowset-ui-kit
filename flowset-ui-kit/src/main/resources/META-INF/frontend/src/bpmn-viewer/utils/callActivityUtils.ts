/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */


export const getCalledElement = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    return businessObject.get('calledElement');
}

export const getFlowableCalledElementType = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    return businessObject.get('flowable:calledElementType');
}

export const getBinding = (element: any): string | undefined => {
    const businessObject = element.businessObject || element;
    const camundaBinding = businessObject.get('camunda:calledElementBinding');
    const operatonBinding = businessObject.get('operaton:calledElementBinding');
    if (camundaBinding || operatonBinding) {
        return camundaBinding || operatonBinding;
    }

    // Flowable expresses the "deployment" binding via a dedicated boolean
    // attribute (flowable:sameDeployment). The engine also honors a raw
    // flowable:calledElementBinding value of "deployment" as a fallback.
    const flowableSameDeployment = businessObject.get('flowable:sameDeployment');
    if (flowableSameDeployment === true || flowableSameDeployment === 'true') {
        return 'deployment';
    }

    const flowableCalledElementType = businessObject.get('flowable:calledElementType');
    if (flowableCalledElementType === 'id') {
        return 'id';
    }
    return undefined;
}

export const getVersion = (element: any): string | undefined => {
    // Flowable engine has no calledElementVersion attribute on call activity.
    const businessObject = element.businessObject || element;
    const camundaVersion = businessObject.get('camunda:calledElementVersion');
    const operatonVersion = businessObject.get('operaton:calledElementVersion');

    return camundaVersion || operatonVersion;
}

export const getVersionTag = (element: any): string | undefined => {
    // Flowable engine has no calledElementVersionTag attribute on call activity.
    const businessObject = element.businessObject || element;
    const camundaVersionTag = businessObject.get('camunda:calledElementVersionTag');
    const operatonVersionTag = businessObject.get('operaton:calledElementVersionTag');

    return camundaVersionTag || operatonVersionTag;
}