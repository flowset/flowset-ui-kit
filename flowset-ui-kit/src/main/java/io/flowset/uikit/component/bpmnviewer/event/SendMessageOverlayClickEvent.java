/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.event;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import elemental.json.JsonObject;
import io.flowset.uikit.component.bpmnviewer.BpmnViewer;

/**
 * An event that is fired when the overlay for sending a message is clicked.
 */
@DomEvent(SendMessageOverlayClickEvent.EVENT_NAME)
public class SendMessageOverlayClickEvent extends ComponentEvent<BpmnViewer> {
    public static final String EVENT_NAME = "send-message-overlay-clicked";

    protected final String messageName;
    protected final String elementType;
    protected final String elementId;
    protected final String elementName;

    /**
     * Creates a new event using the given source and indicator whether the
     * event originated from the client side or the server side.
     *
     * @param source     the source component
     * @param fromClient <code>true</code> if the event originated from the client
     *                   side, <code>false</code> otherwise
     */
    public SendMessageOverlayClickEvent(BpmnViewer source, boolean fromClient,
                                        @EventData("event.details") JsonObject details) {
        super(source, fromClient);
        this.messageName = details.getString("messageName");
        this.elementType = details.getString("elementType");
        this.elementId = details.getString("elementId");
        this.elementName = details.getString("elementName");
    }

    public String getMessageName() {
        return messageName;
    }

    public String getElementType() {
        return elementType;
    }

    public String getElementId() {
        return elementId;
    }

    public String getElementName() {
        return elementName;
    }
}
