/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.model;

/**
 * Contains the values of the Business Rule Task element attributes.
 */
public class BusinessRuleTaskData {
    protected String decisionRef;
    protected String binding;
    protected String versionTag;
    protected String version;

    public BusinessRuleTaskData() {
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
