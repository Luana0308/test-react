import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const titleHome = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(titleHome).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista 
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);

    const NextPokemon = screen.getByText('Charmander');
    expect(NextPokemon).toBeInTheDocument();

    const numberClicks = 9;
    for (let index = 1; index < numberClicks; index += 1) {
      userEvent.click(buttonNext);
    }
    const Pokemon = screen.getByText('Pikachu');
    expect(Pokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const Pokemon = screen.getAllByTestId('pokemon-name');
    expect(Pokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const filters = 7;
    const buttonsFilters = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsFilters).toHaveLength(filters);

    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    expect(buttonFire).toBeInTheDocument();
    userEvent.click(buttonFire);
    const pokemonFire = screen.getByText('Charmander');
    expect(pokemonFire).toBeInTheDocument();

    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(buttonPsychic);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Psychic');

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const Pokemon = screen.getByText('Pikachu');
    expect(Pokemon).toBeInTheDocument();
  });
});
