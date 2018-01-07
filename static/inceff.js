// Make the menu icon display the menu when clicked.
var icon = document.getElementById('icon');
icon.addEventListener('click', display_menu, false);
function display_menu() {
	var menu = document.getElementById('menu');
  if (menu.style.display == '' || menu.style.display == 'none') {
    menu.style.display = 'block';
  }
  else {
    menu.style.display = 'none';
  }
};

// Add an EventListener to the Home nav_link.
document.getElementById('home').addEventListener('click',
  function(event) {
	var main = document.getElementById('main');
  var message = [];
  // Clear the main element.
  main.innerHTML = message.join('');
  main.style.backgroundColor = 'transparent';
  main.style.color = 'black';
  // Change the backgroundColor.
  var active = document.getElementsByClassName('nav_link_active');
  if (active.length > 0) { active[0].classList.toggle('nav_link_active'); }
  var button_column = document.getElementsByClassName('button_column');
  if (button_column.length > 0) {
    while (button_column.length > 0) {
      document.getElementById('last_row').removeChild(button_column[0]);
      button_column = document.getElementsByClassName('button_column');
    }
  } 
}, false);

// Add an EventListener to the 3D Button Gallery nav_link.
document.getElementById('button_gallery').addEventListener('click',
  function(event) {
  // Break out of the function if buttons are aleady displayed.
  button_column  = document.getElementsByClassName('button_column');
  if (button_column.length > 0) { return; }
	var main = document.getElementById('main');
  var message = ['I created this button gallery to speed up the development ',
    'of the TCF buttons. ',
    'Constantly making changes, and refreshing the ',
      'browser to see the results, was just too inefficient. ',
    'If I wanted to create a new color class by copy and pasting an ',
      'existing one, there were 10 lines of code that needed to be changed. ',
    'The buttons style sheet grew in length as I added ',
      'colors I might not even use for the site. ',
    'Since css has no way to use formulas to create small incremental ',
      'changes to color values, I switched over to using Javascript to ',
      'generate the style. ',
    'As you can see on the right, I was able to generate 360 buttons of ',
      'various colors. ',
    'Now, I can click any button I like and generate the rules to copy and ',
      'paste into my style sheets. ',
    'The number in each button represents the hue. ',
    'The saturation for each button is 100% and the base ',
      'setting for light is 50%. ',
    'From there, the light is adjusted up or down for the different ',
      'properties. ',
    'The comments that are generated describe these adjustments. ',
    'Try it out and see what you think. Feel free to copy ',
    'and paste the rules into your own style sheet.'];
  // Clear the main element.
  main.innerHTML = message.join('');
  // Change the backgroundColor.
  var active = document.getElementsByClassName('nav_link_active');
  if (active.length > 0) { active[0].classList.toggle('nav_link_active'); }
  this.classList.toggle('nav_link_active');
  // Create the button gallery.
  create_button_gallery_hsl();
}, false);

function create_button_gallery() {
  // Create a column for each button type;
  var temp_div = create_node({ 'type': 'div',
    'className': 'flex_column button_column' });
  var temp_h2 = create_node({ 'type': 'h2',
    'innerHTML': 'Color' });
  temp_div.appendChild(temp_h2);
  
  color = ['blue', 'green', 'orange','red', 'tan'];
  for (var i = 0; i < color.length; i++) {
    var temp_button = create_node({ 'type': 'button',
    'className': 'button color-' + color[i] + ' shape-rounded',
    'innerHTML': color[i].charAt(0).toUpperCase() + color[i].slice(1) });
    temp_div.appendChild(temp_button);
  }
  temp_div.appendChild(temp_button);
  main.appendChild(temp_div);
}

function create_button_gallery2() {
  var main = document.getElementById('main');
  // Create a flex-row;
  var temp_div = create_node({ 'type': 'div',
    'className': 'flex-row_button' });
  
  // Create a flex-column;
  var temp_col1 = create_node({ 'type': 'div',
    'className': 'flex-column' });
  temp_col1.style.width = '30%';
  for (var i = 0; i < 360; i += 5) {
    var js_button = create_button_3D(i, 100, 50);
    /* var js_button = change_a(i, 0, 0, 0.6); */
    temp_col1.appendChild(js_button);
  }
  temp_div.appendChild(temp_col1);
  
  var temp_col2 = create_node({ 'type': 'div',
    'className': 'flex-column' });
  temp_col2.style.width = '30%';
  for (var i = 0; i < 260; i += 5) {
    var js_button = create_button_3D(0, i, 0, 0.6);
    temp_col2.appendChild(js_button);;
  }
  temp_div.appendChild(temp_col2);
  
  temp_col3 = create_node({ 'type': 'div',
    'className': 'flex-column' });
  temp_col3.style.width = '30%';
  for (var i = 0; i < 260; i += 5) {
    var js_button = create_button_3D(0, 0, i, 0.6);
    temp_col3.appendChild(js_button);;
  }
  temp_div.appendChild(temp_col3);
  
  main.appendChild(temp_div);
}

function create_button_gallery_hsl() {
  var last_row = document.getElementById('last_row');
  var main = document.getElementById('main');
  // Create a flex-row;
  var temp_div = create_node({ 'type': 'div',
    'className': 'button_column' });
  
  for (var i = 1; i < 361; i += 1) {
    var js_button = create_button_3D(i, 100, 50, 15);
    temp_div.appendChild(js_button);
  }
  var temp_button = create_node({ 'type': 'button',
    'className': 'button shape-rounded color-27', 'innerHTML': '27' });
  temp_div.appendChild(temp_button);
  /* last_row.insertBefore(temp_div, main); */
  last_row.appendChild(temp_div);
}

function create_button_3D(h, s, l, change) {
  var plus = (l + change);
  var minus = (l - change);
  var hsl = [h, (s + '%') , (l + '%')];
  var hsl_str = ['hsl(', hsl.join(','), ')'].join('');
  var hsl_p = [h, (s + '%') , (plus + '%')];
  var hsl_str_p = ['hsl(', hsl_p.join(','), ')'].join('');
  var hsl_m = [h, (s + '%') , (minus + '%')];
  var hsl_str_m = ['hsl(', hsl_m.join(','), ')'].join('');
  
  var temp_button = create_node({ 'type': 'button',
    'className': 'button shape-rounded', 'innerHTML': h });
  temp_button.style.height = '60px';
  temp_button.style.width = '120px';
  
  // Set the linear-gradient background;
  var bg_up = ['linear-gradient(', hsl_str, ',', hsl_str_m, ')'];
  bg_up = bg_up.join('');
  temp_button.style.background = bg_up;
  // Set the borderColor.
  temp_button.style.borderColor = hsl_str;
  
  // Set the boxShadow.
  var bx_s_up = [('0px 6px 0px ' + hsl_str_m + ','),
                 '0px 3px 15px rgba(0,0,0,0.4),',
                 'inset 0px 1px 0px rgba(255,255,255,0.3),',
                 'inset 0px 0px 3px rgba(255,255,255,0.5)'];
  
  temp_button.style.boxShadow = bx_s_up.join('');
  
  // Format the string for html.
  var bx_s_up_str = [];
  bx_s_up_str[0] = bx_s_up[0];
  bx_s_up_str[1] = '&nbsp;&nbsp&nbsp;&nbsp;' + bx_s_up[1];
  bx_s_up_str[2] = '&nbsp;&nbsp&nbsp;&nbsp;' + bx_s_up[2];
  bx_s_up_str[3] = '&nbsp;&nbsp&nbsp;&nbsp;' + bx_s_up[3];
  bx_s_up_str = bx_s_up_str.join('<br>');
  
  // Set the text color and shadow.
  temp_button.style.color = 'hsl(0, 0%, 100%)';
  temp_button.style.textShadow = '0px -1px 0px rgba(0,0,0,0.5)';
  
  // Make the button go down when clicked.
  temp_button.addEventListener('mousedown', function(event) {
    var bg_down = ['linear-gradient(', hsl_str_m, ',', hsl_str, ')'];
    bg_down = bg_down.join('');
    temp_button.style.background = bg_down;
    var bx_s_down = [('0px 2px 0px ' + hsl_str_m + ','),
                     '0px 1px 6px rgba(0,0,0,0.4),',
                     'inset 0px 1px 0px rgba(255,255,255,0.3),',
                     'inset 0px 0px 3px rgba(255,255,255,0.5)'];
    temp_button.style.boxShadow = bx_s_down.join('');
    
    // Format the string for html.
    var bx_s_down_str = [];
    bx_s_down_str[0] = bx_s_down[0];
    bx_s_down_str[1] = '&nbsp;&nbsp;&nbsp;&nbsp;' + bx_s_down[1];
    bx_s_down_str[2] = '&nbsp;&nbsp;&nbsp;&nbsp;' + bx_s_down[2];
    bx_s_down_str[3] = '&nbsp;&nbsp;&nbsp;&nbsp;' + bx_s_down[3];
    bx_s_down_str = bx_s_down_str.join('<br>');
    
    temp_button.style.transform = 'translate(0, 4px) rotateX(20deg)';
    // Add the code to element #main.
    var main = document.getElementById('main');
    main.style.backgroundColor = '#404040';
    main.style.color = '#ffffff';
    var css = [
    'r', '.', 'g', ('color-' + h), 'r', ' {', 0,
    1, 'gr', '/* main_color = ' + hsl_str + ' */', 0,
    1, 'gr', '/* Set the background-color if the browser doesn\'t support linear-gradients. */', 0,
    1, 'b', 'background-color', 'r', ': ', 'p', hsl_str, 'r', ';', 0,
    1, 'gr', '/* Top is lighter than the bottom. */', 0,
    1, 'gr', '/* linear-gradient(main_color, main_color - 15%) */', 0,
    1, 'b', 'background', 'r', ': ', 'p', bg_up, 'r', ';', 0,
    1, 'gr', '/* border-color = main_color */', 0,
    1, 'b', 'border-color', 'r', ': ', 'p', hsl_str, 'r', ';', 0,
    1, 'gr', '/* box-shadow = (main_color - 15%) */', 0,
    1, 'b', 'box-shadow', 'r', ': ', 'p', bx_s_up_str,'r', ';', 0,
    1, 'b', 'color', 'r', ': ', 'p', 'hsl(0, 0%, 100%)', 'r', ';', 0,
    1, 'b', 'text-shadow', 'r', ': ', 'p', '0px -1px 0px rgba(0,0,0,0.5)', 'r', ';', 0,
    'r', '}', 0, 0,
    'r', '.', 'g', ('color-' + h), 'r', ':', 'g', 'active', 'r', ' {', 0,
    1, 'b', 'background-color', 'r', ': ', 'p', hsl_str, 'r', ';', 0,
    1, 'gr', '/* Top is darker than the bottom. */', 0,
    1, 'gr', '/* linear-gradient(main_color - 15%, main_color) */', 0,
    1, 'b', 'background', 'r', ': ', 'p', bg_down, 'r', ';', 0,
    1, 'gr', '/* box-shadow = (main_color - 15%) */', 0,
    1, 'b', 'box-shadow', 'r', ': ', 'p', bx_s_down_str, 'r', ';', 0,
    1, 'b', 'transform', 'r', ': ', 'p', 'translate(0, 4px) rotateX(20deg)', 'r', ';', 0,
    'r', '}', 0, 0,
    'r', '.', 'g', ('color-' + h), 'r', ':', 'g', 'hover', 'r', ' {', 0,
    1, 'b', 'color', 'r', ': ', 'p', hsl_str_p, 'r', ';', 0,
    'r', '}'];
    // Clear the area where the code will be displayed.
    main.innerHTML = '';
    document.getElementById('main').appendChild(color_css_text(css));
    var css = ['<code>',
    '<span class="code_red">.</span>',
    '<span class="code_green">color-',h, '</span> ',
    '<span class="code_red">{</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* main_color = ', hsl_str, ' */</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* Set the background-color if the browser doesn\'t support ',
    'linear-gradients. */</span><br>',
    '&nbsp&nbsp<span class="code_blue">background-color</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', hsl_str, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* Top is lighter than the bottom. */</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* linear-gradient(main_color, main_color - 15%) */</span><br>',
    '&nbsp&nbsp<span class="code_blue">background</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', /* bg_up.join('') */, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* border-color = main_color */</span><br>',
    '&nbsp&nbsp<span class="code_blue">border-color</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', hsl_str, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* box-shadow = (main_color - 15%) */</span><br>',
    '&nbsp&nbsp<span class="code_blue">box-shadow</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', /* bx_s_up.join('').split('),').join('),<br>&nbsp&nbsp&nbsp&nbsp') */, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_blue">color</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">hsl(0, 0%, 100%)</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_blue">text-shadow</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple"> 0px -1px 0px rgba(0,0,0,0.5)</span>',
    '<span class="code_red">;</span><br>',
    '<span class="code_red">}</span><br><br>',
    '<span class="code_red">.</span><span class="code_green">color-', h,
    '</span><span class="code_red">:</span><span class="code_green">active</span> <span class="code_red">{</span><br>',
    '&nbsp&nbsp<span class="code_blue">background-color</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', hsl_str, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* Top is darker than the bottom. */</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* linear-gradient(main_color - 15%, main_color) */</span><br>',
    '&nbsp&nbsp<span class="code_blue">background</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', /* bg_down.join('') */, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* box-shadow = (main_color - 15%) */</span><br>',
    '&nbsp&nbsp<span class="code_blue">box-shadow</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', /* bx_s_down.join('').split('),').join('),<br>&nbsp&nbsp&nbsp&nbsp') */, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_blue">transform</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">translate(0, 4px) rotateX(20deg)</span>',
    '<span class="code_red">;</span><br>',
    '<span class="code_red">}</span><br><br>',
    '<span class="code_red">.</span><span class="code_green">color-', h,
    '</span><span class="code_red">:</span><span class="code_green">hover</span> <span class="code_red">{</span><br>',
    '&nbsp&nbsp<span class="code_blue">color</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', hsl_str_p, '</span>',
    '<span class="code_red">;</span><br>',
    '<span class="code_red">}</span></code>'];
    //main.innerHTML = css.join('');
  }, false);
  
  // Make the button go up when the click is finished.
  temp_button.addEventListener('mouseup', function(event) {
    temp_button.style.background = bg_up;
    temp_button.style.boxShadow = bx_s_up.join('');
    temp_button.style.transform = '';
  }, false);
  return temp_button;
}

function change_a(r, g, b, a) {
  var plus = (a + 0.2);
  var minus = (a - 0.2);
  var rgba = [r, g, b, a];
  var rgba_string = ['rgba(', rgba.join(','), ')'].join('');
  console.log(rgba_string);
  var rgba_p = [r, g, b, plus];
  var rgba_p_string = ['rgba(', rgba_p.join(','), ')'].join('');
  console.log(rgba_p_string);
  var rgba_m = [r, g, b, minus];
  var rgba_m_string = ['rgba(', rgba_m.join(','), ')'].join('');
  console.log(rgba_m_string);
  
  var temp_button = create_node({ 'type': 'button',
    'className': 'button shape-rounded', 'innerHTML': rgba_string });
  temp_button.style.height = '100px';
  /* temp_button.style.width = '180px'; */
  
  // Set the linear-gradient background;
  /* 'linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)' */
  var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
  temp_button.style.background = bg.join('');
  
  // Set the borderColor.
  temp_button.style.borderColor = rgba_string;
  
  // Set the boxShadow.
  var bx_s = ['0px 6px 0px ', rgba_p_string,
          ', 0px 3px 15px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
  temp_button.style.boxShadow = bx_s.join('');
  
  // Set the text color and shadow.
  temp_button.style.color = 'rgba(255, 255, 255, 1)';
  temp_button.style.textShadow = '0px -1px 0px rgba(0,0,0,0.5)';
  
  // Make the button go down when clicked.
  temp_button.addEventListener('mousedown', function(event) {
    var bg = ['linear-gradient(', rgba_string,
        ',', rgba_m_string, ')'];
    temp_button.style.background = bg.join('');
    var bx_s = ['0px 2px 0px ', rgba_p_string,
          ', 0px 1px 6px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = 'translate(0, 4px) rotateX(20deg)';
  }, false);
  
  // Make the button go up when the click is finished.
  temp_button.addEventListener('mouseup', function(event) {
    var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
    temp_button.style.background = bg.join('');
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = '';
  }, false);
  return temp_button;
}

function change_r(r, g, b, a) {
  var plus = (r + 102);
  var minus = (r - 102);
  var rgba = [r, g, b, a];
  var rgba_string = ['rgba(', rgba.join(','), ')'].join('');
  console.log(rgba_string);
  var rgba_p = [plus, g, b, a];
  var rgba_p_string = ['rgba(', rgba_p.join(','), ')'].join('');
  console.log(rgba_p_string);
  var rgba_m = [minus, g, b, a];
  var rgba_m_string = ['rgba(', rgba_m.join(','), ')'].join('');
  console.log(rgba_m_string);
  
  var temp_button = create_node({ 'type': 'button',
    'className': 'button shape-rounded', 'innerHTML': rgba_string });
  temp_button.style.height = '100px';
  /* temp_button.style.width = '180px'; */
  
  // Set the linear-gradient background;
  /* 'linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)' */
  var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
  temp_button.style.background = bg.join('');
  
  // Set the borderColor.
  temp_button.style.borderColor = rgba_string;
  
  // Set the boxShadow.
  var bx_s = ['0px 6px 0px ', rgba_p_string,
          ', 0px 3px 15px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
  temp_button.style.boxShadow = bx_s.join('');
  
  // Set the text color and shadow.
  temp_button.style.color = 'rgba(255, 255, 255, 1)';
  temp_button.style.textShadow = '0px -1px 0px rgba(0,0,0,0.5)';
  
  // Make the button go down when clicked.
  temp_button.addEventListener('mousedown', function(event) {
    var bg = ['linear-gradient(', rgba_string,
        ',', rgba_m_string, ')'];
    temp_button.style.background = bg.join('');
    var bx_s = ['0px 2px 0px ', rgba_p_string,
          ', 0px 1px 6px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = 'translate(0, 4px) rotateX(20deg)';
  }, false);
  
  // Make the button go up when the click is finished.
  temp_button.addEventListener('mouseup', function(event) {
    var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
    temp_button.style.background = bg.join('');
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = '';
  }, false);
  return temp_button;
}

function change_g(r, g, b, a) {
  var plus = (g + 102);
  var minus = (g - 102);
  var rgba = [r, g, b, a];
  var rgba_string = ['rgba(', rgba.join(','), ')'].join('');
  console.log(rgba_string);
  var rgba_p = [r, plus, b, a];
  var rgba_p_string = ['rgba(', rgba_p.join(','), ')'].join('');
  console.log(rgba_p_string);
  var rgba_m = [r, minus, b, a];
  var rgba_m_string = ['rgba(', rgba_m.join(','), ')'].join('');
  console.log(rgba_m_string);
  
  var temp_button = create_node({ 'type': 'button',
    'className': 'button shape-rounded', 'innerHTML': rgba_string });
  temp_button.style.height = '100px';
  /* temp_button.style.width = '180px'; */
  
  // Set the linear-gradient background;
  /* 'linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)' */
  var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
  temp_button.style.background = bg.join('');
  
  // Set the borderColor.
  temp_button.style.borderColor = rgba_string;
  
  // Set the boxShadow.
  var bx_s = ['0px 6px 0px ', rgba_p_string,
          ', 0px 3px 15px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
  temp_button.style.boxShadow = bx_s.join('');
  
  // Set the text color and shadow.
  temp_button.style.color = 'rgba(255, 255, 255, 1)';
  temp_button.style.textShadow = '0px -1px 0px rgba(0,0,0,0.5)';
  
  // Make the button go down when clicked.
  temp_button.addEventListener('mousedown', function(event) {
    var bg = ['linear-gradient(', rgba_string,
        ',', rgba_m_string, ')'];
    temp_button.style.background = bg.join('');
    var bx_s = ['0px 2px 0px ', rgba_p_string,
          ', 0px 1px 6px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = 'translate(0, 4px) rotateX(20deg)';
  }, false);
  
  // Make the button go up when the click is finished.
  temp_button.addEventListener('mouseup', function(event) {
    var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
    temp_button.style.background = bg.join('');
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = '';
  }, false);
  return temp_button;
}

function change_b(r, g, b, a) {
  var plus = (b + 102);
  var minus = (b - 102);
  var rgba = [r, g, b, a];
  var rgba_string = ['rgba(', rgba.join(','), ')'].join('');
  console.log(rgba_string);
  var rgba_p = [r, g, plus, a];
  var rgba_p_string = ['rgba(', rgba_p.join(','), ')'].join('');
  console.log(rgba_p_string);
  var rgba_m = [r, g, minus, a];
  var rgba_m_string = ['rgba(', rgba_m.join(','), ')'].join('');
  console.log(rgba_m_string);
  
  var temp_button = create_node({ 'type': 'button',
    'className': 'button shape-rounded', 'innerHTML': rgba_string });
  temp_button.style.height = '100px';
  /* temp_button.style.width = '180px'; */
  
  // Set the linear-gradient background;
  /* 'linear-gradient(to bottom, #33ccff 0%, #ff99cc 102%)' */
  var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
  temp_button.style.background = bg.join('');
  
  // Set the borderColor.
  temp_button.style.borderColor = rgba_string;
  
  // Set the boxShadow.
  var bx_s = ['0px 6px 0px ', rgba_p_string,
          ', 0px 3px 15px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
  temp_button.style.boxShadow = bx_s.join('');
  
  // Set the text color and shadow.
  temp_button.style.color = 'rgba(255, 255, 255, 1)';
  temp_button.style.textShadow = '0px -1px 0px rgba(0,0,0,0.5)';
  
  // Make the button go down when clicked.
  temp_button.addEventListener('mousedown', function(event) {
    var bg = ['linear-gradient(', rgba_string,
        ',', rgba_m_string, ')'];
    temp_button.style.background = bg.join('');
    var bx_s = ['0px 2px 0px ', rgba_p_string,
          ', 0px 1px 6px rgba(0,0,0,0.4),',
          'inset 0px 1px 0px rgba(255,255,255,0.3),',
          'inset 0px 0px 3px rgba(255,255,255,0.5)'];
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = 'translate(0, 4px) rotateX(20deg)';
  }, false);
  
  // Make the button go up when the click is finished.
  temp_button.addEventListener('mouseup', function(event) {
    var bg = ['linear-gradient(', rgba_m_string,
        ',', rgba_string, ')'];
    temp_button.style.background = bg.join('');
    temp_button.style.boxShadow = bx_s.join('');
    temp_button.style.transform = '';
  }, false);
  return temp_button;
}

function color_css_text(str_list) {
  var code = create_node({ 'type': 'code' });
  for (var i = 0; i < str_list.length; i++) {
    if (str_list[i] === 'b') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_blue',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'g') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_green',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'gr') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_gray',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'p') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_purple',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'r') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_red',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 0) {
      code.appendChild(create_node({ 'type': 'br' }));
    }
    if (str_list[i] === 1) {
      code.innerHTML += '&nbsp;&nbsp;';
    }
  }
  return code;
}

function color_html_text(str_list) {
  var code = create_node({ 'type': 'code' });
  for (var i = 0; i < str_list.length; i++) {
    if (str_list[i] === 'b') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_blue',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'g') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_green',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'gr') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_gray',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'p') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_purple',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'r') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_red',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 0) {
      code.appendChild(create_node({ 'type': 'br' }));
    }
    if (str_list[i] === 1) {
      code.innerHTML += '&nbsp;&nbsp;';
    }
  }
  return code;
}

function create_node(obj) {
	var element = document.createElement(obj.type);
	if (obj.alt) { element.alt = obj.alt; }
  if (obj.autofocus) { element.autofocus = obj.autofocus; }
  if (obj.backgroundImage) { element.style.backgroundImage = obj.backgroundImage; }
  if (obj.className) { element.className = obj.className; }
  if (obj.htmlFor) { element.htmlFor = obj.htmlFor; }
  if (obj.href) { element.href = obj.href; }
  if (obj.id) { element.id = obj.id; }
	if (obj.innerHTML) { element.innerHTML = obj.innerHTML; }
	if (obj.src) { element.src = obj.src; }
  if (obj.input_type) { element.type = obj.input_type; }	
	return element;
}