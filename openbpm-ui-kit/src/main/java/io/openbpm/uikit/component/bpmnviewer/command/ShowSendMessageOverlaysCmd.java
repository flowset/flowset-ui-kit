package io.openbpm.uikit.component.bpmnviewer.command;

/**
 * A command to show the "send message" overlays for message events like Intermediate Catch Message event and etc.
 */
public class ShowSendMessageOverlaysCmd {
    protected Boolean useStartEvents;
    protected Boolean useActiveEvents;

    /**
     * @return whether shows overlays for the start message events
     */
    public Boolean getUseStartEvents() {
        return useStartEvents;
    }

    /**
     * Sets whether shows overlays for the start message events
     *
     * @param useStartEvents whether shows overlays for the start message events
     */
    public void setUseStartEvents(Boolean useStartEvents) {
        this.useStartEvents = useStartEvents;
    }

    /**
     * @return whether shows overlays for the message events active at the moment
     */
    public Boolean getUseActiveEvents() {
        return useActiveEvents;
    }

    /**
     * Sets whether shows overlays for the message events active at the moment
     *
     * @param useActiveEvents whether shows overlays for the message events active at the moment
     */
    public void setUseActiveEvents(Boolean useActiveEvents) {
        this.useActiveEvents = useActiveEvents;
    }
}
