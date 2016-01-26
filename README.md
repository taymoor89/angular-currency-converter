Angular Currency Converter
==========================

This application is powered by [fixer.io][fixerIo] public APIs to convert currencies rate.

## Tools and technologies

1. Angular 1.4.9
2. Bootstrap
3. Lodash
4. lite-server
5. jasmin-core
6. Karma Test Runner
7. Karma Html Reporter

## How to run?

npm
```shell
npm install
```
Run
```shell
npm start
```
Starts application using [lite-server][liteServer] (a static web server for development)

## How to test?

Start karma test runner server
```shell
./node_modules/karma/bin/karma start
```
See the unit test reports in
```shell
karma_html/report-summary-filename
```
open this html file in browser

[fixerIo]: http://fixer.io/
[liteServer]: https://github.com/johnpapa/lite-server