/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

package io.flowset.uikit;

import io.jmix.core.annotation.JmixModule;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;

@SpringBootConfiguration
@EnableAutoConfiguration
@Import(FlowsetUiKitConfiguration.class)
@JmixModule(id = "io.flowset.uikit.test", dependsOn = FlowsetUiKitConfiguration.class)
public class FlowsetUiKitTestConfiguration {

}
