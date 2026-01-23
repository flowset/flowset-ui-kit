/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.fragment.bpmnviewer;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.theme.lumo.LumoUtility;
import io.jmix.core.Messages;
import io.jmix.flowui.component.UiComponentUtils;
import io.jmix.flowui.fragment.Fragment;
import io.jmix.flowui.fragment.FragmentDescriptor;
import io.jmix.flowui.kit.component.button.JmixButton;
import io.jmix.flowui.view.Subscribe;
import io.jmix.flowui.view.Target;
import io.jmix.flowui.view.View;
import io.jmix.flowui.view.ViewComponent;
import io.flowset.uikit.component.bpmnviewer.BpmnViewer;
import io.flowset.uikit.component.bpmnviewer.ViewerMode;
import io.flowset.uikit.component.bpmnviewer.command.*;
import io.flowset.uikit.component.bpmnviewer.event.*;
import io.flowset.uikit.component.bpmnviewer.model.ActivityData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@FragmentDescriptor("bpmn-viewer-fragment.xml")
@CssImport("./styles/bpmn-viewer-fragment.css")
public class BpmnViewerFragment extends Fragment<Div> {

    protected final static String BORDER_STYLES = String.join(" ", LumoUtility.Border.ALL, LumoUtility.BorderRadius.LARGE,
            LumoUtility.BorderColor.CONTRAST_30);

    @Autowired
    protected Messages messages;

    @ViewComponent
    protected Div viewerVBox;
    @ViewComponent
    protected Div viewerContainer;
    @ViewComponent
    protected JmixButton zoomResetBtn;
    @ViewComponent
    protected JmixButton showDocumentationBtn;
    @ViewComponent
    protected JmixButton showStatisticsBtn;

    protected boolean noBorders;
    protected boolean showDocumentation;
    protected ViewerMode mode;
    protected BpmnViewer bpmnViewer;

    @Subscribe(target = Target.HOST_CONTROLLER)
    public void onHostInit(final View.InitEvent event) {
        onInit();
    }

    @Subscribe(target = Target.HOST_CONTROLLER)
    public void onHostBeforeShow(final View.BeforeShowEvent event) {
        if (!noBorders) {
            viewerVBox.addClassNames(BORDER_STYLES);
        }

        Dialog dialog = UiComponentUtils.findDialog(this);
        if (dialog != null) {
            zoomResetBtn.getStyle().setPosition(Style.Position.ABSOLUTE);
        }
    }

    public void showDocumentationButton(boolean visible) {
        showDocumentationBtn.setVisible(visible);

        showDocumentation = false;
        showDocumentationOverlay(false);
    }

    public void showStatisticsButton(boolean visible) {
        showStatisticsBtn.setVisible(visible);

        if (visible) {
            showStatisticsBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
            showStatisticsBtn.setTitle(messages.getMessage("bpmnViewer.actions.hideActivityStatistics"));
        }
    }

    public void setNoBorders(boolean noBorders) {
        this.noBorders = noBorders;
    }

    public void setMode(ViewerMode mode) {
        this.mode = mode;
        if (bpmnViewer != null) {
            bpmnViewer.setMode(mode);
        }
    }

    public ViewerMode getMode() {
        return mode;
    }

    public void initViewer(String bpmnXml) {
        this.bpmnViewer = createBpmnViewer();
        this.bpmnViewer.setBpmnXml(bpmnXml);
        this.bpmnViewer.setMode(mode);

        viewerContainer.removeAll();
        viewerContainer.add(bpmnViewer);
    }

    public void addMarker(AddMarkerCmd cmd) {
        if (this.bpmnViewer != null) {
            this.bpmnViewer.addMarker(cmd);
        }
    }

    public void removeMarker(RemoveMarkerCmd cmd) {
        if (this.bpmnViewer != null) {
            this.bpmnViewer.removeMarker(cmd);
        }
    }

    public void setElementColor(SetElementColorCmd cmd) {
        if (this.bpmnViewer != null) {
            this.bpmnViewer.setElementColor(cmd);
        }
    }

    public void setIncidentCount(SetIncidentCountCmd cmd) {
        if (this.bpmnViewer != null) {
            this.bpmnViewer.setIncidentCount(cmd);
        }
    }

    public void setActivityStatistics(SetActivityStatisticsCmd cmd) {
        if (this.bpmnViewer != null) {
            this.bpmnViewer.setActivityStatistics(cmd);
        }
    }

    public void setActiveElements(List<String> activeElements) {
        if (this.bpmnViewer != null) {
            this.bpmnViewer.setActiveElements(activeElements);
        }
    }

    public void showDecisionInstanceLinkOverlay(ShowDecisionInstanceLinkOverlayCmd cmd) {
        if (bpmnViewer != null) {
            this.bpmnViewer.showDecisionInstanceLinkOverlay(cmd);
        }
    }

    public void showDocumentationOverlay(ShowDocumentationOverlayCmd cmd) {
        if (bpmnViewer != null) {
            this.bpmnViewer.showDocumentationOverlay(cmd);
        }
    }

    public void showSendMessageOverlays(ShowSendMessageOverlaysCmd cmd) {
        if (bpmnViewer != null) {
            this.bpmnViewer.showSendMessageOverlays(cmd);
        }
    }

    public void addImportCompleteListener(ComponentEventListener<XmlImportCompleteEvent> listener) {
        if (bpmnViewer != null) {
            bpmnViewer.addImportCompleteListener(listener);
        }
    }

    public void addDecisionInstanceLinkOverlayClickListener(
            ComponentEventListener<DecisionInstanceLinkOverlayClickedEvent> listener) {
        if (bpmnViewer != null) {
            bpmnViewer.addDecisionInstanceLinkOverlayClickListener(listener);
        }
    }

    public void addDocumentationOverlayClickListener(
            ComponentEventListener<DocumentationOverlayClickedEvent> listener) {
        if (bpmnViewer != null) {
            bpmnViewer.addDocumentationOverlayClickListener(listener);
        }
    }

    public void addElementClickListener(ComponentEventListener<ElementClickEvent> listener) {
        if (bpmnViewer != null) {
            bpmnViewer.addElementClickListener(listener);
        }
    }

    public void addCalledProcessOverlayClickListener(ComponentEventListener<CalledProcessOverlayClickEvent> listener) {
        if (bpmnViewer != null) {
            bpmnViewer.addCalledProcessOverlayClickListener(listener);
        }
    }

    public void addSendMessageOverlayClickListener(ComponentEventListener<SendMessageOverlayClickEvent> listener) {
        if (bpmnViewer != null) {
            bpmnViewer.addSendMessagesOverlayClickListener(listener);
        }
    }

    public void addCalledProcessInstanceOverlayClickListener(ComponentEventListener<CalledProcessInstanceOverlayClickEvent> listener) {
        if (bpmnViewer != null) {
            bpmnViewer.addCalledProcessInstanceOverlayClickListener(listener);
        }
    }

    public void showCalledInstance(ShowCalledInstanceOverlayCmd cmd) {
        if (bpmnViewer != null) {
            bpmnViewer.showCalledInstanceOverlay(cmd);
        }
    }

    @Nullable
    public CompletableFuture<List<ActivityData>> getActivities() {
        if (bpmnViewer != null) {
            return bpmnViewer.getActivities();
        } else {
            return null;
        }
    }

    @Subscribe(id = "zoomResetBtn", subject = "clickListener")
    public void onZoomResetBtnClick(final ClickEvent<JmixButton> event) {
        if (bpmnViewer != null) {
            bpmnViewer.resetZoom();
        }
    }

    @Subscribe(id = "showDocumentationBtn", subject = "clickListener")
    public void onShowDocumentationBtnClick(final ClickEvent<JmixButton> event) {
        showDocumentation = !showDocumentation;
        showDocumentationOverlay(showDocumentation);
        if (showDocumentation) {
            showDocumentationBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        } else {
            showDocumentationBtn.removeThemeVariants(ButtonVariant.LUMO_PRIMARY);
        }
    }

    @Subscribe(id = "showStatisticsBtn", subject = "clickListener")
    protected void onShowStatisticsBtnClick(final ClickEvent<JmixButton> event) {
        if (showStatisticsBtn.getThemeNames().contains(ButtonVariant.LUMO_PRIMARY.getVariantName())) {
            showStatisticsBtn.removeThemeVariants(ButtonVariant.LUMO_PRIMARY);
            showStatisticsBtn.setTitle(messages.getMessage("bpmnViewer.actions.showActivityStatistics"));
            bpmnViewer.setActivityStatisticsVisible(false);
        } else {
            showStatisticsBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
            showStatisticsBtn.setTitle(messages.getMessage("bpmnViewer.actions.hideActivityStatistics"));
            bpmnViewer.setActivityStatisticsVisible(true);
        }
    }

    protected void showDocumentationOverlay(boolean showDocumentationOverlay) {
        if (bpmnViewer != null) {
            ShowDocumentationOverlayCmd cmd = new ShowDocumentationOverlayCmd();

            cmd.setShowDocumentationOverlay(showDocumentationOverlay);
            bpmnViewer.showDocumentationOverlay(cmd);
        }
    }

    public void showCalledProcessOverlays() {
        if (bpmnViewer != null) {
            bpmnViewer.addImportCompleteListener(event -> {
                ShowCalledProcessOverlaysCmd cmd = new ShowCalledProcessOverlaysCmd();
                cmd.setVisible(true);

                bpmnViewer.showCalledProcessOverlays(cmd);
            });
        }
    }

    /**
     * Extension point for initializing the BPMN viewer fragment.
     */
    protected void onInit() {

    }

    protected BpmnViewer createBpmnViewer() {
        return uiComponents.create(BpmnViewer.class);
    }
}
