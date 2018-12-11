TypeScript Intro
================

[TypeScript Documentation](https://www.typescriptlang.org/docs/home.html)
--------------------------

Handbook
--------

Recommended reading: [Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) through [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

TypeScript Release Updates
--------------------------

Recommended reading: [TypeScript 1.1 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-1.html) through the most recent release notes. Information in these release notes is not always reflected in the handbook.

Getting Started
---------------

* ### Install TypeScript
    ```
    npm i -g typescript
    ```
* ### Setup
    * #### Manual
        ```
        mkdir ts-demo
        cd ts-demo
        tsc --init
        touch ts_practice.ts
        ```
    * #### Or, clone from git
        ```
        git clone https://github.com/rdhelms/typescript-reference.git
        ```
* ### [Example TypeScript Tinkering](https://github.com/rdhelms/typescript-reference/blob/master/ts_intro.ts)
* ### Compile
    ```
    tsc
    ```
* ### Advanced: [Project Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

VS Code Tips
----

You may be used to these already, but don't forget they work for TypeScript type variables and definitions as well.

* **Hover** --> Detailed type info, error messages, and documentation abound
* `F12` --> **Go to definition**
* `Shift + F12` --> **Find all references**
