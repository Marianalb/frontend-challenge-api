import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('validate initial url', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(window.location.pathname).toEqual('/');
});
