package io.flowset.uikit.component.formviewer;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.function.SerializableConsumer;
import elemental.json.JsonValue;

@Tag("flowset-control-form-viewer")
@NpmPackage(value = "@bpmn-io/form-js", version = "1.24.1")
@NpmPackage(value = "@bpmn-io/form-js-viewer", version = "1.24.1")
@NpmPackage(value = "@bpmn-io/form-js-playground", version = "1.24.1")
@JsModule("./src/form-viewer/form-viewer.ts")
public class FormViewer extends Component {

    /**
     * Imports specified form JSON into the viewer.
     *
     * @param formJson form JSON string
     */
    public void setFormJson(String formJson) {
        getElement().callJsFunction("reloadSchema", formJson);
    }

    /**
     * Imports specified form JSON into the viewer and then invokes the specified callback.
     *
     * @param formJson form JSON string
     * @param callback callback
     */
    public void setFormJson(String formJson, SerializableConsumer<JsonValue> callback) {
        getElement().callJsFunction("reloadSchema", formJson).then(callback);
    }
}
