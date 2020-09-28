# TypeEvent

Typed event class for typescript

## Install

```
npm install @lexriver/type-event
```

<br/>

## Import
```typescript
import {TypeEvent} from '@lexriver/type-event'
```

<br/>

## Usage

```typescript
// creating new event
const e = new TypeEvent<(a:number, b:number)=>void>()

let sum = 0

// subscribing to event
e.subscribe((a,b) => {
    console.log('event is triggered!', 'a=', a, 'b=', b)
    sum = a + b
})

// triggering event
await e.triggerAsync(100,200)

console.log(sum) // 300
```

<br/>
<br/>

## Unsubscibe from event

There are two ways to unsubscribe from event.

First way is to return special object ```{unsubscribe:true}```

```typescript
const e = new TypeEvent()
e.subscribe(() => {
    if(someCondition()){
        return {unsubscribe: true}
    }
})
```

Second way is to use ```.unsubscribe(handler)``` method on event

```typescript
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

console.log(counter) // 1

```

<br/>
<br/>

## Subscribe once

```typescript
const e = new TypeEvent()
let counter = 0
e.once(() => {
    counter++
})
e.triggerAsync()
e.triggerAsync()
console.log(counter) // 1
```

<br/>
<br/>

## Count of subscribers

Use ```.countOfSubscribers``` and ```.countOfOnceSubscribers``` properties to get some stats for the event.

```typescript
const e = new TypeEvent()
e.once(() => {

})
e.once(() => {

})
e.subscribe(() => {

})

console.log(e.countOfSubscribers) // 1
console.log(e.countOfOnceSubscribers) // 2
```

<br/>
<br/>

## Unsubscribe all

Unsubscribe all handlers from event

```typescript
const e = new TypeEvent()
e.subscribe(() => 0)
e.subscribe(() => 1)
e.once(() => 2)
e.unsubscribeAll()
e.countOfSubscribers // 0
e.countofOnceSubscribers // 0
```
