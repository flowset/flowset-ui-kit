/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.internal.JsonUtils;
import elemental.json.JsonArray;
import io.flowset.uikit.component.bpmnviewer.BpmnViewer;
import io.flowset.uikit.component.bpmnviewer.model.BusinessRuleTaskData;
import io.flowset.uikit.component.bpmnviewer.model.CallActivityData;

import java.util.List;

/**
 * Event that fires after BPMN 2.0 XML is imported in the BPMN viewer.
 */
@DomEvent(XmlImportCompleteEvent.EVENT_NAME)
public class XmlImportCompleteEvent extends ComponentEvent<BpmnViewer> {
    public static final String EVENT_NAME = "xml-import-complete";

    protected final String processDefinitionsJson;
    protected final List<CallActivityData> calledProcesses;
    protected final List<BusinessRuleTaskData> calledDecisions;

    /**
     * Creates a new event using the given source and indicator whether the
     * event originated from the client side or the server side.
     *
     * @param source                 the source component
     * @param fromClient             <code>true</code> if the event originated from the client
     *                               side, <code>false</code> otherwise
     * @param processDefinitionsJson imported process definitions in JSON format
     * @param calledProcesses        called process references
     * @param calledDecisions        called decision references
     */
    public XmlImportCompleteEvent(BpmnViewer source, boolean fromClient,
                                  @EventData("event.processDefinitionsJson") String processDefinitionsJson,
                                  @EventData("event.calledProcesses") JsonArray calledProcesses,
                                  @EventData("event.calledDecisions") JsonArray calledDecisions) {
        super(source, fromClient);
        this.processDefinitionsJson = processDefinitionsJson;
        this.calledProcesses = JsonUtils.readValue(calledProcesses, new TypeReference<>() {
        });
        this.calledDecisions = JsonUtils.readValue(calledDecisions, new TypeReference<>() {
        });
    }

    public String getProcessDefinitionsJson() {
        return processDefinitionsJson;
    }

    public List<CallActivityData> getCalledProcesses() {
        return calledProcesses;
    }

    public List<BusinessRuleTaskData> getCalledDecisions() {
        return calledDecisions;
    }
}
