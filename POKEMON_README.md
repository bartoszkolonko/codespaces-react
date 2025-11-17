# 🔍 Pokédex Explorer

A React application that integrates with the [PokéAPI](https://pokeapi.co/) to provide an interactive Pokédex experience.

## Features

### 🎯 Core Functionality
- **Pokemon Search**: Search by name or ID (1-1010)
- **Random Discovery**: Get random Pokemon with one click
- **Detailed Information**: View comprehensive stats, abilities, and moves
- **Beautiful UI**: Modern, responsive design with Pokemon-themed styling

### 📊 Pokemon Data Display
- **Basic Info**: Name, ID, height, weight, base experience
- **Visual Elements**: Official artwork and sprite variants
- **Type System**: Color-coded type badges and backgrounds
- **Stats**: Base stats with visual progress bars
- **Abilities**: Including hidden abilities
- **Moves**: Sample move list

### 🎨 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Animated Pokéball loader
- **Error Handling**: User-friendly error messages
- **Modal Details**: Click cards for detailed view
- **Type-based Theming**: Cards styled by Pokemon's primary type

## API Integration

### PokéAPI Service (`src/services/pokeApiService.js`)

The app integrates with the PokéAPI v2 to fetch:

- **Pokemon Data**: `/pokemon/{id or name}`
- **Pokemon Lists**: `/pokemon?limit={limit}&offset={offset}`
- **Species Info**: `/pokemon-species/{id or name}`
- **Type Data**: `/type/{id or name}`

### Available Methods

```javascript
import pokeApiService from './services/pokeApiService';

// Get specific Pokemon
const pokemon = await pokeApiService.getPokemon('pikachu');

// Get Pokemon list with pagination
const pokemonList = await pokeApiService.getPokemonList(20, 0);

// Get species information
const species = await pokeApiService.getPokemonSpecies('pikachu');

// Get type information
const typeInfo = await pokeApiService.getPokemonType('electric');

// Get random Pokemon ID
const randomId = pokeApiService.getRandomPokemonId();
```

## Components

### `PokemonApp` - Main Container
- Manages application state
- Handles search functionality
- Coordinates component interactions

### `PokemonSearch` - Search Interface
- Text input with validation
- Random Pokemon button
- Loading states and error handling

### `PokemonCard` - Pokemon Display
- Compact Pokemon information
- Type-based styling
- Click to view details

### `PokemonDetails` - Detailed Modal
- Comprehensive Pokemon information
- Stats visualization
- Sprite gallery

## Styling

The app uses a modern design system with:
- **Gradients**: Dynamic backgrounds based on Pokemon types
- **Animations**: Smooth transitions and hover effects
- **Typography**: Clean, readable fonts
- **Responsive**: Mobile-first design approach

### Type-based Color Scheme

Each Pokemon type has associated colors:
- Fire: Orange gradients
- Water: Blue gradients
- Electric: Yellow gradients
- Grass: Green gradients
- And 14 more types...

## Testing

The app includes comprehensive tests:

### Component Tests (`src/components/__tests__/`)
- PokemonApp functionality
- User interaction flows
- Error state handling
- Loading states

### Service Tests (`src/services/__tests__/`)
- API service methods
- Error handling
- Network request validation

### Running Tests

```bash
npm test
```

## Usage Examples

### Search for a Pokemon
1. Enter "pikachu" or "25" in the search box
2. Click the search button or press Enter
3. View the Pokemon card with basic information
4. Click the card for detailed stats and information

### Discover Random Pokemon
1. Click the "🎲 Random Pokemon" button
2. A random Pokemon (ID 1-1010) will be fetched and displayed

### Error Handling
- Invalid names show user-friendly error messages
- Network errors are handled gracefully
- Loading states provide visual feedback

## Browser Support

- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)

## Performance Features

- **Efficient API calls**: Minimal unnecessary requests
- **Image optimization**: Fallback for missing sprites
- **Error boundaries**: Graceful error handling
- **Responsive images**: Optimized for different screen sizes

## Accessibility

- **Keyboard navigation**: Full keyboard support
- **Screen readers**: Proper ARIA labels and roles
- **Color contrast**: WCAG compliant color schemes
- **Focus management**: Clear focus indicators