/*
 * Copyright (c) Haulmont 2026. All Rights Reserved.
 * Use is subject to license terms.
 */

import {EngineFamily, EngineType} from "../types";

const ENGINE_FAMILIES: Record<EngineType, EngineFamily> = {
    [EngineType.Camunda7]: EngineFamily.Camunda7,
    [EngineType.Operaton]: EngineFamily.Camunda7,
    [EngineType.Fluxnova]: EngineFamily.Camunda7,
    [EngineType.CibSeven]: EngineFamily.Camunda7,
    [EngineType.JmixBpm3]: EngineFamily.Flowable8
};

/**
 * Returns the family of the engine type.
 * @param engineType engine type of the parent process
 * @return the engine family or undefined if the engine type is not set or unknown
 */
export const getEngineFamily = (engineType?: EngineType): EngineFamily | undefined => {
    return engineType ? ENGINE_FAMILIES[engineType] : undefined;
}
