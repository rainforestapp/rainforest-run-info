import fetch from 'cross-fetch';
import mockdate from 'mockdate';

import { fetchRunInfo } from './';

describe('fetchRunInfo', () => {
  beforeEach(() => {
    fetch.resetMocks();
    mockdate.set(Date.parse('2019-03-27T19:24:54Z'));
  });

  afterEach(() => {
    mockdate.reset();
  });

  it('fetches data via the right endpoint and returns runId, testId, jobId, platform, resultUrl and resultUrlAtCurrentTime', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        run_id: 33,
        test_id: 1337,
        job_id: 42,
        browser: 'chrome',
      })
    );

    const response = await fetchRunInfo();

    expect(fetch).toBeCalledWith(
      'https://run-info.rainforestqa.com/latest/metadata'
    );
    expect(response).toEqual({
      resultUrl:
        'https://app.rainforestqa.com/runs/33/tests/1337/browsers/chrome?job=42',
      runId: 33,
      testId: 1337,
      jobId: 42,
      platform: 'chrome',
      resultUrlAtCurrentTime: expect.any(Function),
    });
    expect(response.resultUrlAtCurrentTime()).toEqual(
      'https://app.rainforestqa.com/runs/33/tests/1337/browsers/chrome?job=42&video_start=1553714694000'
    );
  });

  it('returns info message instead of resultUrl in case run ID or test ID is missing in response', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const response = await fetchRunInfo();

    expect(response).toEqual({
      resultUrl: 'Result URL can not be created.',
      runId: undefined,
      testId: undefined,
      jobId: undefined,
      platform: undefined,
      resultUrlAtCurrentTime: expect.any(Function),
    });
    expect(response.resultUrlAtCurrentTime()).toBeUndefined();
  });

  it('returns an error when request fails', async () => {
    let errorMessage = 'fake error message';
    fetch.mockRejectOnce(new Error(errorMessage));

    const response = await fetchRunInfo();

    expect(response).toEqual({ error: errorMessage });
  });

  it('returns an error when request is aborted', async () => {
    fetch.mockAbort();

    const response = await fetchRunInfo();

    expect(response).toEqual({ error: 'The operation was aborted. ' });
  });
});
