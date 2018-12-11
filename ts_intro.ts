/********************************************

    TypeScript Intro

    Handbook:
    https://www.typescriptlang.org/docs/handbook/basic-types.html

    TypeScript Release Updates:
    https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-1.html

********************************************/

/********************************************

    Getting Started

    npm i -g typescript
    mkdir ts-demo
    cd ts-demo
    tsc --init
    touch ts_practice.ts
    // Write TypeScript...then compile:
    tsc

********************************************/

/********************************************/
// BASIC TYPES

// boolean
const boolThing: boolean = true;

// number (integers, floats, negative, hex, binary, octat)
const numThing: number = 100;

// string
const strThing: string = 'hello';

// arrays
const boolArr: boolean[] = [true, false];
const numArr: Array<number> = [1, 2];
const nestedStringArr: string[][] = [['one', 'two'], ['three', 'four']];
const nestedNumberArr: Array<Array<number>> = [[10, 20], [30, 40]];

// tuples
const fancyArr: [number, string, boolean] = [5, 'hello', true];

// enum (rarely used directly)
enum Color { Red = 100, Green = 200, Blue = 255 };
Color.Red   // 100
Color.Green // 200
Color.Blue  // 255
Color[100]  // 'Red'
Color[200]  // 'Green'
Color[255]  // 'Blue'

// null and undefined
const nullThing: null = null;
const undefinedThing: undefined = undefined;

// void (mostly for function return types)
let voidThing: void = undefined;
// voidThing = null // only without strictNullChecks;

// never - see FUNCTIONS and TYPE NARROWING
let neverThing: never;

// object (not often useful by itself) - see INTERFACES 
let objectThing: object = {};
objectThing = [];
objectThing = String;
objectThing = /hello/g;
objectThing = () => {};
// objectThing = null // only without strictNullChecks;

// symbol
const symbolThing: symbol = Symbol();

// any (always avoid if possible)
let anyThing: any = true;
anyThing = 5;
anyThing = 'hello';
anyThing = [];
anyThing = {};
anyThing = () => {};
anyThing.indexOf('hello');

// unknown (type-safe version of any, new to TypeScript 3+) - see TYPE NARROWING
let unknownThing: unknown = true;
unknownThing = 5;
unknownThing = 'hello';
unknownThing = [];
unknownThing = {};
unknownThing = () => {};
// unknownThing.indexOf('hello'); // Error
/********************************************/

/********************************************/
// FUNCTIONS

// functions can type their parameters and return
function someFunction (someParam: string): number {
    return Number(someParam);
}

// functions can have optional parameters
function haveSomeParams (needThis: string, notSoMuch?: number) {
    return needThis + notSoMuch;
}

// variables can have function types prior to assignment
const functionCopy: (paramAlias: string) => number = someFunction;

// function types can be extracted using "typeof"
const similarFunction: typeof someFunction = (differentParam: string) => {
    return Number(differentParam) + 1000;
}

// functions with a void return type can have no return
function voidFunction (): void {
    // no return
}

// A 'never' return type indicates the end of the function is never reached
function neverFunction (): never {
    throw new Error('broke');
}

// Calling a function incorrectly is a TS Error
function doSomething(someNumber: number) {}
// doSomething('hello'); // Error
/********************************************/

/********************************************/
// UNION TYPES

// variables can have multiple possible types
let stringOrNumber: string | number = 'five';
stringOrNumber = 5;

// typescript is pretty smart
let someArr: boolean[] | string[][] = [];
let first: boolean | string[] = someArr[0];
/********************************************/

/********************************************/
// LITERAL TYPES

// use literal types to be even stricter about the variables' possible values
const literalBool: false = false;
const literalNum: 2 | 4 | 6 = 2;
const literalString: 'red' | 'blue' | 'green' = 'red';
/********************************************/

/********************************************/
// TYPE INFERENCE

// typescript infers types when none are given
const inferFunction = (param: number) => true;
const inferObject = {
    propA: 'hi',
    propB: 2
};
const inferArray = ['hello', 5, true];

// typescript infers function return types
function inferBooleanReturn () {
    return true;
}

// 'const' infers stricter types than 'let'
const inferHello = 'hello';
let inferString = 'hello';
const infer5 = 5;
let inferNumber = 5;
const inferTrue = true;
let inferBoolean = true;
/********************************************/

/********************************************/
// TYPE ASSERTIONS

// specific types can be asserted when the inferred type is too general
const assertLiteralProperty = {
    propA: <'hi'>'hi',
    propB: 2 as 2
};
const assertTuple = ['hello', 5, true] as ['hello', 5, true];

// use type assertion to narrow broad types (union types, 'unknown', or 'any')
function assertExample (someParam: unknown) {
    const someParamAlias = someParam as string;
    const someParamAlias2 = <number>someParam;

    return someParam as boolean;
}
/********************************************/

/********************************************/
// TYPE NARROWING

// typescript narrows types based on "type guards"
function typeNarrowExample (start: string | number | (string | number)[]) {
    // instanceof is a built-in type guard
    if (start instanceof Array) {
        start.forEach((item) => {
            // typeof is a built-in type guard
            if (typeof item === 'string') {
                item.search(/hello/);
            } else {
                item.toFixed(2);
            }
        });
    } else if (typeof start === 'string') {
        start.search(/hello/);
    } else if (typeof start === 'number') {
        start.toFixed(2);
    } else {
        // if all types have been narrowed, the type is 'never'
        throw new Error(start);
    }
}

// typescript will also narrow based on checking value or existence
function helloExample (testWord?: string) {
    if (!testWord) return; // narrows to string
    if(testWord === 'hello') {
        console.log(testWord);
    } else {
        console.log('no hello');
    }
}

// typescript allows for custom type guards
function isHello(word: string): word is 'hello' {
    if (word === 'hello') {
        return true;
    } else {
        return false;
    }
}
function helloExample2 (testWord: string) {
    if (isHello(testWord)) {
        console.log(testWord);
    } else {
        console.log('no hello');
    }
}
/********************************************/

/********************************************/
// INTERFACES

// interfaces can be written inline
let someObject: {
    first: string;
    second: string[];
} 
someObject = {
    first: 'a',
    second: ['b', 'c']
};

// interfaces can have optional properties
interface IBasic {
    alwaysHere: string;
    sometimesHere?: number;
}
const basic1: IBasic = {
    alwaysHere: 'abc',
    sometimesHere: 2
}
const basic2: IBasic = {
    alwaysHere: 'def'
}

// interfaces can have readonly properties
interface IReadOnly {
    readonly somethingA: string;
    readonly somethingB: number;
}
const readOnlyExample: IReadOnly = {
    somethingA: 'hello',
    somethingB: 5
}
// readOnlyExample.somethingA = 'goodbye'; // Error

// interfaces can be used within other interfaces
interface INestedContent {
    propC: boolean;
}
interface IExample {
    propA: string;
    propB: number;
    nestedStuff: INestedContent;
}
const example: IExample = {
    propA: 'hello',
    propB: 5,
    nestedStuff: {
        propC: true
    }
};

// interfaces can be recursive
interface IRecurse {
    level: number;
    content?: IRecurse;
}
const recursion: IRecurse = {
    level: 0,
    content: {
        level: 1,
        content: {
            level: 2
        }
    }
}

// interfaces can have key signatures for string keys
interface IKeySigSimple {
    [key: string]: boolean;
}
const keySig1: IKeySigSimple = {
    something: true,
    somethingElse: false,
    otherThing: true
};

// interfaces can have key signatures for numeric keys
interface IKeySigNum {
    [key: number]: boolean;
}
const keySig2: IKeySigNum = [true];
const keySig3: IKeySigNum = {
    0: true,
    100: false
};

// interfaces can have key signatures for both string and numeric keys
interface IKeySigBoth {
    [key: string]: string | number;
    [key: number]: number;
}
const keySig4: IKeySigBoth = {
    50: 50,
    fifty: 'fifty'
};

// interfaces can combine key signatures with property types
interface IKeySigComplex {
    needThis: string;
    child?: IKeySigComplex;
    [key: string]: string | IKeySigComplex | undefined;
}
const keySigExample: IKeySigComplex = {
    needThis: 'hooray',
    extraStuff: 'hooray?',
    reallyExtraStuff: 'hooray??',
    child: {
        needThis: 'blah',
        totallyRandomStuffHere: 'yep'
    }
};

// interfaces can have call signatures
interface IFunctionExample {
    (propA: string, propB: number): boolean;
}
const myFunctionExample: IFunctionExample = (propAliasA: string, propAliasB: number) => true;

// interfaces can be type narrowed
function objectNarrowing (someParam: IKeySigComplex) {
    someParam.needThis.search(/hello/); // we know 'needThis' exists
    if (someParam.child) {
        someParam.child.needThis = 'goodbye'; // now we know 'child.needThis' exists
    }
}

// interfaces can extend other interfaces
interface IParentA {
    parentAProp: string;
}
interface IParentB {
    parentBProp: string[];
}
interface IChild extends IParentA, IParentB {
    childProp: number;
}
const child: IChild = {
    parentAProp: 'hi',
    parentBProp: ['hello'],
    childProp: 5
};
/********************************************/

/********************************************/
// CLASSES

// class properties are public by default, but can be private or protected (or readonly)
class ClassA {
    public propA: string = 'initial value';
    private propB: number = 0;
    protected propC: boolean = true;
    readonly propD: string[] = [];
}
const classA = new ClassA();

// classes can declare and optionally initialize properties in constructor params
class ClassB {
    constructor(
        public propA: string,
        private propB: number,
        protected propC: boolean = true,
        readonly propD: string[] = []
    ) {}
}
const classB = new ClassB('abc', 5, false, ['def']);

// classes can implement interfaces
interface IClassStuff {
    propA: string;
    someMethod(someParam: number): boolean;
}
class ClassC implements IClassStuff {
    propA: string = 'hello';
    someMethod(paramAlias: number) {
        return true;
    }
}
const classC = new ClassC();

// abstract classes can be extended, but not instantiated
abstract class Parent {
    abstract propA: string;
    abstract someMethod (someParam: number): boolean;
}
class Child extends Parent {
    propA: string = 'hello';
    someMethod (paramAlias: number) {
        return true;
    }
}
const classChild = new Child();
// const classParent = new Parent(); // Error

// classes can have static properties
class StaticExample {
    static propA: string = 'i am a static property';
    propB: string = 'i am an instance property';

    static methodA () {
        return 'i am a static method';
    }
    methodB () {
        return 'i am an instance method';
    }
}
StaticExample.propA;
StaticExample.methodA();
const staticExample = new StaticExample();
staticExample.propB;
staticExample.methodB();

// interfaces can extend classes
class Something {}
interface ISomething extends Something {}
/********************************************/

/********************************************/
// INTERSECTION TYPES

// intersection types let you treat variables like multiple types at the same time
function intersectionExample1 (stringAndNumber: string & number) {
    stringAndNumber.search(/hello/);    // String method
    stringAndNumber.toFixed(2);         // Number method
}

// intersecting interfaces will combine their properties
interface IExampleA {
    propA: string;
}
interface IExampleB {
    propB: number;
}
function intersectionExample2 (aAndB: IExampleA & IExampleB) {
    aAndB.propA.search(/hello/);
    aAndB.propB.toFixed(2);
}

// Compare to union type
function unionExample (aOrB: IExampleA | IExampleB) {
    // Have to type narrow to reach propA or propB
    if ('propA' in aOrB) {
        aOrB.propA.search(/hello/);
    } else {
        aOrB.propB.toFixed(2);
    }
}
/********************************************/

/********************************************/
// TYPE ALIASES

// types can be declared explicitly, for later reference
type TSomething = number | string | {propA: string};
const something: TSomething = 5;
/********************************************/

/********************************************/
// GENERIC TYPES

// A type parameter can be passed to a type for more dynamic typing
type TGeneric1<T> = number | string | T;
let genericThing: TGeneric1<boolean> = 5;
genericThing = 'hello';
genericThing = true;

// You can have multiple type parameters of any name
type TGeneric2<U, V> = {
    propA: U;
    propB: V;
}
const genericThing2: TGeneric2<string, number> = {
    propA: 'hello',
    propB: 5
};

// Functions can be generic
function genericFun<T>(prop: T, extra?: T[]) {
    return prop;
}
genericFun(true, [false]); // The type parameter is implicitly the type of the first function parameter
genericFun<number>(5); // The type parameter can also be explicitly passed

// Interfaces can be generic
interface IGenObj<T> {
    propA: T;
}
const genericObj: IGenObj<string> = {
    propA: 'hi'
};

// Classes can be generic
class Action<T> {
    constructor (
        public state: T
    ) {}

    run() {
        return this.state;
    }
}
const action = new Action({
    someStateProp: true
});
const newState = action.run();

// Type parameters can be constrained using the "extends" keyword
type TConstrained<T extends string | number> = T;
let thing: TConstrained<string>;

function constrainedFun<T extends string[]>(param: T) {
    return param.map((str) => str += '!');
}
constrainedFun(['hello']);

// Type parameters can be constrained by other type parameters
function addToArr<T, U extends T[]>(newItem: T, arr: U) {
    arr.push(newItem);
    return arr;
}
addToArr(5, [1, 2]);
/********************************************/


/**FUTURE SECTIONS***************************/
// DISCRIMINATED UNIONS
// INDEX TYPES
// MAPPED TYPES
// CONDITIONAL TYPES
// PREDEFINED / BUILT-IN TYPES
// PROJECT CONFIGURATION
// TSLINT
/********************************************/
