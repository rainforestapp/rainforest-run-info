# rainforest-run-info

A [Rainforest QA](https://www.rainforestqa.com/) package that can be used inside a Rainforest run test environment to find out which run and test ID the current test execution belongs to. This can be useful when sending metadata to error tracking software like Sentry. 

# Installation and usage

To install run

```shell
npm install --save @rainforestqa/rainforest-run-info
```

Then use it in your frontend code like shown in the following examples. 

## ES modules
```javascript
import { fetchRunInfo } from '@rainforestqa/rainforest-run-info';

const setSentryContext = async () => {
  const { error, resultUrl, runId, testId } = await fetchRunInfo();
  
  if (error) {
    // handle fetching error
  } else {
    // example usage - adds a URL pointing to the test result in Rainforest QA to Sentry context for easier debugging
    window.Sentry.setContext({
      rainforest_run_test_url: resultUrl,
      rainforest_run_id: runId,
      rainforest_test_id: testId,
    });
  }
};

setSentryContext();
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
