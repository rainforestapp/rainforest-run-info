import fetch from 'cross-fetch';

const MACHINE_METADATA_API_URL =
  'https://run-info.rainforestqa.com/latest/metadata';

export const fetchRunInfo = async () => {
  try {
    const response = await fetch(MACHINE_METADATA_API_URL);
    const responseJson = await response.json();
    if (response.status >= 400) {
      return { error: responseJson.message || response.status };
    }
    const { run_id: runId, test_id: testId } = responseJson;
    let resultUrl =
      'Run ID or test ID is missing in response, result URL can not be created.';
    if (runId && testId) {
      resultUrl = `https://app.rainforestqa.com/runs/${runId}/tests/${testId}`;
    }
    return { resultUrl, runId, testId };
  } catch (e) {
    return { error: e.message };
  }
};
