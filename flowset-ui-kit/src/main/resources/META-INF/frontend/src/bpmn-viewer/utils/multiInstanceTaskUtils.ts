import {getBusinessObject, is} from "bpmn-js/lib/util/ModelUtil";
import {ElementLike} from "diagram-js/lib/model/Types";

/**
 * Checks if a BPMN element is multi-instance.
 * @param element element metadata
 */
export const isMultiInstanceSupported = (element: ElementLike): boolean => {
    const loopCharacteristics = getLoopCharacteristics(element);
    return !!loopCharacteristics && is(loopCharacteristics, 'bpmn:MultiInstanceLoopCharacteristics');
}

export const getMultiInstanceType = (element: ElementLike): string | undefined => {
    const loopCharacteristics = getLoopCharacteristics(element);
    if (!loopCharacteristics) {
        return undefined;
    }
    const sequential = loopCharacteristics.get('isSequential');
    console.log("sequential: ", sequential);
    if (sequential === 'true' || sequential === true) {
        return 'sequential';
    }
    return 'parallel';
}

function getLoopCharacteristics(element) {
    const bo = getBusinessObject(element);
    return bo.loopCharacteristics;
}