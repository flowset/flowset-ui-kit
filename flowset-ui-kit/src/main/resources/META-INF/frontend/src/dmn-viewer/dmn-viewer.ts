/*
 * Copyright (c) Haulmont 2024. All Rights Reserved.
 * Use is subject to license terms.
 */

// @ts-ignore
import {css, html, LitElement} from 'lit';
// @ts-ignore
import {customElement} from 'lit/decorators.js';
// @ts-ignore
import Viewer from "dmn-js/dist/dmn-viewer.development.js";

// @ts-ignore
import {dmnJsDecisionTableStyles} from './style/dmn-js-decision-table-style.js';
// @ts-ignore
import {dmnJsDrdStyles} from './style/dmn-js-drd-style.js';
// @ts-ignore
import {dmnJsLiteralExpressionStyle} from './style/dmn-js-literal-expression-style.js';
// @ts-ignore
import {dmnJsSharedStyle} from './style/dmn-js-shared-style.js';

// @ts-ignore
import {dmnEmbeddedStyle} from './style/dmn-embedded-style.js';

import {XmlImportCompleteEvent} from "./events";
import {DmnDecisionDefinition} from "./types";
import {dmnViewerStyles} from "./style/dmnViewerStyles";

// @ts-ignore
@customElement('flowset-control-dmn-viewer')
// @ts-ignore
class FlowsetControlDmnViewer extends LitElement {

    private readonly DMN_VIEWER_HOLDER: string = "dmnViewerHolder";
    private readonly viewer: Viewer;
    private shadowRoot: any;

    static styles = [
        dmnEmbeddedStyle,
        dmnJsDecisionTableStyles,
        dmnJsDrdStyles,
        dmnJsLiteralExpressionStyle,
        dmnJsSharedStyle,
        dmnViewerStyles,
      ];

    constructor() {
        super();

        this.viewer = new Viewer();
        this.viewer.on("import.parse.complete", (e: any) => {
            const rootElements = e.definitions?.drgElement as Array<any> || [];
            const decisionDefinitions: DmnDecisionDefinition[] = [];
            rootElements.forEach((item: any) => {
                if (item.$type === "dmn:Decision") {
                    decisionDefinitions.push({
                        key: item.id,
                        name: item.name
                    });
                }
            });
            const decisionDefinitionsJson = JSON.stringify(decisionDefinitions);
            this.dispatchEvent(new XmlImportCompleteEvent(decisionDefinitionsJson));
        });
    }

    static get properties() {
        return {
        };
    }

    public async reloadSchema(xmlSchema: string, decisionDefinitionKey?: string) {
        await this.viewer.importXML(xmlSchema);
        const dmnViewerHolder = this.shadowRoot.getElementById(this.DMN_VIEWER_HOLDER)!
        if (decisionDefinitionKey) {
            dmnViewerHolder.classList.add('no-drd-button');
            this.showDecision(decisionDefinitionKey);
        } else {
            dmnViewerHolder.classList.remove('no-drd-button');
        }
    }

    public async showDecisionDefinition(decisionDefinitionKey: string) {
        this.showDecision(decisionDefinitionKey);
    }

    private showDecision(decisionDefinitionKey: string) {
        const views = this.viewer.getViews();
        const decisionTableViews = views.filter( ({type, id}:{type: string, id:string}) =>
            type === "decisionTable" && id === decisionDefinitionKey);
        if (decisionTableViews && decisionTableViews.length > 0) {
            this.viewer.open(decisionTableViews[0]);
        } else {
            console.log('There is no dmn view with such id: ', decisionDefinitionKey);
        }
    }

    public async showDecisionInstance(decisionInstanceJson:any) {
        const decisionInstance = JSON.parse(decisionInstanceJson);

        if (decisionInstance && decisionInstance.outputDataList) {
            decisionInstance.outputDataList.forEach((outputData: any) => {
                const allDecisionCells = this.viewer._container.querySelectorAll(
                    'td.cell[data-row-id="' + outputData.dataRowId + '"],' +
                    ' [data-element-id="' + outputData.dataRowId + '"]');
                allDecisionCells.forEach((cell: any) => {
                    cell.style.background = '#e0f2fb';
                });

                const outputCells = this.viewer._container.querySelectorAll(
                    '[data-row-id="' + outputData.dataRowId + '"]' +
                    '[data-col-id="' + outputData.dataColId + '"]');
                if (outputCells.length > 0) {
                    const span = document.createElement('span');
                    span.textContent = ' = ' + outputData.value;
                    span.style.fontWeight = '700';
                    outputCells[0].appendChild(span);
                }
            });
        }
    }

    render() {
        return html`
            <div id="${(this.DMN_VIEWER_HOLDER)}" style="width: 100%; height: 100%"/>
        `;
    }

    updated(updatedProps: any) {
        this.awaitRun(() => this.initViewer());
    }

    private initViewer() {
        this.viewer.attachTo(this.shadowRoot.getElementById(this.DMN_VIEWER_HOLDER)!);
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
