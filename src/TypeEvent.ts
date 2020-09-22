export class TypeEvent<F extends (...args:any)=>void|undefined|{unsubscribe:boolean}|Promise<void|undefined|{unsubscribe:boolean}>>{
    protected _actions:F[] = []
    protected _onceActions:F[] = []
    //protected _maxCountOfSubscribers:number|undefined = undefined
    //public maxSubscribers:number = 100

    constructor(public maxCountOfSubscribers:number|undefined = undefined) {
    }
    
    subscribe(action:F){
        if(this.maxCountOfSubscribers && this.maxCountOfSubscribers > 0 && this._actions.length>this.maxCountOfSubscribers) throw new Error(`too much susbcribers: limit is ${this.maxCountOfSubscribers}`)
        this._actions.push(action)
    }
    /**
     * subscribe to event and delete this subscriber after first execution
     * @param onceAction 
     */
    once(onceAction:F){
        this._onceActions.push(onceAction)
    }

    unsubscribe(action:F){
        this._actions = this._actions.filter(x => x !== action)
        this._onceActions = this._onceActions.filter(x => x!==action)
        // while(true){
        //     let index = this._actions.indexOf(action)
        //     if(index >= 0){
        //         this._actions.splice(index, 1)
        //     } else break
        // } 
    }
    async triggerAsync(...p:Parameters<F>){
        const actionsToDelete:F[] = []
        for(let action of this._actions){
            let result = await action(...p)
            if(result && result.unsubscribe){
                actionsToDelete.push(action)
            }
        }

        // execute and delete onceActions
        for(let onceAction of this._onceActions){
            onceAction(...p)
        }
        this._onceActions = []

        // remove actions which retuns {unsubscribe:true}
        if(actionsToDelete.length>0){
            //console.log('deleting actions, count=', actionsToDelete.length)
            this._actions = this._actions.filter(x => actionsToDelete.indexOf(x)<0)
        }

    }
    get countOfSubscribers():number{
        return this._actions.length
    }

    get countOfOnceSubscribers():number{
        return this._onceActions.length
    }
}

