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

function getLoopCharacteristics(element) {
    const bo = getBusinessObject(element);
    return bo.loopCharacteristics;
}