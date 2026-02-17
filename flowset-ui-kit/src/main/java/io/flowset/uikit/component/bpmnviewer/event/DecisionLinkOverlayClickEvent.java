/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.internal.JsonUtils;
import elemental.json.JsonObject;
import io.flowset.uikit.component.bpmnviewer.BpmnViewer;
import io.flowset.uikit.component.bpmnviewer.model.BusinessRuleTaskData;

/**
 * An event that is fired when the overlay for navigating to the decision definition is clicked.
 */
@DomEvent(DecisionLinkOverlayClickEvent.EVENT_NAME)
public class DecisionLinkOverlayClickEvent extends ComponentEvent<BpmnViewer> {
    public static final String EVENT_NAME = "decision-link-overlay-clicked";

    protected final BusinessRuleTaskData businessRuleTask;

    /**
     * Creates a new event using the given source and indicator whether the
     * event originated from the client side or the server side.
     *
     * @param source     the source component
     * @param fromClient <code>true</code> if the event originated from the client
     *                   side, <code>false</code> otherwise
     */
    public DecisionLinkOverlayClickEvent(BpmnViewer source, boolean fromClient,
                                         @EventData("event.businessRuleTask") JsonObject businessRuleTask
    ) {
        super(source, fromClient);
        this.businessRuleTask = JsonUtils.readValue(businessRuleTask, new TypeReference<>() {});
    }

    public BusinessRuleTaskData getBusinessRuleTask() {
        return businessRuleTask;
    }
}
