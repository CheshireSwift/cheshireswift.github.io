/* tslint:disable */
/* eslint-disable */
/**
*/
export function set_panic_hook(): void;
/**
*/
export class Slime {
  free(): void;
/**
* @returns {number}
*/
  static width(): number;
/**
* @returns {number}
*/
  static height(): number;
/**
* @param {number} agent_count
* @returns {Slime}
*/
  static new(agent_count: number): Slime;
/**
* @param {number} millis
* @param {CanvasRenderingContext2D} ctx
*/
  simulate(millis: number, ctx: CanvasRenderingContext2D): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_slime_free: (a: number) => void;
  readonly slime_width: () => number;
  readonly slime_height: () => number;
  readonly slime_new: (a: number) => number;
  readonly slime_simulate: (a: number, b: number, c: number) => void;
  readonly set_panic_hook: () => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
