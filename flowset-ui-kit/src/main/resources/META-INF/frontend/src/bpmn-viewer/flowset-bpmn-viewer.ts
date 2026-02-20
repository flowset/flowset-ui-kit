/*
 * Copyright (c) Haulmont 2025. All Rights Reserved.
 * Use is subject to license terms.
 */

// @ts-ignore
import {html, LitElement} from 'lit';
// @ts-ignore
import {customElement} from 'lit/decorators.js';
import Canvas from 'diagram-js/lib/core/Canvas';
import ZoomScroll from 'diagram-js/lib/navigation/zoomscroll/ZoomScroll';
import {
    ActivityData,
    AddMarkerCmd,
    BpmProcessDefinition,
    RemoveMarkerCmd,
    ScrollToElementCmd,
    SetElementColorCmd,
    ViewerMode
} from "./types";
import {
    BpmnElementClickEvent,
    CalledProcessInstanceOverlayClickEvent,
    CalledProcessOverlayClickEvent,
    DecisionInstanceLinkOverlayClickedEvent,
    DecisionLinkOverlayClickEvent,
    DocumentationOverlayClickedEvent,
    SendMessageOverlayClickEvent,
    XmlImportCompleteEvent
} from "./events";
import BpmDrawing from "./bpm/js/features/bpm-drawing/BpmDrawing";
import BpmnViewer from "./bpm/js/BpmnViewer";
import {ImportParseCompleteEvent} from "bpmn-js/lib/BaseViewer";
import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import EventBus from 'diagram-js/lib/core/EventBus';
import {Element} from 'bpmn-js/lib/model/Types';
import {bpmnViewerStyles} from "./styles/bpmnViewerStyles";
import {OverlayManager} from "./overlay/OverlayManager";
import {ElementLike} from "diagram-js/lib/model/Types";
import {
    CalledInstancesOverlayData,
    CalledProcessOverlaysData,
    DecisionInstanceLinkOverlayData,
    DecisionLinkOverlaysData,
    DocumentationOverlayData,
    IncidentOverlayData,
    NewActivityStatisticsOverlayData,
    OverlayType,
    SendMessageOverlaysData
} from "./overlay/types";
import {findProcessDefinitions} from "./utils/findProcessDefinitions";

@customElement("flowset-bpmn-viewer")
class FlowsetBpmnViewer extends LitElement {
    private readonly BPMN_VIEWER_HOLDER: string = "bpmnViewerHolder";

    private readonly IGNORED_ACTIVITY_TYPES: string[] = ["bpmn:Participant", "bpmn:SequenceFlow", "bpmn:Collaboration", "bpmn:Process"];

    private shadowRoot: any;

    private readonly viewer: BpmnViewer;
    private bpmnXml: string | undefined;
    private readonly bpmDrawing: BpmDrawing;
    private readonly canvas: Canvas;
    private zoomScroll: ZoomScroll;
    private eventBus: EventBus;
    private overlayManager: OverlayManager;
    private viewerHolder: HTMLDivElement | undefined;

    private processDefinitionsJson: string;

    private mode: string;

    static get styles() {
        return bpmnViewerStyles;
    }

    constructor() {
        super();
        this.viewer = new BpmnViewer();
        this.bpmDrawing = this.viewer.get<BpmDrawing>("bpmDrawing");
        this.canvas = this.viewer.get<Canvas>("canvas");
        this.zoomScroll = this.viewer.get<ZoomScroll>("zoomScroll");
        this.eventBus = this.viewer.get<EventBus>("eventBus");
        this.overlayManager = new OverlayManager(this.viewer);

        this.viewer.on("import.parse.complete", (e: ImportParseCompleteEvent) => {
            const processDefinitions: BpmProcessDefinition[] = findProcessDefinitions(e);
            this.processDefinitionsJson = JSON.stringify(processDefinitions);
            this.dispatchEvent(new XmlImportCompleteEvent(this.processDefinitionsJson));

            this.resetZoom();
        });
    }

    static get properties() {
        return {
            bpmnXml: {type: String}
        }
    }

    render() {
        return html`
            <div id="${(this.BPMN_VIEWER_HOLDER)}" style="width: 100%; height: 100%"/>
        `;
    }

    updated(updatedProps: any) {
        this.awaitRun(() => this.initViewer());
    }

    public async reloadSchema(xmlSchema: string) {
        await this.viewer.importXML(xmlSchema)
    }

    public setElementColor(cmdJson: string) {
        const cmd: SetElementColorCmd = JSON.parse(cmdJson);
        this.awaitRun(() => this.bpmDrawing.setElementColor(cmd));
    }

    public setIncidentCount(cmdJson: string) {
        const elements: IncidentOverlayData[] = JSON.parse(cmdJson) || [];
        this.awaitRun(() => elements.forEach(value => {
            this.overlayManager.showIncidentOverlay(value);
        }));
    }

    public showDocumentationOverlay(cmdJson: string) {
        const cmd: DocumentationOverlayData = JSON.parse(cmdJson);

        const handleOverlayClick = (element: ElementLike, documentationValue: string) => {
            this.dispatchEvent(new DocumentationOverlayClickedEvent(
                element.id, element.type, documentationValue));
        };

        this.awaitRun(() => {
            this.overlayManager.showDocumentationOverlay({data: cmd, handleClick: handleOverlayClick});
        });
    }

    public showDecisionInstanceLinkOverlay(cmdJson: any) {
        const cmd: DecisionInstanceLinkOverlayData = JSON.parse(cmdJson);
        this.awaitRun(() => {
            const handleOverlayClick = (decisionInstanceId: string) => {
                this.dispatchEvent(new DecisionInstanceLinkOverlayClickedEvent(decisionInstanceId));
            };
            this.overlayManager.showDecisionInstanceLinkOverlay({data: cmd, handleClick: handleOverlayClick})
        });
    }

    public showCalledProcessOverlays(cmdJson: string) {
        const cmd: CalledProcessOverlaysData = JSON.parse(cmdJson);

        this.awaitRun(() => {
            const handleOverlayClick = (element: ElementLike, callActivityData: JSON) => {
                this.dispatchEvent(new CalledProcessOverlayClickEvent(element.id, callActivityData));
            }
            this.overlayManager.showCalledProcessOverlays({data: cmd, handleClick: handleOverlayClick});
        });
    }

    public showDecisionLinkOverlays(cmdJson: string) {
        const cmd: DecisionLinkOverlaysData = JSON.parse(cmdJson);

        this.awaitRun(() => {
            const handleOverlayClick = (element: ElementLike, businessRuleTaskData: JSON) => {
                this.dispatchEvent(new DecisionLinkOverlayClickEvent(element.id, businessRuleTaskData));
            }
            this.overlayManager.showDecisionLinkOverlays({data: cmd, handleClick: handleOverlayClick});
        });
    }

    public showCalledInstanceOverlay(cmdJson: string) {
        const cmd: CalledInstancesOverlayData = JSON.parse(cmdJson);

        this.awaitRun(() => {
            const handleOverlayClick = (details: JSON) => {
                this.dispatchEvent(new CalledProcessInstanceOverlayClickEvent(details));
            }

            this.overlayManager.showCalledInstances({data: cmd, handleClick: handleOverlayClick});
        });
    }

    public addTransactionBoundaries() {
        this.awaitRun(() => {
            this.overlayManager.addTransactionBoundaryOverlays();
        });
    }

    public setTransactionBoundariesVisible(visible: boolean) {
        this.awaitRun(() => {
            this.overlayManager.updateOverlaysVisibility(OverlayType.TRANSACTION_BOUNDARY, visible);
        });
    }

    public scrollToElement(cmdJson: string) {
        const data: ScrollToElementCmd = JSON.parse(cmdJson);
        this.awaitRun(() => {

            this.canvas.scrollToElement(data.elementId, {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            });

            if (data.useAnimation) {
                this.overlayManager.addAnimationOverlay(data.elementId, data.durationInSec);
            }
        });
    }

    public addMarker(cmdJson: string) {
        const cmd: AddMarkerCmd = JSON.parse(cmdJson);
        this.awaitRun(() => this.canvas.addMarker(cmd.elementId, cmd.marker));
    }

    public removeMarker(cmdJson: string) {
        const cmd: RemoveMarkerCmd = JSON.parse(cmdJson);
        this.awaitRun(() => this.canvas.removeMarker(cmd.elementId, cmd.marker));
    }

    public resetZoom() {
        this.awaitRun(() => {
            this.canvas.resized();
            this.canvas.zoom('fit-viewport', 'auto');
        });
    }

    public zoomByStep(step: number) {
        this.awaitRun(() => {
            if (!this.viewerHolder) {
                this.viewerHolder = this.shadowRoot.getElementById(this.BPMN_VIEWER_HOLDER) as HTMLDivElement;
            }
            this.zoomScroll.zoom(step, {
                x: this.viewerHolder.offsetWidth / 2,
                y: this.viewerHolder.offsetHeight / 2
            });
        });
    }

    public setMode(mode?: string) {
        this.mode = mode;
        if (mode === ViewerMode.Interactive) {
            const ignoredTypes: string[] = ["bpmn:Participant", "bpmn:SequenceFlow", "bpmn:Collaboration", "bpmn:Process"];
            const isActiveElement = element => {
                const type: string | undefined = element.type;
                return type && ignoredTypes.indexOf(type) === -1;
            }
            this.addElementInteractionListeners(isActiveElement)

        } else if (!mode || mode === ViewerMode.ReadOnly) {
            this.removeElementInteractionListeners();
        }
    }

    public setActiveElements(activeElements?: string[]) {
        if (this.mode == ViewerMode.Interactive && activeElements?.length > 0) {
            const isActiveElement = element => activeElements.indexOf(element.id) !== -1

            this.removeElementInteractionListeners();
            this.addElementInteractionListeners(isActiveElement);
        }
    }

    public setActivityStatisticsVisible(visible: boolean) {
        this.overlayManager.updateOverlaysVisibility(OverlayType.ACTIVITY_STATISTICS, visible);
    }

    public setActivityStatistics(cmdJson: string) {
        const data: NewActivityStatisticsOverlayData = JSON.parse(cmdJson);

        this.awaitRun(() => {
            this.overlayManager.showActivityStatistics(data);
        });
    }

    public getActivities(): ActivityData[] {
        const elementRegistry: ElementRegistry = this.viewer.get<ElementRegistry>('elementRegistry');

        const allElements = elementRegistry.filter((e: Element) => {
            return e.type && this.IGNORED_ACTIVITY_TYPES.indexOf(e.type) === -1;
        });

        const activityList: ActivityData[] = allElements.map((e: Element) => {
            return {
                id: e.id,
                name: e.businessObject.name,
                type: e.type
            } as ActivityData;
        });

        return activityList;
    }

    public showSendMessageOverlays(cmdJson: string) {
        const cmd: SendMessageOverlaysData = JSON.parse(cmdJson);
        this.awaitRun(() => {
            const handleClick = (details: JSON) => {
                this.dispatchEvent(new SendMessageOverlayClickEvent(details));
            }
            this.overlayManager.showSendMessageOverlays({data: cmd, handleClick});
        });
    }

    private addElementInteractionListeners(isElementActive: (element: any) => boolean) {
        this.eventBus.on('element.hover', (event: any) => {
            const elementActive = isElementActive(event.element);
            if (elementActive) {
                this.canvas.addMarker(event.element.id, 'activity-hover');
            }
        });

        this.eventBus.on('element.out', (event: any) => {
            const elementActive = isElementActive(event.element);
            if (elementActive) {
                this.canvas.removeMarker(event.element.id, 'activity-hover');
            }
        });

        this.eventBus.on('element.click', (event: any) => {
            const elementActive = isElementActive(event.element);
            if (elementActive) {
                this.dispatchEvent(new BpmnElementClickEvent(event.element.id, event.element.type, event.element.businessObject?.name));
            }
        });
    }

    private removeElementInteractionListeners() {
        this.eventBus.off('element.hover');
        this.eventBus.off('element.out');
        this.eventBus.off('element.click');
    }

    private initViewer() {
        this.viewer.attachTo(this.shadowRoot.getElementById(this.BPMN_VIEWER_HOLDER)!);
        if (this.bpmnXml) {
            this.viewer.importXML(this.bpmnXml).then(r => {
                console.log(r.warnings);
            });
        }
    }

    private awaitRun(callable: () => void) {
        setTimeout(() => {
            try {
                callable();
            } catch (err) {
                console.log('error while running callable', err);
            }
        }, 100);
    }
}