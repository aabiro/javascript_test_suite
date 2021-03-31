# JavaScript code test suite and code coverage

A full test suite for ```Order Handling``` function in JavaScript

Includes functional (BB) unit tests, Structural (WB) unit tests and Integration Testing.

Written with JavaScript -- tests using Mocha, Jasmine and complete code coverage tracked with Istanbul

The tests are separated into two different directories, `jasmine-functional-testing` & `jasmine-structural-integration-testing`:

* Clone this repository and `cd jasmine-testing`

To run the functional tests:

  1. `cd jasmine-functional-testing`
  
  2. `npm install jasmine-node -g`

  3. `npm install`

  4. `npm test`

To run the structural & integration tests:

  1. `cd jasmine-structural-integration-testing`

  2. `npm install -g istanbul`

  3. `npm install -g nyc`
  
  4. `npm install`

  5. `npm test`

You should see a verbose output the test results and of code coverage. Visual code coverage files also provided in `jasmine-structural-integration-testing/coverage`

*Note: see also `javascript_sample.js`
