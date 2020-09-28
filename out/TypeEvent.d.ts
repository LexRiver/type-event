export declare type TypeEventResult = void | undefined | {
    unsubscribe: boolean;
} | Promise<void | undefined | {
    unsubscribe: boolean;
}>;
export declare class TypeEvent<F extends (...args: any) => TypeEventResult> {
    maxCountOfSubscribers: number | undefined;
    protected _actions: F[];
    protected _onceActions: F[];
    constructor(maxCountOfSubscribers?: number | undefined);
    subscribe(action: F): void;
    /**
     * subscribe to event and delete this subscriber after first execution
     * @param onceAction
     */
    once(onceAction: F): void;
    unsubscribe(action: F): void;
    unsubscribeAll(): void;
    triggerAsync(...p: Parameters<F>): Promise<void>;
    readonly countOfSubscribers: number;
    readonly countOfOnceSubscribers: number;
}
