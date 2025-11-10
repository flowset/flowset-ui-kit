package io.flowset.uikit.component.bpmnviewer.model;

/**
 * Contains the data required to show the "send message" overlays for the process elements in the {@link io.flowset.uikit.component.bpmnviewer.BpmnViewer}.
 */
public class SendMessageOverlaysData {
    protected String tooltipMessage;
    protected Boolean useActiveEvents;
    protected Boolean useStartEvents;

    public String getTooltipMessage() {
        return tooltipMessage;
    }

    public void setTooltipMessage(String tooltipMessage) {
        this.tooltipMessage = tooltipMessage;
    }

    public Boolean getUseActiveEvents() {
        return useActiveEvents;
    }

    public void setUseActiveEvents(Boolean useActiveEvents) {
        this.useActiveEvents = useActiveEvents;
    }

    public Boolean getUseStartEvents() {
        return useStartEvents;
    }

    public void setUseStartEvents(Boolean useStartEvents) {
        this.useStartEvents = useStartEvents;
    }
}
