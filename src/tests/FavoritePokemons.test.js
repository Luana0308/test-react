import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('teste as aplicações do Favorite Pokemons', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
     se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const NotFoundFavorites = screen.getByText('No favorite pokemon found');
    expect(NotFoundFavorites).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
  });
});
