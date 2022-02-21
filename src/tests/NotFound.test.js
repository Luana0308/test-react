import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading h2 
    com o texto Page requested not found`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');

    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();

    const titleNotFound = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji', level: 2 });
    expect(titleNotFound).toBeInTheDocument();

    const imageNotFound = screen.getAllByRole('img')[1];

    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imageNotFound).toHaveAttribute('alt',
      'Pikachu crying because the page requested was not found');
  });
});
