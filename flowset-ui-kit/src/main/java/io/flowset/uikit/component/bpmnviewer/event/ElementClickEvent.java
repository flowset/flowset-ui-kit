/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.event;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import io.flowset.uikit.component.bpmnviewer.BpmnViewer;

/**
 * Event that is fired if the element is clicked on the {@link BpmnViewer}.
 * <b>Note: </b> fired only if the {@link BpmnViewer} is in the interactive mode.
 *
 * @see io.flowset.uikit.component.bpmnviewer.ViewerMode
 */
@DomEvent(ElementClickEvent.EVENT_NAME)
public class ElementClickEvent extends ComponentEvent<BpmnViewer> {
    public static final String EVENT_NAME = "bpmn-element-clicked";

    protected String elementId;
    protected String elementType;
    protected String elementName;
    protected boolean isMultiInstance;
    protected String multiInstanceType;

    public ElementClickEvent(BpmnViewer source, boolean fromClient,
                             @EventData("event.elementId") String elementId,
                             @EventData("event.elementType") String elementType,
                             @EventData("event.elementName") String elementName,
                             @EventData("event.isMultiInstance") boolean isMultiInstance,
                             @EventData("event.multiInstanceType") String multiInstanceType) {
        super(source, fromClient);
        this.elementId = elementId;
        this.elementType = elementType;
        this.elementName = elementName;
        this.isMultiInstance = isMultiInstance;
        this.multiInstanceType = multiInstanceType;
    }

    public String getElementId() {
        return elementId;
    }

    public void setElementId(String elementId) {
        this.elementId = elementId;
    }

    public String getElementType() {
        return elementType;
    }

    public void setElementType(String elementType) {
        this.elementType = elementType;
    }


    public String getElementName() {
        return elementName;
    }

    public void setElementName(String elementName) {
        this.elementName = elementName;
    }

    public boolean isMultiInstance() {
        return isMultiInstance;
    }

    public void setMultiInstance(boolean isMultiInstance) {
        this.isMultiInstance = isMultiInstance;
    }

    public String getMultiInstanceType() {
        return multiInstanceType;
    }

    public void setMultiInstanceType(String multiInstanceType) {
        this.multiInstanceType = multiInstanceType;
    }
}
