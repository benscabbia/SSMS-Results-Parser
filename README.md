# SSMS Results Parser

A SQL Server Management Studio Parser. You can pass it up to two queries and compare results including: 
* Scan Count	
* Logical Reads	
* Physical Reads
* Read-ahead Reads	
* Lob Logical Reads	
* Lob Physical Reads	
* Lob Read-ahead Reads

The data is compared on a per query level, and on a per-table level (assuming both queries have the same number of tables). All of the code runs directly in browser with no server side hooks. Your data is **not** saved anywhere. 

## Features

### Total IO Comparison: 
![Total IO Data](https://i.imgur.com/hSbByX1.png)
Lob counts can be optionally included in chart

### Total Time Comparison:
![Total Time](https://i.imgur.com/LrbYwSQ.png)

### Single Table Comparison
![Single Table](https://i.imgur.com/OZtnty2.png)

### Single Table Join Comparison
![Single Table Join](https://i.imgur.com/qsG7l8w.png)

## Expected Input:

SSMS Results Parser in its current state is fairly strict, therefore requing you to configure SSMS as instructed below. 

### Configuring SSMS 
TODO

## Future Features (welcome to contribute)
* Improve robustness for inputs
* Compare table Data to ensure both queries are equivalent


___

## Contributing to SsmsResultsParser

Contributions are welcome! Here is a little guide on getting this project setup. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Linting 

Run `ng lint` to run linter
