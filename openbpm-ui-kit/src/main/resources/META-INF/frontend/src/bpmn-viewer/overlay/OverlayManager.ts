/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

import Overlays, {OverlayAttrs} from "diagram-js/lib/features/overlays/Overlays";
import {createIncidentOverlay} from "./createIncidentOverlay";
import {
    NewActivityStatisticsOverlayData,
    CalledInstancesOverlayParams,
    CalledProcessOverlaysParams,
    DecisionInstanceLinkOverlayParams,
    DocumentationOverlayParams,
    IncidentOverlayData,
    OverlayData,
    OverlayPosition,
    OverlayType,
    SendMessageOverlaysData,
    SendMessageOverlaysParams
} from "./types";
import {createDocumentationOverlay} from "./createDocumentationOverlay";
import BpmnViewer from "../bpm/js/BpmnViewer";
import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import Canvas from 'diagram-js/lib/core/Canvas';
import {createNavigationOverlay} from "./createNavigationOverlay";
import {getMessage, isMessageSupported} from "../utils/bpmnEventUtils";
import {createSendMessageOverlay} from "./createSendMessageOverlay";
import {getBinding, getCalledElement, getVersion, getVersionTag} from "../utils/callActivityUtils";
import {ElementLike} from "diagram-js/lib/model/Types";
import {findElementDocumentation} from "../utils/documentationUtils";
import {createActivityStatisticsOverlay} from "./createActivityStatisticsOverlay";

/**
 * OverlayManager class manages various overlays associated with BPMN diagram elements,
 * offering functionalities such as showing incident overlays, documentation links,
 * navigation options, and other interactive visual indicators.
 */
export class OverlayManager {
    private overlays: Overlays;
    private elementRegistry: ElementRegistry;
    private canvas: Canvas;

    constructor(viewer: BpmnViewer) {
        this.overlays = viewer.get<Overlays>("overlays");
        this.elementRegistry = viewer.get<ElementRegistry>("elementRegistry");
        this.canvas = viewer.get<Canvas>("canvas");
    }

    /**
     * Adds an overlay with incident count for the specified element.
     * @param data overlay data
     */
    public showIncidentOverlay(data: IncidentOverlayData) {
        const incidentOverlay = createIncidentOverlay({tooltipMessage : data.tooltipMessage, incidentCount : data.incidentCount});
        this.overlays.add(data.elementId, OverlayType.INCIDENT_COUNT, incidentOverlay);
    }

    /**
     * Adds or removes overlays for the all elements that allow viewing element documentation.
     * @param data overlays data
     * @param handleClick overlay click handler
     */
    public showDocumentationOverlay({data: {showDocumentationOverlay}, handleClick}: DocumentationOverlayParams) {
        this.overlays.remove({type: OverlayType.DOCUMENTATION});

        if (showDocumentationOverlay) {
            const elements: ElementLike[] = this.elementRegistry.filter(element => {
                return element.type !== 'label';
            });

            elements.forEach((element: ElementLike) => {
                const documentation = findElementDocumentation(element);

                if (!documentation) {
                    return;
                }
                const documentationValue: string = documentation.text;

                const handleOverlayClick = () => {
                    handleClick(element, documentationValue);
                };

                const sendMessageOverlay = this.overlays.get({element: element.id, type: OverlayType.SEND_MESSAGE});
                let customPosition: OverlayPosition;
                if (sendMessageOverlay && Array.isArray(sendMessageOverlay) && sendMessageOverlay.length > 0) {
                    // show a documentation overlay on top of the "send message" overlay
                    customPosition = {
                        top: sendMessageOverlay[0].position.top - 25,
                        left: sendMessageOverlay[0].position.left
                    }
                }

                const documentationOverlay: OverlayAttrs = createDocumentationOverlay({
                    element,
                    title: documentationValue,
                    handleClick: handleOverlayClick,
                    customPosition,
                    rootClass: sendMessageOverlay ? "overlay-group-item-root" : undefined
                });

                this.overlays.add(element.id, OverlayType.DOCUMENTATION, documentationOverlay);
            });
        }
    }

    /**
     * Adds an overlay to navigate to the called decision instance from the Business Rule Task element.
     * @param data overlay data
     * @param handleClick overlay click handler
     */
    public showDecisionInstanceLinkOverlay({data, handleClick}: DecisionInstanceLinkOverlayParams) {
        const element = this.elementRegistry.find((element) => {
            return element.type == "bpmn:BusinessRuleTask" && element.id == data.activityId
        });

        if (element) {
            const handleOverlayClick = () => {
                handleClick(data.decisionInstanceId);
            }
            const decisionInstanceOverlay = createNavigationOverlay({title : data.tooltipMessage, handleClick : handleOverlayClick});

            this.overlays.add(element.id, OverlayType.DECISION_INSTANCE, decisionInstanceOverlay);
        }
    }

    /**
     * Adds the "Send message" overlay for each supported element having the message reference.
     * @param data overlays data
     * @param handleClick overlay click handler
     */
    public showSendMessageOverlays({data, handleClick}: SendMessageOverlaysParams) {
        const elements = this.elementRegistry.filter(function (element: ElementLike) {
            return isMessageSupported(element);
        });

        elements.forEach((element: ElementLike) => {
            const message = getMessage(element);
            let canSendMessage = this.shouldRenderSendMessageOverlay(element, data);
            if (canSendMessage) {
                const handleOverlayClick = () => {
                    const details = <JSON><unknown>{
                        "messageName": message.get('name'),
                        "elementId": element.id,
                        "elementType": element.type,
                        "elementName": element.businessObject.name,
                    }
                    handleClick(details);
                }

                const overlayTooltip = `${data.tooltipMessage}: ${message.get("name")}`;
                const sendMessageOverlay: OverlayAttrs = createSendMessageOverlay({title : overlayTooltip, handleClick : handleOverlayClick});
                this.overlays.add(element.id, OverlayType.SEND_MESSAGE, sendMessageOverlay);
            }
        });
    }

    /**
     * Adds a clickable overlay for navigating to the called instances from the specified Call activity element.
     * @param data overlay data
     * @param handleClick overlay click handler
     */
    public showCalledInstances({data, handleClick}: CalledInstancesOverlayParams) {
        const handleOverlayClick = () => {
            const details = <JSON><unknown>{
                "processInstanceIds": data.processInstanceIds
            }
            handleClick(details);
        }

        const calledInstancesOverlay = createNavigationOverlay({title : data.tooltipMessage, handleClick : handleOverlayClick});

        this.overlays.add(data.elementId, OverlayType.CALLED_PROCESS_INSTANCE, calledInstancesOverlay);
    }

    /**
     * Adds a clickable overlay for navigating to the called process for each Call activity element on the diagram.
     * @param data overlay data
     * @param handleClick overlay click handler
     */
    public showCalledProcessOverlays({data, handleClick}: CalledProcessOverlaysParams) {
        this.overlays.remove({type: OverlayType.CALLED_PROCESS});

        if (data.visible) {
            const elements: ElementLike[] = this.elementRegistry.filter(element => element.type == "bpmn:CallActivity");
            elements.forEach((element: ElementLike) => {
                const calledElement = getCalledElement(element);
                if (calledElement && calledElement.length > 0) {
                    const handleOverlayClick = () => {
                        const callActivityData = <JSON><unknown>{
                            "calledElement": calledElement,
                            "version": getVersion(element),
                            "versionTag": getVersionTag(element),
                            "binding": getBinding(element),
                        };

                        handleClick(element, callActivityData);
                    }

                    const tooltipMessage = `${data.tooltipMessage} (${calledElement})`;
                    const calledProcessOverlay = createNavigationOverlay({title : tooltipMessage, handleClick : handleOverlayClick});

                    this.overlays.add(element.id, OverlayType.CALLED_PROCESS, calledProcessOverlay);
                }
            });
        }
    }

    /**
     * Updates visibility for the overlays with the specified type.
     * @param overlayType overlay type
     * @param visible overlay should be visible or not
     */
    public updateOverlaysVisibility(overlayType: OverlayType, visible: boolean) {
        //@ts-ignore
        const overlays: OverlayData[] = this.overlays.get({type: overlayType});

        overlays.forEach(value => {
            value.htmlContainer.style.visibility = visible ? 'visible' : 'hidden';
        });
    }

    /**
     * Adds an overlay with statistics for the specified element.
     * @param data overlay data
     */
    public showActivityStatistics(data: NewActivityStatisticsOverlayData) {
        this.overlays.add(data.elementId, OverlayType.ACTIVITY_STATISTICS, createActivityStatisticsOverlay(data));
    }

    private shouldRenderSendMessageOverlay(element: ElementLike, data: SendMessageOverlaysData): boolean {
        if (data.useActiveEvents) {
            const isRunningActivity = this.canvas.hasMarker(element.id, 'running-activity');
            if (isRunningActivity) {
                return true;

            }
            if (element.host) {
                return this.canvas.hasMarker(element.host, 'running-activity');
            }

            return false;
        }
        return data.useStartEvents && element.type === "bpmn:StartEvent";
    }
}