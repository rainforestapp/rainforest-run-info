# rainforest-run-info

A Rainforest QA package that can be used inside a Rainforest run test environment to find out which run and test ID the current test execution belongs to. This can be useful when sending metadata to error tracking software like Sentry. 

# Installation and usage

To install run

```shell
npm install @rainforestqa/rainforest-run-info
```
Then use it in your frontend code like this (this example adds a URL pointing to the test result in Rainforest QA to Sentry context)
```javascript
import RainforestRunInfo from '@rainforestqa/rainforest-run-info';

const setSentryContext = async () => {
  const { runId, testId } = await RainforestRunInfo.fetch();
  
  window.Sentry.setContext({
    rainforest_run_test_url: `https://app.rainforestqa.com/runs/${runId}/tests/${testId}`
  });
};

setSentryContext();
```
