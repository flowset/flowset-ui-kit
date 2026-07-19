/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit.component.bpmnviewer.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Contains data about the BPMN process activity shown on the BPMN diagram.
 */
public class ActivityData {
    private String id;
    private String name;
    private String type;
    @JsonProperty("isMultiInstance")
    private Boolean isMultiInstance;
    private String multiInstanceType;

    public ActivityData() {
    }

    @JsonProperty("isMultiInstance")
    public Boolean getMultiInstance() {
        return isMultiInstance;
    }

    @JsonProperty("isMultiInstance")
    public void setMultiInstance(Boolean multiInstance) {
        isMultiInstance = multiInstance;
    }

    public String getMultiInstanceType() {
        return multiInstanceType;
    }

    public void setMultiInstanceType(String multiInstanceType) {
        this.multiInstanceType = multiInstanceType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
