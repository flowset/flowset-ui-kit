package io.flowset.uikit.fragment.dmnviewer;

import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.function.SerializableConsumer;
import com.vaadin.flow.theme.lumo.LumoUtility;
import elemental.json.JsonValue;
import io.jmix.flowui.fragment.Fragment;
import io.jmix.flowui.fragment.FragmentDescriptor;
import io.jmix.flowui.view.Subscribe;
import io.jmix.flowui.view.Target;
import io.jmix.flowui.view.View;
import io.jmix.flowui.view.ViewComponent;
import io.flowset.uikit.component.dmnviewer.DmnViewer;
import io.flowset.uikit.component.dmnviewer.command.ShowDecisionInstanceCmd;
import io.flowset.uikit.component.dmnviewer.event.DmnXmlImportCompleteEvent;

@FragmentDescriptor("dmn-viewer-fragment.xml")
public class DmnViewerFragment extends Fragment<Div> {
    protected final static String BORDER_STYLES = String.join(" ", LumoUtility.Border.ALL, LumoUtility.BorderRadius.LARGE,
            LumoUtility.BorderColor.CONTRAST_30);
    @ViewComponent
    protected Div viewerContainer;
    @ViewComponent
    protected Div viewerVBox;

    protected DmnViewer dmnViewer;
    protected boolean noBorders;

    @Subscribe(target = Target.HOST_CONTROLLER)
    public void onHostBeforeShow(final View.BeforeShowEvent event) {
        if (!noBorders) {
            viewerVBox.addClassNames(BORDER_STYLES);
        }
    }

    public void initViewer() {
        this.dmnViewer = uiComponents.create(DmnViewer.class);
        viewerContainer.removeAll();
        viewerContainer.add(dmnViewer);
    }

    public void setDmnXml(String dmnXml) {
        if (dmnViewer != null) {
            dmnViewer.setDmnXml(dmnXml);
        }
    }

    public void setDmnXml(String dmnXml, String decisionDefinitionKey) {
        if (dmnViewer != null) {
            dmnViewer.setDmnXml(dmnXml, decisionDefinitionKey);
        }
    }

    public void setDmnXml(String dmnXml, SerializableConsumer<JsonValue> callback) {
        if (dmnViewer != null) {
            dmnViewer.setDmnXml(dmnXml, callback);
        }
    }

    public void setNoBorders(boolean noBorders) {
        this.noBorders = noBorders;
    }

    public void showDecisionDefinition(String decisionDefinitionKey, SerializableConsumer<JsonValue> callback) {
        if (dmnViewer != null) {
            dmnViewer.showDecisionDefinition(decisionDefinitionKey, callback);
        }
    }

    public void showDecisionInstance(ShowDecisionInstanceCmd cmd) {
        if (dmnViewer != null) {
            dmnViewer.showDecisionInstance(cmd);
        }
    }

    public void addImportCompleteListener(ComponentEventListener<DmnXmlImportCompleteEvent> listener) {
        if (dmnViewer != null) {
            dmnViewer.addImportCompleteListener(listener);
        }
    }
}
