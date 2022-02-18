import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste se no componente App possui as aplicações', () => {
  test('Teste se a aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getAllByRole('link', { name: 'Home' });

    expect(linkHome).toBeInTheDocument();
  });
});
