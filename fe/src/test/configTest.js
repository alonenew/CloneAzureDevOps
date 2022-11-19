import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../store/store';

afterAll(() => jest.clearAllMocks());

const renderWithProviders = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: renderWithProviders, ...options });

export { customRender as render };