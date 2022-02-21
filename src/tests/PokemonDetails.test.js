import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test(`Teste se as informações detalhadas do Pokémon 
  selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    const titleDetails = screen.getByRole('heading',
      { name: 'Pikachu Details', level: 2 });
    expect(titleDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const sumary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(sumary).toBeInTheDocument();

    const resumePokemon = screen.getByText(/This intelligent Pokémon roasts/);
    expect(resumePokemon).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas 
  contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    const mapPokemon = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu', level: 2 });
    expect(mapPokemon).toBeInTheDocument();

    const imgMap1 = screen.getAllByRole('img')[1];
    expect(imgMap1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgMap1).toHaveAttribute('alt', 'Pikachu location');

    const texMap1 = screen.getByText('Kanto Viridian Forest');
    expect(texMap1).toBeInTheDocument();

    const imgMap2 = screen.getAllByRole('img')[2];
    expect(imgMap2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgMap2).toHaveAttribute('alt', 'Pikachu location');

    const texMap2 = screen.getByText('Kanto Power Plant');
    expect(texMap2).toBeInTheDocument();
  });

  test(`Teste se o usuário pode favoritar um 
  pokémon através da página de detalhes`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    const favoriteChecked = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteChecked).toBeInTheDocument();
    userEvent.click(favoriteChecked);

    const starImg = screen.getAllByRole('img')[1];
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    userEvent.click(favoriteChecked);
    expect(starImg).not.toBeInTheDocument();
  });
});
