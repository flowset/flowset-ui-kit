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

/**
 * Gets the multi-instance type of a BPMN element.
 * @param element element metadata
 * @return 'sequential' or 'parallel', undefined if the element is not multi-instance
 */
export const getMultiInstanceType = (element: ElementLike): string | undefined => {
    if (!isMultiInstanceSupported(element)) {
        return undefined;
    }
    const sequential = getLoopCharacteristics(element).get('isSequential');
    return sequential === true || sequential === 'true' ? 'sequential' : 'parallel';
}

function getLoopCharacteristics(element) {
    const bo = getBusinessObject(element);
    return bo.loopCharacteristics;
}