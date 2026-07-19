
const FlowableBpmnModdle = {
    "name": "Flowable",
    "uri": "http://flowable.org/bpmn",
    "prefix": "flowable",
    "xml": {
        "tagAlias": "lowerCase"
    },
    "associations": [],
    "types": [
        {
            "name": "Assignable",
            "extends": ["bpmn:UserTask"],
            "properties": [
                {
                    "name": "assignee",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "candidateUsers",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "candidateGroups",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "dueDate",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "priority",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "businessCalendarName",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "ServiceTask",
            "extends": [
                "bpmn:ServiceTask"
            ],
            "properties": [
                {
                    "name": "expression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "class",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "delegateExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "resultVariable",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "type",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "useLocalScopeForResultVariable",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "topic",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "ScriptTask",
            "isAbstract": true,
            "extends": [
                "bpmn:ScriptTask"
            ],
            "properties": [
                {
                    "name": "resultVariable",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Signal",
            "isAbstract": true,
            "extends": [
                "bpmn:Signal"
            ],
            "properties": [
                {
                    "name": "scope",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "EventListener",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "bpmn:Process"
                ]
            },
            "properties": [
                {
                    "name": "class",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "delegateExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "events",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "entityType",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Collectable",
            "isAbstract": true,
            "extends": ["bpmn:MultiInstanceLoopCharacteristics"],
            "properties": [
                {
                    "name": "collection",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "elementVariable",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "AsyncCapable",
            "isAbstract": true,
            "extends": [
                "bpmn:Activity",
                "bpmn:Gateway",
                "bpmn:Event"
            ],
            "properties": [
                {
                    "name": "async",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "exclusive",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": true
                }
            ]
        },
        {
            "name": "ExecutionListener",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "bpmn:Task",
                    "bpmn:ServiceTask",
                    "bpmn:UserTask",
                    "bpmn:BusinessRuleTask",
                    "bpmn:ScriptTask",
                    "bpmn:ReceiveTask",
                    "bpmn:ManualTask",
                    "bpmn:ExclusiveGateway",
                    "bpmn:SequenceFlow",
                    "bpmn:ParallelGateway",
                    "bpmn:InclusiveGateway",
                    "bpmn:EventBasedGateway",
                    "bpmn:StartEvent",
                    "bpmn:IntermediateCatchEvent",
                    "bpmn:IntermediateThrowEvent",
                    "bpmn:EndEvent",
                    "bpmn:BoundaryEvent",
                    "bpmn:CallActivity",
                    "bpmn:SubProcess"
                ]
            },
            "properties": [
                {
                    "name": "expression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "class",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "delegateExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "event",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "fields",
                    "type": "Field",
                    "isMany": true
                }
            ]
        },
        {
            "name": "TaskListener",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "bpmn:UserTask"
                ]
            },
            "properties": [
                {
                    "name": "expression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "class",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "delegateExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "event",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "fields",
                    "type": "Field",
                    "isMany": true
                }
            ]
        },
        {
            "name": "InOutBinding",
            "superClass": [
                "Element"
            ],
            "isAbstract": true,
            "properties": [
                {
                    "name": "source",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "sourceExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "target",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "In",
            "superClass": [
                "InOutBinding"
            ],
            "meta": {
                "allowedIn": [
                    "bpmn:CallActivity"
                ]
            }
        },
        {
            "name": "Out",
            "superClass": [
                "InOutBinding"
            ],
            "meta": {
                "allowedIn": [
                    "bpmn:CallActivity"
                ]
            }
        },
        {
            "name": "CallActivity",
            "extends": ["bpmn:CallActivity"],
            "properties": [
                {
                    "name": "calledElementType",
                    "isAttr": true,
                    "type": "String",
                    "default": "key"
                },
                {
                    "name": "sameDeployment",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "businessKey",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "inheritBusinessKey",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "inheritVariables",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                }
            ]
        },
        {
            "name": "Field",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "bpmn:ServiceTask"
                ]
            },
            "properties": [
                {
                    "name": "name",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "expression",
                    "type": "String"
                },
                {
                    "name": "stringValue",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "string",
                    "type": "String"
                }
            ]
        },
        {
            "name": "Process",
            "isAbstract": true,
            "extends": [
                "bpmn:Process"
            ],
            "properties": [
                {
                    "name": "candidateStarterGroups",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "candidateStarterUsers",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "TerminateEventDefinition",
            "extends": [
                "bpmn:TerminateEventDefinition"
            ],
            "properties": [
                {
                    "name": "terminateAll",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                }
            ]
        },
        {
            "name": "TimerEventDefinition",
            "extends": [
                "bpmn:TimerEventDefinition"
            ],
            "properties": [
                {
                    "name": "businessCalendarName",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "FailedJobRetryTimeCycle",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "bpmn:ServiceTask"
                ]
            },
            "properties": [
                {
                    "name": "value",
                    "isBody": true,
                    "type": "String"
                }
            ]
        },
    ],
    "emumerations": []
}

export default FlowableBpmnModdle;