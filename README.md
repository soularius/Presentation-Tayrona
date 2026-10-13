# PRESENTACION TAIRONA — Tayrona National Natural Park

Póster interactivo, en inglés, para el proyecto **Touristic Place** de la clase:
cuatro guías turísticas presentan el Parque Nacional Natural Tayrona. Hecho sobre
la misma base que [PRESENTACION GRECIA](../PRESENTACION%20GRECIA): una barra de
diálogo con el color de quien habla, avance manual y frases completas desde el
primer instante para leerlas en voz alta.

El enunciado pide *drawings, graphics, etc.*, así que cada sección combina tres
cosas:

- **Fondo**: foto a pantalla completa con un zoom lento.
- **Polaroid**: la misma foto (u otra) entera, porque casi todas son verticales y
  el fondo panorámico las recorta.
- **Póster**: un dibujo o gráfico que se completa a medida que avanza la guía.

---

## Las guías

| Guía | Clave | Color | Avatar |
|------|-------|-------|--------|
| **Yined** | `yined` | amarillo `#ffcf5c` | `personajes/yined-face.jpg` |
| **Majo**  | `majo`  | coral `#ff8f73`    | `personajes/majo-face.jpg` |
| **Dari**  | `dari`  | turquesa `#4fdccb` | `personajes/dari-face.jpg` |
| **Dani**  | `dani`  | lila `#c9a2ff`     | `personajes/dani-face.jpg` |

Los avatares son recortes cuadrados (480×480) de los retratos en
`assets/img/personajes/`. Si cambia un retrato, hay que volver a generar su
`-face.jpg` (ver más abajo).

---

## Secciones

| # | Sección | Guía | Gráfico | Frases |
|---|---------|------|---------|--------|
| 0 | Portada | — | las cuatro guías | — |
| 1 | Why Tayrona? | Yined | dibujo: Sierra Nevada, selva y mar Caribe | 2 |
| 2 | Where is it? | Majo | mapa de Colombia + recuadro Santa Marta → Tayrona (34 km) | 2 |
| 3 | How to get there? | Dari | ruta: Santa Marta → bus/taxi → El Zaino/Calabazo → selva · o lancha | 2 |
| 4 | Things to do | Dani | cuatro actividades; se ilumina la actual | 4 |
| 5 | Recommendations | las cuatro | lista de equipaje que se va marcando | 4 |
| 6 | Thank you! | — | las cuatro guías | — |

Las frases son las del guion, sin cambios; las largas se partieron por sus comas
para que quepan grandes en pantalla. En *Things to do* y *Recommendations* cada
frase trae su propio fondo y su polaroid.

---

## Estructura

```text
PRESENTACION TAIRONA/
├── index.html          estructura, gráficos SVG, menú y overlays
├── README.md
└── assets/
    ├── css/styles.css  paleta caribeña, póster, polaroid, diálogo
    ├── js/script.js    guion (SCENES), cambios de fondo y de gráfico, eventos
    └── img/
        ├── personajes/ retratos y avatares (*-face.jpg)
        └── tairona/    fotos del parque
            └── originales/  las 14 fotos tal como llegaron, con marca de agua
```

Sin dependencias ni build: HTML, CSS, JavaScript y SVG. Fuentes de Google Fonts
(Fredoka, Quicksand y Caveat para lo escrito a mano).

---

## Cómo ejecutar

Abrir `index.html` con doble clic funciona. Con Live Server o con

```bash
python -m http.server 5500
```

también, en <http://127.0.0.1:5500>.

---

## Controles

| | |
|---|---|
| **Start the Tour** | empieza |
| **Next ▸** / **Where? ▸** / … | siguiente frase o sección |
| **← Back** | frase anterior (y sección anterior al llegar a la primera) |
| **📍** | menú para saltar a una sección; ahí también se muestra el cronómetro |
| **🔇 / 🔊** | música de fondo |
| **⛶** | pantalla completa |
| **⏱** | cronómetro: cuenta desde *Start the Tour* y se pone verde a los 4:00. Clic para reiniciar |

**Teclado:** `Espacio`, `Enter` o `→` avanzan · `←` retrocede · `F` pantalla
completa · `T` muestra u oculta el cronómetro · `Esc` cierra paneles.

**Música:** `assets/music/sonid.mp3`, en bucle. Arranca en silencio y hay que
pulsar 🔇 (debajo de 📍) para activarla: los navegadores no permiten reproducir
audio sin una interacción previa. Para cambiarla, reemplazar ese archivo con el
mismo nombre.

### Deep links

- `index.html?scene=2` — abre en *Where is it?*
- `index.html?scene=4&line=2` — *Things to do* con la tercera frase (el mono).

---

## Cambiar el guion o las fotos

Todo está en `SCENES`, en [assets/js/script.js](assets/js/script.js):

```js
{
  kind: 'story',
  num: 'Part 3',
  title: 'How to get there?',
  nav: 'How? ▸',                        // texto del botón que lleva aquí
  graphic: 'how',                       // <section data-graphic="how"> del póster
  bg:    { src: 'sendero-letrero', pos: '50% 45%' },
  photo: { src: 'entrada-parque', caption: 'The park entrance' },
  lines: [
    { who: 'dari', step: 0, text: '…' },
    { who: 'dari', step: 1, text: '…',
      photo: { src: 'selva-pasarela', caption: 'Hiking through the forest' } },
  ],
},
```

- `src` es el nombre del archivo en `assets/img/tairona/`, sin `.jpg`.
- `pos` decide qué parte de una foto vertical se ve en el fondo panorámico
  (`50% 0%` arriba, `50% 100%` abajo).
- `step` controla el gráfico: los elementos con `data-step` menor o igual se
  muestran (o se marcan) y el igual se resalta.
- Para cambiar quién dice una frase basta con tocar su `who`.

---

## Fotos

Hay dos tipos de foto, cada una con su papel:

- **Fondos (pantalla completa):** fotos panorámicas de
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Parque_Nacional_Natural_Tayrona),
  bajadas a 2560 px de ancho para que se vean nítidas en un proyector. Las de
  WhatsApp/TikTok medían 900–1280 px y al estirarlas se veían borrosas. Casi todas son
  CC BY-SA (el capuchino es CC0), que obliga a citar autor, licencia y fuente. Esa lista está en
  *Sources & Credits*: si se cambia un fondo, hay que actualizarla.
- **Polaroids:** las fotos del grupo (@julianato21), que se ven completas y a
  tamaño reducido, donde su resolución alcanza de sobra.

| Escena | Fondo (Commons) | Polaroid (grupo) |
|--------|-----------------|------------------|
| Portada | `cabo-san-juan-palmeras` — imagen de internet, 2124×1411 (falta confirmar la fuente). Las anteriores, `cabo-san-juan-dron` y `mirador-playa-sierra`, siguen en la carpeta | — |
| Why | `cabo-san-juan-montanas` — Gar.camila.cia | `costa-sierra` |
| Where | `cabo-san-juan-mirador-dron` — imagen de internet (falta confirmar la fuente). La anterior, `ensenadas-costa` (Felipe Restrepo Acosta), sigue en la carpeta | `mirador-cabanas` |
| How | `sendero-palmeras` — Niop90 | `entrada-parque` → `selva-pasarela` |
| Hike | `sendero-palmeras-sol` — imagen de internet (falta confirmar la fuente). La anterior, `sendero-selva-caminantes` (David Shankbone), sigue en la carpeta | `tunel-ramas` |
| Swim | `cabo-san-juan-banistas` — imagen de internet (falta confirmar la fuente). Las anteriores, `cabo-san-juan-mirador` y `cabo-san-juan-playa`, siguen en la carpeta; `playa.jpg` (rocas y mar) está en `imagenes_nose` | `collage-playas` |
| Wildlife | `capuchino-cara-blanca` — Hobbyfotowiki (CC0) | `mono` |
| Snorkel | `arrecife-rayos-sol` — Freepik, ilustrativa (no es de Tayrona). La anterior, `arrecife-coral` de Tisquesusa, sí es de Tayrona y sigue en la carpeta | `rocas-mar` |
| Tip 1 (Yined) | `palmeras-recorrida` — TitiNicola | `atardecer-sendero` |
| Tip 2 (Majo) | `playa-turquesa` — Supertita | `atardecer-arbustos` |
| Tip 3 (Dari) | `laguna-costera` — Mottenpriesterin | `laguna` |
| Tip 4 (Dani) | `selva-costera` — Mottenpriesterin | `playa-cielo-azul` |
| Final | `amanecer-palmera` — Thomas Fuhrmann | — |

Las fotos del grupo que ya no se usan (`cabo-san-juan`, `collage-cabo-rocas`,
`ventana-cabana`, `atardecer-playa`, `palmeras-camino`, `sendero-letrero`) siguen
en la carpeta por si se quieren recuperar.

Las 14 fotos de @julianato21 (integrante del grupo) traían la marca de TikTok; se
quitó rellenando la zona con la textura vecina. Los archivos originales siguen en
`tairona/originales/`. Si aparecen los originales sin marca, basta con reemplazar
el archivo con el mismo nombre.

### Regenerar un avatar

```powershell
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile("$PWD\assets\img\personajes\dari.jpg")
$dst = New-Object System.Drawing.Bitmap 480, 480
$g = [System.Drawing.Graphics]::FromImage($dst); $g.InterpolationMode = 'HighQualityBicubic'
# x, y, lado del cuadrado de la cara dentro del retrato de 2048×2048
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0,0,480,480), (New-Object System.Drawing.Rectangle 300,10,1380,1380), 'Pixel')
$dst.Save("$PWD\assets\img\personajes\dari-face.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
```

---

## Notas

- **Duración:** el guion completo se lee en unos dos minutos y el proyecto pide
  cuatro como mínimo. El cronómetro (`T`) ayuda a medirlo al ensayar. Comentar
  los gráficos (el mapa, la ruta, la lista) también suma tiempo de forma natural.
- **How to get there:** el guion dice *"a short boat ride from Taganga or Cabo San
  Juan"*. La lancha va **de Taganga a Cabo San Juan**, así que quizá conviene
  decir *"from Taganga to Cabo San Juan"*. En el gráfico ya aparece así.
- Diseñado para horizontal; en un celular vertical aparece un aviso para girarlo.
  Por debajo de 900 px de ancho se oculta la polaroid y el póster se centra.

---

Ideas, diseño y creación · Yined Molina
Fotos de Tayrona · @julianato21 y Wikimedia Commons (ver créditos)
