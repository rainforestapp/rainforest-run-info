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
    const {
      run_id: runId,
      test_id: testId,
      job_id: jobId,
      browser: platform,
    } = responseJson;
    let resultUrl = 'Result URL can not be created.',
      resultUrlAtCurrentTime = () => undefined;
    if (runId && testId && jobId && platform) {
      resultUrl = `https://app.rainforestqa.com/runs/${runId}/tests/${testId}/browsers/${platform}?job=${jobId}`;
      resultUrlAtCurrentTime = () => `${resultUrl}&video_start=${Date.now()}`;
    }
    return {
      resultUrl,
      runId,
      testId,
      jobId,
      platform,
      resultUrlAtCurrentTime,
    };
  } catch (e) {
    return { error: e.message };
  }
};
