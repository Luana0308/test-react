import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });

  test(`O peso médio do pokémon deve ser exibido com um texto no 
  formato Average weight: <value> <measurementUnit>`, () => {
    renderWithRouter(<App />);

    const AverageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(AverageWeight).toBeInTheDocument();
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);

    const ImagePokemon = screen.getByRole('img');
    expect(ImagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(ImagePokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test(`Teste se o card do Pokémon indicado na Pokédex 
  contém um link de navegação para exibir detalhes deste Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const favoriteChecked = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteChecked);

    const FavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(FavoritePokemon);

    const starImg = screen.getAllByRole('img')[1];
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
