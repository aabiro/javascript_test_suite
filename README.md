# JavaScript code test suite and code coverage

A full test suite for ```Order Handling``` function in JavaScript

Includes functional (BB) unit tests, Structural (WB) unit tests and Integration Testing.

Written with JavaScript -- tests using Jasmine and Mocha with complete code coverage tracked with Istanbul

The tests are separated into two different directories, `jasmine-functional-testing/testing_2` & `jasmine-structural-integration-testing/testing_3`:

* Clone this repository and `cd javascript_test_suite`

To run the functional tests:

  1. `cd jasmine-functional-testing/testing_2`
  
  2. `npm install jasmine-node -g`

  3. `npm install`

  4. `npm test`

To run the structural & integration tests:

  1. `cd jasmine-structural-integration-testing/testing_3`

  2. `npm install -g nyc`
  
  3. `npm install`

  3. `npm test`

You should see a verose output the test results and of code coverage. Visual code coverage files also provided in `jasmine-structural-integration-testing/testing_3/coverage`

*Note: see also `javascript_sample.js`
