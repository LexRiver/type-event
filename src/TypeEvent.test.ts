import { TypeEvent } from "./TypeEvent"

test('(one)', async () => {
    const e = new TypeEvent()
    let countOfTriggersUsual = 0
    let countOfTriggersOnce = 0
    let countOfTriggerWithUnsubscribe = 0
    e.subscribe(() => {
        countOfTriggersUsual++
        //console.log('hello from subscriber')
    })
    e.subscribe(() => {
        countOfTriggerWithUnsubscribe++
        return {unsubscribe:true}
    })
    e.once(() => {
        countOfTriggersOnce++
        //console.log('hello from once subscriber')
    })
    await e.triggerAsync()
    e.once(() => {
        countOfTriggersOnce++
        //console.log('hello from another once subscriber')
    })
    await e.triggerAsync()
    //console.log('now expectin no output')
    await e.triggerAsync()

    console.log('countOfTriggersUsual=', countOfTriggersUsual)
    console.log('countofTriggersOnce=', countOfTriggersOnce)

    expect(e.countOfOnceSubscribers).toEqual(0)
    expect(e.countOfSubscribers).toEqual(1)
    expect(countOfTriggersOnce).toEqual(2)
    expect(countOfTriggerWithUnsubscribe).toEqual(1)
    expect(countOfTriggersUsual).toEqual(3)
})

test('multiparams', async() => {
    const e = new TypeEvent<(x:number,y:number,z:number)=>void>()
    let sum = 0

    e.subscribe((x,y,z) => {
        console.log('x=', x, 'y=', y, 'z=', z)
        sum = x + y + z
    })

    await e.triggerAsync(100,200,300)

    expect(sum).toEqual(600)

})

test('unsubscribe', () => {
    const e = new TypeEvent<()=>void>()
    let counter = 0
    const eventHandler = () => {
        console.log('event is triggered')
        counter++
    }
    e.subscribe(eventHandler)
    e.triggerAsync()
    e.unsubscribe(eventHandler)
    e.triggerAsync()
    expect(counter).toEqual(1)
})

test('unsubscribeAll', () => {
    const e = new TypeEvent<()=>void>()
    e.subscribe(() => console.log('1'))
    e.subscribe(() => console.log('2'))
    e.once(() => console.log('3'))
    e.unsubscribeAll()
    expect(e.countOfOnceSubscribers).toEqual(0)
    expect(e.countOfSubscribers).toEqual(0)
})

