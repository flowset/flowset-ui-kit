/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.command;

import io.flowset.uikit.component.bpmnviewer.BpmnViewer;

/**
 * A command for {@link BpmnViewer} to show or hide the overlays for navigating to the decision definition from the Business rule task diagram element.
 */
public class ShowDecisionLinkOverlaysCmd {
    protected boolean visible;

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }
}
