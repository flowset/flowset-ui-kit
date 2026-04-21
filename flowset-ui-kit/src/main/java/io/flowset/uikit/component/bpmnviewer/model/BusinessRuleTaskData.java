/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.model;

import io.jmix.core.metamodel.annotation.JmixEntity;

/**
 * Contains the values of the Business Rule Task element attributes.
 */
@JmixEntity
public class BusinessRuleTaskData {
    protected String elementId;
    protected String elementName;
    protected String decisionRef;
    protected String binding;
    protected String versionTag;
    protected String version;

    public BusinessRuleTaskData() {
    }

    public void setElementId(String elementId) {
        this.elementId = elementId;
    }

    public void setElementName(String elementName) {
        this.elementName = elementName;
    }

    public void setDecisionRef(String decisionRef) {
        this.decisionRef = decisionRef;
    }

    public void setBinding(String binding) {
        this.binding = binding;
    }

    public void setVersionTag(String versionTag) {
        this.versionTag = versionTag;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDecisionRef() {
        return decisionRef;
    }

    public String getElementId() {
        return elementId;
    }

    public String getElementName() {
        return elementName;
    }

    public String getBinding() {
        return binding;
    }

    public String getVersionTag() {
        return versionTag;
    }

    public String getVersion() {
        return version;
    }
}
