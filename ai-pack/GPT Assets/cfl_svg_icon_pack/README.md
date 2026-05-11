# College Football Legends SVG Icon Pack

67 clean, stroke-based SVG icons for the game UI.

## Use single icon
```html
<img src="icons/roster.svg" width="24" height="24" alt="Roster">
```

## Use sprite
Inline `cfl-icons-sprite.svg` once, then:
```html
<svg class="icon"><use href="#cfl-roster"></use></svg>
```

## Styling
All standalone icons use `currentColor`, so they inherit text color:
```css
.icon {
  width: 24px;
  height: 24px;
  color: #BC9B3C;
}
```

Categories include navigation, recruiting, team/player, game planning, management, dynasty, status, and utility icons.
