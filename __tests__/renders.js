import React from 'react';
import renderer from 'react-test-renderer';
import { CurrentRenderContext } from '@react-navigation/native';

test('renders correctly', () => {
  const tree = renderer.create(<CurrentRenderContext />).toJSON();
  expect(tree).toMatchSnapshot();
});
