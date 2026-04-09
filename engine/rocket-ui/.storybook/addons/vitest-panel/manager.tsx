import React from 'react';
import { addons, types, useParameter } from 'storybook/manager-api';

const ADDON_ID = 'rocket/vitest';
const PANEL_ID = `${ADDON_ID}/panel`;
const PARAM_KEY = 'vitest';

interface AssertionResult {
  ancestorTitles: Array<string>;
  title: string;
  status: 'passed' | 'failed';
}

interface TestFileResult {
  name: string;
  assertionResults: Array<AssertionResult>;
}

interface VitestResults {
  testResults?: Array<TestFileResult>;
}

interface VitestParams {
  testResults?: VitestResults;
  testFile?: string;
}

interface TestEntry {
  title: string;
  status: 'passed' | 'failed';
}

type GroupedResults = Record<string, Array<TestEntry>>;

function extractFileTestsData(results: VitestResults, fileName: string): GroupedResults {
  const fileResult = results.testResults?.find((r) => r.name.includes(fileName));
  if (!fileResult) {
    return {};
  }

  return fileResult.assertionResults.reduce<GroupedResults>((acc, result) => {
    const groupName = result.ancestorTitles[1] ?? 'Tests';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push({ title: result.title, status: result.status });
    return acc;
  }, {});
}

const VitestPanel = () => {
  const params = useParameter<VitestParams>(PARAM_KEY);
  if (!params) {
    return null;
  }

  const { testResults, testFile } = params;

  let error: string | null = null;
  let fileTestResults: GroupedResults | null = null;

  if (!testFile && !testResults) {
    error = 'Please check your config: missing both `testFile` and `testResults`.';
  } else if (!testFile) {
    error = 'Please check your config: missing `testFile` name.';
  } else if (!testResults) {
    error = 'Please check your config: missing `testResults` file.';
  } else if (!('testResults' in testResults)) {
    error = 'Please check your config: `testResults` file does not contain valid results format.';
  } else {
    fileTestResults = extractFileTestsData(testResults, testFile);
    if (Object.keys(fileTestResults).length === 0) {
      error = 'No tests found.';
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      {error && <p>{error}</p>}
      {fileTestResults &&
        Object.entries(fileTestResults).map(([title, group]) => (
          <div key={title}>
            <strong>{title}</strong>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 8,
                paddingTop: 8,
                paddingBottom: 16,
              }}
            >
              {group.map((d) => (
                <div
                  key={d.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 4,
                    paddingLeft: 16,
                  }}
                >
                  <div>{d.status === 'passed' ? '\u2714\uFE0F' : '\u274C'}</div>
                  <div>{d.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Tests results',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => (active ? <VitestPanel /> : null),
  });
});
