// =========================================================
// EMMET MASTER — data.js
// Retos, cheatsheet, temas de aprendizaje y logros
// =========================================================

// ===== RETOS DE PRÁCTICA =====
const CHALLENGES = [
  // ========== SINTAXIS ==========
  { category: 'Sintaxis', difficulty: 'fácil', input: 'div>p', html: '<div>\n  <p></p>\n</div>', hint: 'El símbolo > crea un hijo (child) anidado.', syntaxUsed: ['child'], explanation: 'El operador > anida el elemento de la derecha dentro del de la izquierda.' },
  { category: 'Sintaxis', difficulty: 'fácil', input: 'ul>li', html: '<ul>\n  <li></li>\n</ul>', hint: 'El símbolo > anida el segundo elemento dentro del primero.', syntaxUsed: ['child'] },
  { category: 'Sintaxis', difficulty: 'fácil', input: 'div+p', html: '<div></div>\n<p></p>', hint: 'El símbolo + crea hermanos (siblings) al mismo nivel.', syntaxUsed: ['sibling'] },
  { category: 'Sintaxis', difficulty: 'medio', input: 'nav>ul>li', html: '<nav>\n  <ul>\n    <li></li>\n  </ul>\n</nav>', hint: 'Encadena > para anidar varios niveles.', syntaxUsed: ['child'] },
  { category: 'Sintaxis', difficulty: 'medio', input: 'div>p^span', html: '<div>\n  <p></p>\n</div>\n<span></span>', hint: 'El símbolo ^ sube un nivel en el árbol (climb-up).', syntaxUsed: ['child', 'climb-up'] },
  { category: 'Sintaxis', difficulty: 'difícil', input: 'div>(header>ul>li*2>a)+footer>p', html: '<div>\n  <header>\n    <ul>\n      <li><a href=""></a></li>\n      <li><a href=""></a></li>\n    </ul>\n  </header>\n  <footer>\n    <p></p>\n  </footer>\n</div>', hint: 'Usa paréntesis () para agrupar bloques de estructura.', syntaxUsed: ['child', 'sibling', 'grouping', 'multiplication'] },
  { category: 'Sintaxis', difficulty: 'fácil', input: 'ul>li*3', html: '<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>', hint: '* multiplica el elemento el número de veces indicado.', syntaxUsed: ['child', 'multiplication'] },
  { category: 'Sintaxis', difficulty: 'medio', input: 'div>p+span>em', html: '<div>\n  <p></p>\n  <span><em></em></span>\n</div>', hint: 'Combina + (hermano) con > (hijo) para estructurar.', syntaxUsed: ['child', 'sibling'] },
  { category: 'Sintaxis', difficulty: 'medio', input: 'ul>li.item$*3', html: '<ul>\n  <li class="item1"></li>\n  <li class="item2"></li>\n  <li class="item3"></li>\n</ul>', hint: 'El símbolo $ se reemplaza por el número de iteración (naming & numbering).', syntaxUsed: ['child', 'multiplication', 'naming'] },
  { category: 'Sintaxis', difficulty: 'difícil', input: 'ul>li.item$$$*3', html: '<ul>\n  <li class="item001"></li>\n  <li class="item002"></li>\n  <li class="item003"></li>\n</ul>', hint: 'Cada $ extra añade un cero de padding al número.', syntaxUsed: ['multiplication', 'naming'] },

  // ========== ATRIBUTOS ==========
  { category: 'Atributos', difficulty: 'fácil', input: '#header', html: '<div id="header"></div>', hint: 'El símbolo # crea un id. Si no hay etiqueta, se usa div.', syntaxUsed: ['id-class'] },
  { category: 'Atributos', difficulty: 'fácil', input: '.title', html: '<div class="title"></div>', hint: 'El símbolo . crea una clase (class).', syntaxUsed: ['id-class', 'implicit'] },
  { category: 'Atributos', difficulty: 'fácil', input: 'form#search.wide', html: '<form id="search" class="wide"></form>', hint: 'Combina etiqueta + #id + .clase en cualquier orden.', syntaxUsed: ['id-class'] },
  { category: 'Atributos', difficulty: 'fácil', input: 'p.class1.class2.class3', html: '<p class="class1 class2 class3"></p>', hint: 'Varias clases encadenadas con puntos.', syntaxUsed: ['id-class'] },
  { category: 'Atributos', difficulty: 'medio', input: 'p[title="Hello world"]', html: '<p title="Hello world"></p>', hint: 'Los corchetes [] permiten atributos personalizados.', syntaxUsed: ['attributes'] },
  { category: 'Atributos', difficulty: 'medio', input: 'td[rowspan=2 colspan=3 title]', html: '<td rowspan="2" colspan="3" title=""></td>', hint: 'Los atributos sin valor toman un valor vacío por defecto.', syntaxUsed: ['attributes'] },
  { category: 'Atributos', difficulty: 'medio', input: 'a[click me]', html: '<a href="click me"></a>', hint: 'En <a>, el texto entre corchetes se interpreta como href.', syntaxUsed: ['attributes'] },

  // ========== TEXTO ==========
  { category: 'Texto', difficulty: 'fácil', input: 'p{Hello world}', html: '<p>Hello world</p>', hint: 'Las llaves {} añaden contenido de texto.', syntaxUsed: ['text'] },
  { category: 'Texto', difficulty: 'medio', input: 'p{Click }+a{here}+{ to continue}', html: '<p>Click </p>\n<a href="">here</a>\n<span> to continue</span>', hint: 'Mezcla {} con + para construir frases.', syntaxUsed: ['text', 'sibling', 'implicit'] },

  // ========== TAG IMPLÍCITO ==========
  { category: 'Tag implícito', difficulty: 'fácil', input: '.class', html: '<div class="class"></div>', hint: 'Sin etiqueta, Emmet infiere <div>.', syntaxUsed: ['implicit'] },
  { category: 'Tag implícito', difficulty: 'medio', input: 'em>.class', html: '<em><span class="class"></span></em>', hint: 'Dentro de <em>, la etiqueta implícita es <span>.', syntaxUsed: ['implicit'] },
  { category: 'Tag implícito', difficulty: 'medio', input: 'ul>.class', html: '<ul>\n  <li class="class"></li>\n</ul>', hint: 'Dentro de <ul>, la etiqueta implícita es <li>.', syntaxUsed: ['implicit'] },

  // ========== HTML ==========
  { category: 'HTML', difficulty: 'fácil', input: 'a', html: '<a href=""></a>', hint: 'El atajo a crea un enlace con href vacío.', syntaxUsed: ['abbreviation'] },
  { category: 'HTML', difficulty: 'fácil', input: 'a:link', html: '<a href="http://"></a>', hint: ':link añade http:// en el href.', syntaxUsed: ['abbreviation'] },
  { category: 'HTML', difficulty: 'fácil', input: 'a:mail', html: '<a href="mailto:"></a>', hint: ':mail genera un mailto: automáticamente.', syntaxUsed: ['abbreviation'] },
  { category: 'HTML', difficulty: 'fácil', input: 'abbr', html: '<abbr title=""></abbr>', hint: 'abbr incluye title vacío.', syntaxUsed: ['abbreviation'] },
  { category: 'HTML', difficulty: 'fácil', input: 'br', html: '<br />', hint: 'Etiquetas void se autocierran.', syntaxUsed: ['void'] },
  { category: 'HTML', difficulty: 'fácil', input: 'link:css', html: '<link rel="stylesheet" href="style.css" />', hint: ':css genera un <link> al stylesheet.', syntaxUsed: ['abbreviation'] },
  { category: 'HTML', difficulty: 'medio', input: 'meta:vp', html: '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />', hint: ':vp añade el meta viewport responsive.', syntaxUsed: ['abbreviation'] },
  { category: 'HTML', difficulty: 'fácil', input: 'img', html: '<img src="" alt="" />', hint: 'img genera src y alt vacíos.', syntaxUsed: ['abbreviation', 'void'] },
  { category: 'HTML', difficulty: 'fácil', input: 'script:src', html: '<script src=""></script>', hint: ':src añade un src vacío al script.', syntaxUsed: ['abbreviation'] },

  // ========== FORMULARIOS ==========
  { category: 'Formularios', difficulty: 'fácil', input: 'form:post', html: '<form action="" method="post"></form>', hint: ':post añade method="post".', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'fácil', input: 'label', html: '<label for=""></label>', hint: 'label añade for="" listo para el id.', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'fácil', input: 'input:text', html: '<input type="text" name="" id="" />', hint: ':text = input:text', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'fácil', input: 'input:email', html: '<input type="email" name="" id="" />', hint: 'Tipos de input tienen atajos propios.', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'fácil', input: 'input:password', html: '<input type="password" name="" id="" />', hint: ':password o :p', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'fácil', input: 'input:checkbox', html: '<input type="checkbox" name="" id="" />', hint: ':checkbox o :c', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'fácil', input: 'select', html: '<select name="" id=""></select>', hint: 'select incluye name e id vacíos.', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'medio', input: 'textarea', html: '<textarea name="" id="" cols="30" rows="10"></textarea>', hint: 'textarea incluye cols="30" rows="10".', syntaxUsed: ['abbreviation'] },
  { category: 'Formularios', difficulty: 'fácil', input: 'button:submit', html: '<button type="submit"></button>', hint: ':submit o :s en button.', syntaxUsed: ['abbreviation'] },

  // ========== CSS ==========
  { category: 'CSS', difficulty: 'fácil', input: 'pos:a', html: 'position: absolute;', hint: 'a = absolute', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'pos:r', html: 'position: relative;', hint: 'r = relative', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'd:f', html: 'display: flex;', hint: 'f = flex', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'd:ib', html: 'display: inline-block;', hint: 'ib = inline-block', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'fl:l', html: 'float: left;', hint: 'l = left', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'm:a', html: 'margin: auto;', hint: 'a = auto', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'p:0', html: 'padding: 0;', hint: 'Los valores numéricos se añaden directamente.', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'medio', input: 'w:100', html: 'width: 100px;', hint: 'Si no hay unidad, Emmet añade px.', syntaxUsed: ['css-abbrev', 'css-units'] },
  { category: 'CSS', difficulty: 'fácil', input: 'h:a', html: 'height: auto;', hint: 'a = auto', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'bgc', html: 'background-color: #fff;', hint: 'bgc = background-color (por defecto #fff).', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'fz', html: 'font-size: ;', hint: 'fz = font-size', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'fw:b', html: 'font-weight: bold;', hint: 'b = bold', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'lh', html: 'line-height: ;', hint: 'lh = line-height', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'op', html: 'opacity: ;', hint: 'op = opacity', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'trs', html: 'transition: prop time;', hint: 'trs = transition', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'medio', input: 'bxz:bb', html: 'box-sizing: border-box;', hint: 'bb = border-box', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'medio', input: 'bxsh', html: 'box-shadow: inset hoff voff blur color;', hint: 'bxsh = box-shadow', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'bd+', html: 'border: 1px solid #000;', hint: 'El + añade valores por defecto útiles.', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'bdrs', html: 'border-radius: ;', hint: 'bdrs = border-radius', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'fx', html: 'flex: ;', hint: 'fx = flex', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'jc:c', html: 'justify-content: center;', hint: 'c = center', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'ai:c', html: 'align-items: center;', hint: 'c = center', syntaxUsed: ['css-abbrev'] },
  { category: 'CSS', difficulty: 'fácil', input: 'tt:u', html: 'text-transform: uppercase;', hint: 'u = uppercase', syntaxUsed: ['css-abbrev'] },

  // ========== DOCTYPE ==========
  { category: 'DOCTYPE', difficulty: 'fácil', input: '!', html: '<!DOCTYPE html>', hint: '! genera el doctype HTML5.', syntaxUsed: ['doctype'] },
  { category: 'DOCTYPE', difficulty: 'medio', input: 'html:5', html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>Document</title>\n</head>\n<body>\n</body>\n</html>', hint: 'html:5 es la plantilla HTML5 completa.', syntaxUsed: ['doctype'] }
];

// ===== CHEATSHEET =====
const CHEATSHEET = {
  'Sintaxis': [
    { k: '>', v: 'div>p', d: 'Child: anida hijo' },
    { k: '+', v: 'div+p', d: 'Sibling: crea hermanos' },
    { k: '^', v: 'div>p^span', d: 'Climb-up: sube un nivel' },
    { k: '()', v: 'div>(a>p)+b', d: 'Grouping: agrupa bloques' },
    { k: '*', v: 'ul>li*3', d: 'Multiplication: repite N veces' },
    { k: '{}', v: 'p{Hello}', d: 'Text: añade texto' },
    { k: '$', v: 'ul>li.item$*3', d: 'Naming: numeración automática' },
    { k: '$$', v: 'item$$', d: 'Número con padding de ceros' }
  ],
  'ID y Clase': [
    { k: '#id', v: '#header', d: 'Genera id' },
    { k: '.class', v: '.title', d: 'Genera class' },
    { k: 'form#search.wide', v: 'Combina etiqueta+id+clase', d: 'Orden libre' },
    { k: 'p[title="Hello"]', v: 'Atributos personalizados', d: 'Corchetes' }
  ],
  'HTML': [
    { k: 'a', v: '<a href=""></a>', d: 'Enlace' },
    { k: 'a:link', v: '<a href="http://"></a>', d: 'Enlace externo' },
    { k: 'a:mail', v: '<a href="mailto:"></a>', d: 'Enlace email' },
    { k: 'link:css', v: '<link rel="stylesheet" href="style.css" />', d: 'Hoja de estilos' },
    { k: 'meta:vp', v: '<meta name="viewport" ...>', d: 'Meta viewport' },
    { k: 'img', v: '<img src="" alt="" />', d: 'Imagen' },
    { k: 'script:src', v: '<script src=""></script>', d: 'Script con src' }
  ],
  'Formularios': [
    { k: 'form', v: '<form action=""></form>', d: 'Formulario' },
    { k: 'form:post', v: 'method="post"', d: 'Form POST' },
    { k: 'input:text', v: 'type="text"', d: 'Input texto' },
    { k: 'input:email', v: 'type="email"', d: 'Input email' },
    { k: 'input:password', v: 'type="password"', d: 'Input password' },
    { k: 'input:checkbox', v: 'type="checkbox"', d: 'Checkbox' },
    { k: 'input:radio', v: 'type="radio"', d: 'Radio' },
    { k: 'select', v: '<select></select>', d: 'Select' },
    { k: 'textarea', v: 'cols="30" rows="10"', d: 'Textarea' },
    { k: 'button:submit', v: '<button type="submit"></button>', d: 'Botón submit' }
  ],
  'CSS — Layout': [
    { k: 'pos:a', v: 'position: absolute;', d: 'a = absolute' },
    { k: 'pos:r', v: 'position: relative;', d: 'r = relative' },
    { k: 'pos:f', v: 'position: fixed;', d: 'f = fixed' },
    { k: 'd:f', v: 'display: flex;', d: 'f = flex' },
    { k: 'd:ib', v: 'display: inline-block;', d: 'ib = inline-block' },
    { k: 'd:n', v: 'display: none;', d: 'n = none' },
    { k: 'fl:l', v: 'float: left;', d: 'l = left' },
    { k: 'fl:r', v: 'float: right;', d: 'r = right' },
    { k: 'cl:b', v: 'clear: both;', d: 'b = both' },
    { k: 'fx', v: 'flex: ;', d: 'flex' },
    { k: 'jc:c', v: 'justify-content: center;', d: 'c = center' },
    { k: 'jc:sb', v: 'justify-content: space-between;', d: 'sb = space-between' },
    { k: 'ai:c', v: 'align-items: center;', d: 'c = center' },
    { k: 'as:c', v: 'align-self: center;', d: 'c = center' }
  ],
  'CSS — Box': [
    { k: 'm:a', v: 'margin: auto;', d: 'a = auto' },
    { k: 'p:0', v: 'padding: 0;', d: 'valor numérico' },
    { k: 'w:100', v: 'width: 100px;', d: 'sin unidad = px' },
    { k: 'h:a', v: 'height: auto;', d: 'a = auto' },
    { k: 'maw', v: 'max-width: ;', d: 'max-width' },
    { k: 'mih', v: 'min-height: ;', d: 'min-height' },
    { k: 'bxz:bb', v: 'box-sizing: border-box;', d: 'bb = border-box' },
    { k: 'bxsh', v: 'box-shadow: inset hoff voff blur color;', d: 'box-shadow' }
  ],
  'CSS — Tipografía': [
    { k: 'fz', v: 'font-size: ;', d: 'font-size' },
    { k: 'fw:b', v: 'font-weight: bold;', d: 'b = bold' },
    { k: 'fs:i', v: 'font-style: italic;', d: 'i = italic' },
    { k: 'ff', v: 'font-family: ;', d: 'font-family' },
    { k: 'lh', v: 'line-height: ;', d: 'line-height' },
    { k: 'lts', v: 'letter-spacing: ;', d: 'letter-spacing' },
    { k: 'ta:c', v: 'text-align: center;', d: 'c = center' },
    { k: 'td:u', v: 'text-decoration: underline;', d: 'u = underline' },
    { k: 'tt:u', v: 'text-transform: uppercase;', d: 'u = uppercase' },
    { k: 'tov:e', v: 'text-overflow: ellipsis;', d: 'e = ellipsis' }
  ],
  'CSS — Color & Fondo': [
    { k: 'c', v: 'color: #000;', d: 'color' },
    { k: 'c:r', v: 'color: rgb(0, 0, 0);', d: 'rgb' },
    { k: 'c:ra', v: 'color: rgba(0, 0, 0, .5);', d: 'rgba' },
    { k: 'bgc', v: 'background-color: #fff;', d: 'background-color' },
    { k: 'bgi', v: 'background-image: url();', d: 'background-image' },
    { k: 'bgr:n', v: 'background-repeat: no-repeat;', d: 'no-repeat' },
    { k: 'bgp', v: 'background-position: 0 0;', d: 'position' },
    { k: 'bgsz:cv', v: 'background-size: cover;', d: 'cv = cover' },
    { k: 'op', v: 'opacity: ;', d: 'opacity' }
  ],
  'CSS — Borde': [
    { k: 'bd+', v: 'border: 1px solid #000;', d: 'atajo completo' },
    { k: 'bd:n', v: 'border: none;', d: 'n = none' },
    { k: 'bdrs', v: 'border-radius: ;', d: 'border-radius' },
    { k: 'bdc', v: 'border-color: #000;', d: 'border-color' },
    { k: 'bds:s', v: 'border-style: solid;', d: 's = solid' },
    { k: 'bdw', v: 'border-width: ;', d: 'border-width' }
  ],
  'CSS — Animación': [
    { k: 'anim', v: 'animation: name duration ...;', d: 'animation' },
    { k: 'animdel', v: 'animation-delay: time;', d: 'delay' },
    { k: 'animdur', v: 'animation-duration: 0s;', d: 'duration' },
    { k: 'animtf:l', v: 'animation-timing-function: linear;', d: 'linear' },
    { k: 'trf', v: 'transform: ;', d: 'transform' },
    { k: 'trfr', v: 'transform: rotate(angle);', d: 'rotate' },
    { k: 'trf:sc', v: 'transform: scale(x, y);', d: 'scale' },
    { k: 'trs', v: 'transition: prop time;', d: 'transition' }
  ],
  'DOCTYPE': [
    { k: '!', v: '<!DOCTYPE html>', d: 'HTML5 doctype' },
    { k: 'html:5', v: 'Plantilla HTML5 completa', d: 'Boilerplate' },
    { k: 'html:4t', v: 'HTML 4.01 Transitional', d: 'Legacy' },
    { k: 'html:4s', v: 'HTML 4.01 Strict', d: 'Legacy' },
    { k: 'html:xt', v: 'XHTML 1.0 Transitional', d: 'XHTML' },
    { k: 'html:xs', v: 'XHTML 1.0 Strict', d: 'XHTML' }
  ],
  'HTML — Contenido': [
    { k: 'table>tr>td', v: '<table><tr><td></td></tr></table>', d: 'Tabla básica' },
    { k: 'table>tr*3>td*2', v: 'Tabla 3 filas × 2 columnas', d: 'Tabla con celdas' },
    { k: 'table>thead>tr>th*3', v: 'Encabezado con thead', d: 'Encabezado semántico' },
    { k: 'ul>li*3', v: '<ul><li></li>...</ul>', d: 'Lista desordenada' },
    { k: 'ol>li*3', v: '<ol><li></li>...</ul>', d: 'Lista ordenada' },
    { k: 'dl>dt+dd', v: '<dl><dt></dt><dd></dd></dl>', d: 'Lista de definición' },
    { k: 'header+nav+main+footer', v: 'Estructura semántica HTML5', d: 'Layout base' }
  ],
  'Avanzado': [
    { k: 'lorem', v: 'Lorem ipsum dolor sit amet...', d: 'Texto de relleno (30 palabras)' },
    { k: 'lorem10', v: '10 palabras de lorem ipsum', d: 'Relleno de N palabras' },
    { k: 'p>lorem5', v: '<p>Lorem ipsum...</p>', d: 'Lorem dentro de etiqueta' },
    { k: 'ul>li*3>lorem4', v: 'Lista con texto de relleno', d: 'Multiplicar con lorem' },
    { k: 'xsl:template', v: '<xsl:template match=""></xsl:template>', d: 'Plantilla XSL' },
    { k: 'xsl:if', v: '<xsl:if test=""></xsl:if>', d: 'Condicional XSL' }
  ]
};

// ===== TEMAS DE APRENDIZAJE =====
const LEARN_TOPICS = {
  // ---------- HTML ESTRUCTURA ----------
  child: {
    title: 'Child (>)',
    category: 'HTML — Estructura',
    what: 'Crea un elemento hijo anidado dentro del anterior. Es el operador más básico de Emmet.',
    syntax: 'parent>child',
    examples: [
      { input: 'div>p', output: '<div>\n  <p></p>\n</div>', note: 'Un párrafo dentro de un div' },
      { input: 'ul>li', output: '<ul>\n  <li></li>\n</ul>', note: 'Un elemento de lista dentro de ul' },
      { input: 'nav>ul>li', output: '<nav>\n  <ul>\n    <li></li>\n  </ul>\n</nav>', note: 'Anidación de varios niveles' }
    ],
    tips: ['Puedes encadenar tantos > como necesites', 'Combínalo con * para repetir: ul>li*3'],
    practice: ['header>nav', 'section>article>p', 'table>tr>td']
  },
  sibling: {
    title: 'Sibling (+)',
    category: 'HTML — Estructura',
    what: 'Crea elementos hermanos al mismo nivel jerárquico.',
    syntax: 'element1+element2',
    examples: [
      { input: 'div+p', output: '<div></div>\n<p></p>', note: 'Dos hermanos al mismo nivel' },
      { input: 'header+main+footer', output: '<header></header>\n<main></main>\n<footer></footer>', note: 'Estructura semántica típica' }
    ],
    tips: ['Se combina con > para mezclar jerarquías', 'div>p+span crea un p y un span dentro del div'],
    practice: ['h1+p', 'header+main+footer', 'ul+ol']
  },
  'climb-up': {
    title: 'Climb-up (^)',
    category: 'HTML — Estructura',
    what: 'Sube un nivel en el árbol. Útil para salir de un anidamiento.',
    syntax: 'parent>child^sibling-of-parent',
    examples: [
      { input: 'div>p^span', output: '<div>\n  <p></p>\n</div>\n<span></span>', note: 'span es hermano de div, no hijo' },
      { input: 'div>ul>li^^p', output: '<div>\n  <ul>\n    <li></li>\n  </ul>\n</div>\n<p></p>', note: 'Doble ^ sube dos niveles' }
    ],
    tips: ['Cada ^ sube un nivel', 'Equivale a cerrar un nivel de anidación'],
    practice: ['div>p^span', 'ul>li^p', 'section>div>p^^footer']
  },
  grouping: {
    title: 'Grouping (())',
    category: 'HTML — Estructura',
    what: 'Agrupa bloques para aplicar operadores a un conjunto de elementos.',
    syntax: '(element1+element2)>child',
    examples: [
      { input: '(header>ul>li*2>a)+footer>p', output: '<header>\n  <ul>\n    <li><a href=""></a></li>\n    <li><a href=""></a></li>\n  </ul>\n</header>\n<footer>\n  <p></p>\n</footer>', note: 'Agrupa header y footer al mismo nivel' },
      { input: '(div>h1+p)*2', output: '<div>\n  <h1></h1>\n  <p></p>\n</div>\n<div>\n  <h1></h1>\n  <p></p>\n</div>', note: 'Multiplica un grupo completo' }
    ],
    tips: ['Los paréntesis se pueden anidar', 'Muy útil con multiplicación para layouts repetidos'],
    practice: ['(header+footer)*2', '(div>p)*3', '(ul>li*2)+(ol>li*2)']
  },
  multiplication: {
    title: 'Multiplication (*)',
    category: 'HTML — Estructura',
    what: 'Repite un elemento o grupo N veces.',
    syntax: 'element*N',
    examples: [
      { input: 'ul>li*3', output: '<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>', note: 'Tres li dentro de ul' },
      { input: '(div>p)*2', output: '<div>\n  <p></p>\n</div>\n<div>\n  <p></p>\n</div>', note: 'Multiplica grupos completos' }
    ],
    tips: ['Combínalo con $ para numerar: ul>li.item$*3', 'Funciona con cualquier elemento o grupo'],
    practice: ['ul>li*5', 'div>span*4', '(section>h2+p)*3']
  },
  naming: {
    title: 'Naming & Numbering ($)',
    category: 'HTML — Estructura',
    what: 'El símbolo $ se reemplaza por el número de iteración. Cada $ extra añade padding.',
    syntax: 'element$*N',
    examples: [
      { input: 'ul>li.item$*3', output: '<ul>\n  <li class="item1"></li>\n  <li class="item2"></li>\n  <li class="item3"></li>\n</ul>', note: 'Numeración simple' },
      { input: 'ul>li.item$$$*3', output: '<ul>\n  <li class="item001"></li>\n  <li class="item002"></li>\n  <li class="item003"></li>\n</ul>', note: 'Padding con $$$' },
      { input: 'div#item$*3', output: '<div id="item1"></div>\n<div id="item2"></div>\n<div id="item3"></div>', note: 'Funciona en id, class y texto' }
    ],
    tips: ['$$$ añade ceros a la izquierda', 'Combínalo con @- para invertir numeración'],
    practice: ['ul>li.item$*5', 'div#section$$*3', 'ul>li{Item $}*3']
  },
  'id-class': {
    title: 'ID y Class (# .)',
    category: 'HTML — Estructura',
    what: 'El símbolo # genera un id y el símbolo . una clase. Puedes combinar varios.',
    syntax: 'tag#id.class1.class2',
    examples: [
      { input: '#header', output: '<div id="header"></div>', note: 'Sin etiqueta, se usa div' },
      { input: '.title', output: '<div class="title"></div>', note: 'Solo clase' },
      { input: 'form#search.wide', output: '<form id="search" class="wide"></form>', note: 'Combinado en cualquier orden' },
      { input: 'p.a.b.c', output: '<p class="a b c"></p>', note: 'Múltiples clases' }
    ],
    tips: ['Orden libre: .class#id o #id.class', 'Varios .class se acumulan en el atributo class'],
    practice: ['nav#menu', 'div.container', 'section#main.content.wide']
  },
  attributes: {
    title: 'Atributos personalizados [ ]',
    category: 'HTML — Estructura',
    what: 'Los corchetes permiten añadir cualquier atributo HTML.',
    syntax: 'tag[attr1=val1 attr2="val 2"]',
    examples: [
      { input: 'p[title="Hello world"]', output: '<p title="Hello world"></p>', note: 'Atributo con valor' },
      { input: 'td[rowspan=2 colspan=3 title]', output: '<td rowspan="2" colspan="3" title=""></td>', note: 'Atributos sin valor' },
      { input: 'a[click me]', output: '<a href="click me"></a>', note: 'En a, se interpreta como href' }
    ],
    tips: ['Los valores con espacios necesitan comillas', 'Combínalo con id y class'],
    practice: ['input[type="checkbox" checked]', 'img[src="a.png" alt="A"]', 'a[href="https://example.com"]']
  },
  text: {
    title: 'Text ({})',
    category: 'HTML — Estructura',
    what: 'Las llaves añaden contenido de texto al elemento.',
    syntax: 'tag{texto}',
    examples: [
      { input: 'p{Hello world}', output: '<p>Hello world</p>', note: 'Texto simple' },
      { input: 'a{Click aquí}', output: '<a href="">Click aquí</a>', note: 'Con etiqueta abreviada' },
      { input: 'p{Click }+a{here}+{ to continue}', output: '<p>Click </p>\n<a href="">here</a>\n<span> to continue</span>', note: 'Mezcla con +' }
    ],
    tips: ['Puedes usar $ dentro del texto para numerar', 'Combínalo con múltiples elementos'],
    practice: ['p{Bienvenido}', 'h1{Título}*2', 'a{Saber más}']
  },
  implicit: {
    title: 'Tag implícita',
    category: 'HTML — Estructura',
    what: 'Si no indicas etiqueta, Emmet la infiere según el contexto.',
    syntax: '.class o #id',
    examples: [
      { input: '.class', output: '<div class="class"></div>', note: 'Contexto raíz → div' },
      { input: 'em>.class', output: '<em><span class="class"></span></em>', note: 'Dentro de em → span' },
      { input: 'ul>.class', output: '<ul>\n  <li class="class"></li>\n</ul>', note: 'Dentro de ul → li' },
      { input: 'table>.row>.cell', output: '<table>\n  <tr class="row">\n    <td class="cell"></td>\n  </tr>\n</table>', note: 'tr y td inferidos' }
    ],
    tips: ['ul/ol → li, table → tr → td, select → option', 'em/strong → span, a → span'],
    practice: ['ul>.item', 'table>.row', 'select>.option']
  },

  // ---------- FORMULARIOS ----------
  form: {
    title: 'Formularios',
    category: 'HTML — Formularios',
    what: 'Atajos para generar formularios completos y sus atributos.',
    syntax: 'form, form:get, form:post',
    examples: [
      { input: 'form', output: '<form action=""></form>', note: 'Formulario básico' },
      { input: 'form:post', output: '<form action="" method="post"></form>', note: 'Con method post' },
      { input: 'form:get', output: '<form action="" method="get"></form>', note: 'Con method get' }
    ],
    tips: ['Combina con input y button para formularios completos', 'form>(label+input)*2+button'],
    practice: ['form:post', 'form>(label+input:text)*3+button:submit']
  },
  input: {
    title: 'Inputs',
    category: 'HTML — Formularios',
    what: 'Atajos para todos los tipos de input.',
    syntax: 'input:tipo',
    examples: [
      { input: 'input:text', output: '<input type="text" name="" id="" />', note: 'Texto' },
      { input: 'input:email', output: '<input type="email" name="" id="" />', note: 'Email' },
      { input: 'input:password', output: '<input type="password" name="" id="" />', note: 'Password' },
      { input: 'input:checkbox', output: '<input type="checkbox" name="" id="" />', note: 'Checkbox' },
      { input: 'input:radio', output: '<input type="radio" name="" id="" />', note: 'Radio' },
      { input: 'input:submit', output: '<input type="submit" value="" />', note: 'Submit' }
    ],
    tips: ['Todos los tipos HTML5 tienen atajos', 'input:number, input:date, input:color, etc.'],
    practice: ['input:text', 'input:email', 'input:number']
  },
  button: {
    title: 'Botones',
    category: 'HTML — Formularios',
    what: 'Atajos para botones con diferentes tipos.',
    syntax: 'button, button:submit, button:reset',
    examples: [
      { input: 'button', output: '<button></button>', note: 'Botón básico' },
      { input: 'button:submit', output: '<button type="submit"></button>', note: 'Submit' },
      { input: 'button:reset', output: '<button type="reset"></button>', note: 'Reset' }
    ],
    tips: ['También existe input:submit', 'Combínalo con texto: button{Enviar}'],
    practice: ['button:submit', 'button{Enviar}', 'button:reset']
  },
  select: {
    title: 'Select & Option',
    category: 'HTML — Formularios',
    what: 'Genera selects y sus opciones.',
    syntax: 'select>option',
    examples: [
      { input: 'select', output: '<select name="" id=""></select>', note: 'Select básico' },
      { input: 'select>option*3', output: '<select name="" id="">\n  <option value=""></option>\n  <option value=""></option>\n  <option value=""></option>\n</select>', note: 'Con opciones' }
    ],
    tips: ['Dentro de select, la etiqueta implícita es option', 'Combínalo con texto'],
    practice: ['select>option*3', 'select>option{Opción $}*3']
  },

  // ---------- CONTENIDO ----------
  tables: {
    title: 'Tablas',
    category: 'HTML — Contenido',
    what: 'Genera tablas completas con sus filas y celdas.',
    syntax: 'table>tr>td',
    examples: [
      { input: 'table>tr>td', output: '<table>\n  <tr>\n    <td></td>\n  </tr>\n</table>', note: 'Tabla mínima' },
      { input: 'table>tr*3>td*2', output: '<table>\n  <tr>\n    <td></td>\n    <td></td>\n  </tr>\n  <tr>\n    <td></td>\n    <td></td>\n  </tr>\n  <tr>\n    <td></td>\n    <td></td>\n  </tr>\n</table>', note: 'Tabla 3×2' },
      { input: 'table>thead>tr>th*3', output: '<table>\n  <thead>\n    <tr>\n      <th></th>\n      <th></th>\n      <th></th>\n    </tr>\n  </thead>\n</table>', note: 'Con thead' }
    ],
    tips: ['La etiqueta implícita dentro de table es tr, y dentro de tr es td', 'Combínalo con colspan y rowspan'],
    practice: ['table>tr*3>td*3', 'table>thead>tr>th*3', 'table>tbody>tr*5>td*3']
  },
  lists: {
    title: 'Listas',
    category: 'HTML — Contenido',
    what: 'Genera listas ordenadas, desordenadas y de definición.',
    syntax: 'ul>li, ol>li, dl>dt+dd',
    examples: [
      { input: 'ul>li*3', output: '<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>', note: 'Lista desordenada' },
      { input: 'ol>li*3', output: '<ol>\n  <li></li>\n  <li></li>\n  <li></li>\n</ol>', note: 'Lista ordenada' },
      { input: 'dl>dt+dd', output: '<dl>\n  <dt></dt>\n  <dd></dd>\n</dl>', note: 'Lista de definición' }
    ],
    tips: ['ul y ol → li implícito', 'dl → dt, dd'],
    practice: ['ul>li*5', 'ol>li{item $}*3', 'dl>dt+dd']
  },
  doctypes: {
    title: 'DOCTYPEs',
    category: 'HTML — Contenido',
    what: 'Genera declaraciones DOCTYPE para diferentes versiones de HTML.',
    syntax: '! o html:versión',
    examples: [
      { input: '!', output: '<!DOCTYPE html>', note: 'HTML5' },
      { input: 'html:5', output: 'Plantilla HTML5 completa', note: 'Boilerplate' },
      { input: 'html:4t', output: 'HTML 4.01 Transitional', note: 'Legacy' }
    ],
    tips: ['! es el más usado', 'html:5 genera la estructura completa'],
    practice: ['!', 'html:5']
  },
  semantic: {
    title: 'Semántica',
    category: 'HTML — Contenido',
    what: 'Genera estructuras semánticas típicas de HTML5.',
    syntax: 'header+nav+main+footer',
    examples: [
      { input: 'header+main+footer', output: '<header></header>\n<main></main>\n<footer></footer>', note: 'Estructura básica' },
      { input: 'header>nav+main+footer', output: '<header>\n  <nav></nav>\n  <main></main>\n  <footer></footer>\n</header>', note: 'Anidado' }
    ],
    tips: ['Combina con >, +, * para layouts completos', 'Muy útil para plantillas'],
    practice: ['header+main+footer', 'article>header+section+footer']
  },

  // ---------- CSS ----------
  'css-visual': {
    title: 'Formato visual CSS',
    category: 'CSS',
    what: 'Emmet genera propiedades CSS a partir de abreviaturas.',
    syntax: 'prop:valor',
    examples: [
      { input: 'd:f', output: 'display: flex;', note: 'display flex' },
      { input: 'pos:a', output: 'position: absolute;', note: 'position absolute' },
      { input: 'fl:l', output: 'float: left;', note: 'float left' }
    ],
    tips: ['Usa abreviaturas cortas para escribir CSS rápido', 'Funciona en cualquier editor con Emmet'],
    practice: ['d:f', 'pos:r', 'fl:l']
  },
  'css-margin': {
    title: 'Margin & Padding',
    category: 'CSS',
    what: 'Atajos para márgenes y rellenos.',
    syntax: 'm:valor, p:valor',
    examples: [
      { input: 'm:a', output: 'margin: auto;', note: 'Margin auto' },
      { input: 'p:0', output: 'padding: 0;', note: 'Padding 0' },
      { input: 'm10', output: 'margin: 10px;', note: 'Margin 10px' },
      { input: 'p10-20', output: 'padding: 10px 20px;', note: 'Padding vertical/horizontal' }
    ],
    tips: ['Sin unidad, se añade px automáticamente', 'Puedes usar - para valores negativos'],
    practice: ['m:a', 'p:0', 'm10', 'p10-20']
  },
  'css-box': {
    title: 'Box-sizing',
    category: 'CSS',
    what: 'Controla cómo se calcula el tamaño de los elementos.',
    syntax: 'bxz:bb',
    examples: [
      { input: 'bxz:bb', output: 'box-sizing: border-box;', note: 'border-box' },
      { input: 'bxz:cb', output: 'box-sizing: content-box;', note: 'content-box' }
    ],
    tips: ['border-box es el estándar moderno', 'Aplícalo globalmente: * { box-sizing: border-box; }'],
    practice: ['bxz:bb', 'bxz:cb']
  },
  'css-font': {
    title: 'Fuentes y texto',
    category: 'CSS',
    what: 'Atajos para tipografía.',
    syntax: 'fz, fw, ff, lh, ta',
    examples: [
      { input: 'fz', output: 'font-size: ;', note: 'font-size' },
      { input: 'fw:b', output: 'font-weight: bold;', note: 'font-weight bold' },
      { input: 'fs:i', output: 'font-style: italic;', note: 'italic' },
      { input: 'ta:c', output: 'text-align: center;', note: 'center' },
      { input: 'lh', output: 'line-height: ;', note: 'line-height' }
    ],
    tips: ['Combínalos en un solo bloque CSS', 'fz24 genera font-size: 24px'],
    practice: ['fz24', 'fw:b', 'ta:c']
  },
  'css-bg': {
    title: 'Background & Color',
    category: 'CSS',
    what: 'Atajos para fondos y colores.',
    syntax: 'bgc, bgi, c, c:r',
    examples: [
      { input: 'bgc', output: 'background-color: #fff;', note: 'background-color' },
      { input: 'bgi', output: 'background-image: url();', note: 'background-image' },
      { input: 'c', output: 'color: #000;', note: 'color' },
      { input: 'c:r', output: 'color: rgb(0, 0, 0);', note: 'rgb' },
      { input: 'c:ra', output: 'color: rgba(0, 0, 0, .5);', note: 'rgba' }
    ],
    tips: ['Puedes especificar colores: c#f00 → color: #f00', 'bgr:n evita repetición'],
    practice: ['bgc#f00', 'c:r', 'bgi']
  },
  'css-border': {
    title: 'Bordes & Outline',
    category: 'CSS',
    what: 'Atajos para bordes y contornos.',
    syntax: 'bd, bdrs, bdc, bds, bdw',
    examples: [
      { input: 'bd+', output: 'border: 1px solid #000;', note: 'Borde completo' },
      { input: 'bd:n', output: 'border: none;', note: 'Sin borde' },
      { input: 'bdrs', output: 'border-radius: ;', note: 'Radius' },
      { input: 'bdc', output: 'border-color: #000;', note: 'Color' },
      { input: 'bds:s', output: 'border-style: solid;', note: 'Estilo' }
    ],
    tips: ['bd+ es el atajo más útil', 'bdrs5 → border-radius: 5px'],
    practice: ['bd+', 'bdrs5', 'bd:n']
  },
  'css-flex': {
    title: 'Flexbox',
    category: 'CSS',
    what: 'Atajos para el modelo de cajas flexibles.',
    syntax: 'd:f, jc, ai, as, fx',
    examples: [
      { input: 'd:f', output: 'display: flex;', note: 'display flex' },
      { input: 'jc:c', output: 'justify-content: center;', note: 'center' },
      { input: 'jc:sb', output: 'justify-content: space-between;', note: 'space-between' },
      { input: 'ai:c', output: 'align-items: center;', note: 'center' },
      { input: 'as:c', output: 'align-self: center;', note: 'center' },
      { input: 'fx', output: 'flex: ;', note: 'flex' }
    ],
    tips: ['jc:sa → space-around, jc:fe → flex-end', 'Combínalos para centrar perfectamente'],
    practice: ['d:f+jc:c+ai:c', 'jc:sb', 'ai:c']
  },
  'css-transform': {
    title: 'Transform & Transition',
    category: 'CSS',
    what: 'Transformaciones y transiciones.',
    syntax: 'trf, trfr, trf:sc, trs',
    examples: [
      { input: 'trf', output: 'transform: ;', note: 'transform' },
      { input: 'trfr', output: 'transform: rotate(angle);', note: 'rotate' },
      { input: 'trf:sc', output: 'transform: scale(x, y);', note: 'scale' },
      { input: 'trs', output: 'transition: prop time;', note: 'transition' }
    ],
    tips: ['Combínalos con :hover', 'trs0.3s → transition: 0.3s'],
    practice: ['trf:sc', 'trfr45', 'trs0.3s']
  },
  'css-animation': {
    title: 'Animaciones',
    category: 'CSS',
    what: 'Atajos para animaciones CSS.',
    syntax: 'anim, animdel, animdur, animtf',
    examples: [
      { input: 'anim', output: 'animation: name duration ...;', note: 'animation' },
      { input: 'animdel', output: 'animation-delay: time;', note: 'delay' },
      { input: 'animdur', output: 'animation-duration: 0s;', note: 'duration' },
      { input: 'animtf:l', output: 'animation-timing-function: linear;', note: 'linear' }
    ],
    tips: ['Combínalo con @keyframes', 'Muy útil para loaders y efectos'],
    practice: ['anim', 'animdel', 'animdur2s']
  },
  'css-content': {
    title: 'Contenido generado',
    category: 'CSS',
    what: 'Atajos para ::before y ::after con content.',
    syntax: 'cnt, ::before, ::after',
    examples: [
      { input: 'div::before', output: 'div::before {\n  content: "";\n}', note: 'Pseudo-elemento' },
      { input: 'a::after', output: 'a::after {\n  content: "";\n}', note: 'Después' }
    ],
    tips: ['Se usa mucho con iconos', 'content: "" es obligatorio'],
    practice: ['div::before', 'a::after']
  },
  'css-print': {
    title: 'Print',
    category: 'CSS',
    what: 'Estilos para impresión.',
    syntax: '@media print',
    examples: [
      { input: '@media print', output: '@media print {\n  \n}', note: 'Media query de impresión' }
    ],
    tips: ['Útil para ocultar elementos: display:none', 'Ajusta tamaños de fuente'],
    practice: ['@media print']
  },
  'css-others': {
    title: 'Otros',
    category: 'CSS',
    what: 'Otros atajos CSS útiles.',
    syntax: 'op, cl, lts, tov',
    examples: [
      { input: 'op', output: 'opacity: ;', note: 'opacity' },
      { input: 'cl:b', output: 'clear: both;', note: 'clear both' },
      { input: 'lts', output: 'letter-spacing: ;', note: 'letter-spacing' },
      { input: 'tov:e', output: 'text-overflow: ellipsis;', note: 'ellipsis' }
    ],
    tips: ['Consulta el cheatsheet completo', 'Combínalos según necesidad'],
    practice: ['op', 'cl:b', 'tov:e']
  },

  // ---------- AVANZADO ----------
  xslt: {
    title: 'XSL / XSLT',
    category: 'Avanzado',
    what: 'Emmet soporta abreviaturas para XSL.',
    syntax: 'xsl:template, xsl:if',
    examples: [
      { input: 'xsl:template', output: '<xsl:template match=""></xsl:template>', note: 'Template XSL' }
    ],
    tips: ['Menos usado hoy día', 'Útil en proyectos legacy'],
    practice: ['xsl:template']
  },
  lorem: {
    title: 'Lorem ipsum',
    category: 'Avanzado',
    what: 'Genera texto de relleno automáticamente.',
    syntax: 'lorem, loremN, p>lorem',
    examples: [
      { input: 'lorem', output: 'Lorem ipsum dolor sit amet...', note: '30 palabras' },
      { input: 'lorem10', output: '10 palabras de lorem ipsum', note: 'N palabras' },
      { input: 'p>lorem', output: '<p>Lorem ipsum...</p>', note: 'Dentro de etiqueta' }
    ],
    tips: ['lorem100 para textos largos', 'Muy útil para maquetar'],
    practice: ['lorem', 'lorem10', 'p>lorem5']
  },
  wrap: {
    title: 'Wrap with abbreviation',
    category: 'Avanzado',
    what: 'Envuelve el texto seleccionado con una abreviatura.',
    syntax: 'Selecciona texto → Wrap with abbreviation',
    examples: [
      { input: 'Texto seleccionado → ul>li*', output: '<ul>\n  <li>Texto seleccionado</li>\n</ul>', note: 'Envuelve' }
    ],
    tips: ['Atajo: Ctrl+Shift+G en VSCode', 'Muy útil para listas'],
    practice: ['Selecciona varias líneas y envuélvelas']
  }
};

// ===== LOGROS =====
const ACHIEVEMENTS = [
  { id: 'first-win', icon: '🎯', title: 'Primer paso', desc: 'Completa tu primer reto', condition: s => s.completed.size >= 1 },
  { id: 'streak-5', icon: '🔥', title: 'En racha', desc: 'Consigue 5 aciertos seguidos', condition: s => s.bestStreak >= 5 },
  { id: 'streak-10', icon: '⚡', title: 'Imparable', desc: 'Consigue 10 aciertos seguidos', condition: s => s.bestStreak >= 10 },
  { id: 'half', icon: '🌟', title: 'Mitad del camino', desc: 'Completa el 50% de los retos', condition: s => s.completed.size >= CHALLENGES.length / 2 },
  { id: 'all', icon: '🏆', title: 'Emmet Master', desc: 'Completa todos los retos', condition: s => s.completed.size >= CHALLENGES.length },
  { id: 'no-hint', icon: '🧠', title: 'Sin ayudas', desc: 'Completa 10 retos sin usar pistas', condition: s => (s.noHintWins || 0) >= 10 },
  { id: 'speed', icon: '💨', title: 'Velocista', desc: 'Completa un reto en menos de 10s', condition: s => (s.fastestWin || Infinity) < 10 },
  { id: 'playground', icon: '🧪', title: 'Explorador', desc: 'Usa el playground al menos 5 veces', condition: s => (s.playgroundUses || 0) >= 5 },
  { id: 'learn', icon: '📖', title: 'Estudioso', desc: 'Lee al menos 5 temas de aprendizaje', condition: s => (s.topicsRead ? s.topicsRead.size : 0) >= 5 },
  { id: 'xp-100', icon: '⭐', title: 'Aprendiz', desc: 'Acumula 100 XP', condition: s => (s.xp || 0) >= 100 },
  { id: 'xp-500', icon: '🌟', title: 'Experto', desc: 'Acumula 500 XP', condition: s => (s.xp || 0) >= 500 },
  { id: 'xp-1000', icon: '💎', title: 'Maestro', desc: 'Acumula 1000 XP', condition: s => (s.xp || 0) >= 1000 }
];