# CSS Donut Chart

Quick demonstration SVG and CSS3 possibilities of drawing donut charts.

## Table on contents

- [Theory](#theory)
  - [Formula of current segment for stroke-dashoffset](#formula-of-current-segment-for-stroke-dashoffset)
  - [Formula of space between circles](#formula-of-space-between-circles)
- [Examples](#examples)

## Theory

> NOTE: For a more detailed description of everything written below, check out [this][article] article.

- **L** - circumference (the length of one complete path around a circle).
- **R** - radius of a circle.
- **D** - diameter of a circle.
- **π** - Pi number (π = 3.141592653589793238462643383279...).

Let `L = 100%` (complete path around a circle). From basic geometry, we know that `L = 2 * π * R`. Then `R = L / (2 * π) = 100 / (2 * 3.141592653589793238462643383279) = 15.915494309189533576888376337251` and `D = 2 * R = 2 * 15.915494309189533576888376337251 = 31.830988618379067153776752674503`.

> NOTE: For simplicity, let's take `L = 100, R = 15.9155, D = 31.8310`.

Svg `stroke-dasharray` attribute start at the right side (at 3:00), and it moves clockwise around the circle. If we want to position (or start) at the top, then we need to use `stroke-dashoffset`.

However, unlike `stroke-dasharray`, `stroke-dashoffset` moves **counter-clockwise**. So, we’d need to set this value to 25 (for 25% in the opposite direction from 3:00 back to 12:00). Remember it’s not a negative number, because offset moves counter-clockwise.

```html
<!-- start at the very top (at 12:00) -->
<circle stroke-dashoffset="25"></circle>
```

### Formula of current segment for stroke-dashoffset

`L − sum_length(all_preceding_segments) + first_segment_offset`

### Formula of space between circles

`space_between = stroke_width * coefficient`, where `coefficient > 1`.

```js
const sdo = 25;
const svgViewbox = 31.831;
const strokeWidth = svgViewbox * 0.02; // take 2% of total svg size
const spaceBetween = strokeWidth * 2; // with space
```

## Examples

```bash
### Circles without space between:

# Circle 1:
  ------------------------
  SDO: 25
  ------------------------
  stroke-dasharray="40 60"
  stroke-dashoffset="25"

# Circle 2
  ------------------------
  SDO: 100 - 40 + 25 = 85
  ------------------------
  stroke-dasharray="20 80"
  stroke-dashoffset="85"

# Circle 3
  ------------------------
  SDO: 100 - (40 + 20) + 25 = 65
  ------------------------
  stroke-dasharray="30 70"
  stroke-dashoffset="65"

# Circle 4
  ------------------------
  SDO: 100 - (40 + 20 + 30) + 25 = 365
  ------------------------
  stroke-dasharray="10 90"
  stroke-dashoffset="35"
```

```bash
### Circles with space between:

## Let space-between = 1;

# Circle 1:
  ------------------------
  SDA: (40 - 1) and (60 + 1)
  SDO: 25
  ------------------------
  stroke-dasharray="39 61"
  stroke-dashoffset="25"

# Circle 2:
  ------------------------
  SDA: (20 - 1) and (80 + 1)
  SDO: 100 - 40 + 25 = 85
  ------------------------
  stroke-dasharray="19 81"
  stroke-dashoffset="85"

# Circle 3
  ------------------------
  SDA: (30 - 1) and (70 + 1)
  SDO: 100 - (40 + 20) + 25 = 65
  ------------------------
  stroke-dasharray="29 71"
  stroke-dashoffset="65"

# Circle 4
  ------------------------
  SDA: (10 - 1) and (90 + 1)
  SDO: 100 - (40 + 20 + 30) + 25 = 35
  ------------------------
  stroke-dasharray="9 91"
  stroke-dashoffset="35"

```

[article]: https://heyoka.medium.com/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72
