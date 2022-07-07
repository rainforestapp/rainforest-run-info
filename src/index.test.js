import fetch from 'cross-fetch';

import { fetchRunInfo } from './';

describe('fetchRunInfo', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('fetches data via the right endpoint and returns runId, testId and resultUrl', async () => {
    fetch.mockResponseOnce(JSON.stringify({ run_id: 33, test_id: 1337 }));

    const response = await fetchRunInfo();

    expect(fetch).toBeCalledWith(
      'https://run-info.rainforestqa.com/latest/metadata'
    );
    expect(response).toEqual({
      resultUrl: 'https://app.rainforestqa.com/runs/33/tests/1337',
      runId: 33,
      testId: 1337,
    });
  });

  it('returns info message instead of resultUrl in case run ID or test ID is missing in response', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const response = await fetchRunInfo();

    expect(response).toEqual({
      resultUrl:
        'Run ID or test ID is missing in response, result URL can not be created.',
      runId: undefined,
      testId: undefined,
    });
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
