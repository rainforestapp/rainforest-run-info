# rainforest-run-info

A [Rainforest QA](https://www.rainforestqa.com/) package that can be used inside a Rainforest run test environment to find out which run and test ID the current test execution belongs to. This can be useful when sending metadata to error tracking software like Sentry. 

# Installation and usage

To install run

```shell
npm install --save @rainforestqa/rainforest-run-info
```

Then use it in your frontend code like this (please note that `fetchRunInfo` is an async function):

## ES modules
```javascript
import { fetchRunInfo } from '@rainforestqa/rainforest-run-info';

const setSentryRunInfo = async () => {
  const { error, resultUrlAtCurrentTime, runId, testId } = await fetchRunInfo();

  if (!error) {
      window.Sentry.setTag('rainforest_run_id', runId);
      window.Sentry.setTag('rainforest_test_id', testId);
      window.Sentry.configureScope(scope => {
        scope.addEventProcessor(event => {
          event.tags.rainforest_result_url = resultUrlAtCurrentTime();
          return event;
        });
      })
  }
};

setSentryRunInfo();
```

## Script tag
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Testing with Rainforest QA</title>
    <script src="dist/main.js" ></script>
  </head>
  <body>
    <script type="text/javascript">
        Rainforest.fetchRunInfo().then(({ error, resultUrl, runId, testId }) => {
        if (error) {
          console.error(error);
        } else {
          alert(`Test result URL: ${resultUrl}, Run ID: ${runId}, Test ID: ${testId}`);
        }
      })
    </script>
  </body>
</html>
```

# Development
Run `script/bootstrap` to install dependencies and `script/test` to run unit tests.
