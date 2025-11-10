/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import {ElementLike} from "diagram-js/lib/model/Types";
import {getBusinessObject} from "bpmn-js/lib/util/ModelUtil";

const DOCUMENTATION_TEXT_FORMAT = "text/plain";

/**
 * Retrieves the documentation associated with a given element.
 *
 * This function takes an element-like object, accesses its underlying business object, and extracts its
 * associated documentation if available.
 *
 * @param {ElementLike} element - The element-like object from which the documentation needs to be extracted.
 * @returns {string | undefined} The documentation associated with the element, or undefined if no documentation is found.
 */
export const findElementDocumentation = (element: ElementLike): ElementLike | undefined => {
    const businessObject = getBusinessObject(element);

    const docs = businessObject && businessObject.get("documentation");
    return findDocumentation(docs);
}

/**
 * Searches for and returns the first documentation element from the provided list that matches
 * specified criteria. The criteria for a match are:
 * - The element's `textFormat` must equal the constant `DOCUMENTATION_TEXT_FORMAT`.
 * - The element's `text` property must be a non-empty string.
 *
 * @param {ElementLike[]} [documentations] - An optional array of documentation elements to search through.
 * @returns {ElementLike | undefined} - The first matching documentation element, or `undefined`
 *                                      if no match is found or if the input is not provided.
 */
export const findDocumentation = (documentations?: ElementLike[]): ElementLike | undefined => {
    if (!documentations) {
        return undefined;
    }
    return documentations.find((documentation: ElementLike) => {
        return documentation.textFormat === DOCUMENTATION_TEXT_FORMAT && documentation.text
            && documentation.text.length > 0;
    });
}