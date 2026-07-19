import {getBusinessObject} from "bpmn-js/lib/util/ModelUtil";
import {getMultiInstanceType, isMultiInstanceSupported} from "./multiInstanceTaskUtils";
import {ElementLike} from "diagram-js/lib/model/Types";
import {ActivityData} from "../types";

export interface ElementData {
    id: string;
    name: string;
    type: string;
    isMultiInstance: boolean;
}

/**
 * Extracts metadata from a BPMN element.
 * @param element element metadata
 */
export const getElementMetadata = (element: ElementLike): unknown => {
    const businessObject = getBusinessObject(element);
    const commonMetadata = <JSON><unknown>{
        id: element.id,
        name: businessObject.name,
        type: element.type,
        isMultiInstance: isMultiInstanceSupported(element),
    }

    return {
        ...commonMetadata,
    }
}

/**
 * Extracts activity data from a BPMN element.
 * @param element element metadata
 */
export const getActivityData = (element?: ElementLike): ActivityData | undefined => {
    if (!element) {
        return undefined;
    }

    const businessObject = getBusinessObject(element);

    return {
        id: element.id,
        name: businessObject.name,
        type: element.type,
        isMultiInstance: isMultiInstanceSupported(element),
        multiInstanceType: getMultiInstanceType(element),
    } as ActivityData

};