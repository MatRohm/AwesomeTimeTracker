import { shallow } from 'enzyme';
import { App } from '../app';
import React from 'react';

describe('Checks if app.tsx works correctly', () => {
  let _app: any;

  beforeEach(() => {
    _app = shallow(<App />);
  });

  afterEach(() => {
    _app = null;
  });

  it('When rendered it has a footer', () => {
    expect(_app.find('.footer')).toHaveLength(1);
  });

  it('When rendered it has a menu', () => {
    expect(_app.find('.menu')).toHaveLength(1);
  });

  it('When rendered it has a mainContent', () => {
    expect(_app.find('.mainContent')).toHaveLength(1);
  });

  it('When rendered it has a header', () => {
    expect(_app.find('.header')).toHaveLength(1);
  });
});
