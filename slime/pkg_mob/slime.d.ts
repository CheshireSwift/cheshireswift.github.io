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
* @returns {boolean}
*/
  static mobile(): boolean;
/**
* @returns {boolean}
*/
  static beefy(): boolean;
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
/**
* @param {any} x
* @param {any} y
*/
  mousedown(x: any, y: any): void;
/**
* @param {any} _x
* @param {any} _y
*/
  mouseup(_x: any, _y: any): void;
/**
* @param {any} x
* @param {any} y
*/
  mousemove(x: any, y: any): void;
/**
*/
  color(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_slime_free: (a: number) => void;
  readonly slime_mobile: () => number;
  readonly slime_beefy: () => number;
  readonly slime_new: (a: number) => number;
  readonly slime_simulate: (a: number, b: number, c: number, d: number) => void;
  readonly slime_mousedown: (a: number, b: number, c: number) => void;
  readonly slime_mouseup: (a: number, b: number, c: number) => void;
  readonly slime_mousemove: (a: number, b: number, c: number) => void;
  readonly slime_color: (a: number) => void;
  readonly slime_width: () => number;
  readonly slime_height: () => number;
  readonly set_panic_hook: () => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
