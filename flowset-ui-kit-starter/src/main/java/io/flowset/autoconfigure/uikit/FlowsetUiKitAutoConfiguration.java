package io.flowset.autoconfigure.uikit;

import io.flowset.uikit.FlowsetUiKitConfiguration;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Import;

@AutoConfiguration
@Import({FlowsetUiKitConfiguration.class})
public class FlowsetUiKitAutoConfiguration {
}

