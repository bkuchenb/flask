// Make the menu icon display the menu when clicked.
document.getElementById('icon').addEventListener('click', function(event) {
	var menu = document.getElementById('menu');
  if (menu.style.display == '' || menu.style.display == 'none') {
    menu.style.display = 'block';
  }
  else {
    menu.style.display = 'none';
  }
}, false);

// Add an EventListener to the Home nav_link.
document.getElementById('home').addEventListener('click',
  function(event) {
	var main = document.getElementById('main');
  var message = [];
  // Clear the main element.
  main.innerHTML = message.join('');
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
  temp_button.style.background = bg_up.join('');
  // Set the borderColor.
  temp_button.style.borderColor = hsl_str;
  
  // Set the boxShadow.
  var bx_s_up = ['0px 6px 0px ', hsl_str_m,
                 ',0px 3px 15px rgba(0,0,0,0.4),',
                 'inset 0px 1px 0px rgba(255,255,255,0.3),',
                 'inset 0px 0px 3px rgba(255,255,255,0.5)'];
  temp_button.style.boxShadow = bx_s_up.join('');
  
  // Set the text color and shadow.
  temp_button.style.color = 'hsl(0, 0%, 100%)';
  temp_button.style.textShadow = '0px -1px 0px rgba(0,0,0,0.5)';
  
  // Make the button go down when clicked.
  temp_button.addEventListener('mousedown', function(event) {
    var bg_down = ['linear-gradient(', hsl_str_m, ',', hsl_str, ')'];
    temp_button.style.background = bg_down.join('');
    var bx_s_down = ['0px 2px 0px ', hsl_str_m,
                     ',0px 1px 6px rgba(0,0,0,0.4),',
                     'inset 0px 1px 0px rgba(255,255,255,0.3),',
                     'inset 0px 0px 3px rgba(255,255,255,0.5)'];
    temp_button.style.boxShadow = bx_s_down.join('');
    temp_button.style.transform = 'translate(0, 4px) rotateX(20deg)';
    // Add the code to element #main.
    var main = document.getElementById('main');
    main.style.backgroundColor = '#404040';
    main.style.color = '#ffffff';
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
    '<span class="code_purple">', bg_up.join(''), '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* border-color = main_color */</span><br>',
    '&nbsp&nbsp<span class="code_blue">border-color</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', hsl_str, '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* box-shadow = (main_color - 15%) */</span><br>',
    '&nbsp&nbsp<span class="code_blue">box-shadow</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">',bx_s_up.join('').split('),').join('),<br>&nbsp&nbsp&nbsp&nbsp'), '</span>',
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
    '<span class="code_purple">', bg_down.join(''), '</span>',
    '<span class="code_red">;</span><br>',
    '&nbsp&nbsp<span class="code_gray">/* box-shadow = (main_color - 15%) */</span><br>',
    '&nbsp&nbsp<span class="code_blue">box-shadow</span>',
    '<span class="code_red">:</span> ',
    '<span class="code_purple">', bx_s_down.join('').split('),').join('),<br>&nbsp&nbsp&nbsp&nbsp'), '</span>',
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
    main.innerHTML = css.join('');
  }, false);
  
  // Make the button go up when the click is finished.
  temp_button.addEventListener('mouseup', function(event) {
    temp_button.style.background = bg_up.join('');
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

/* // Add an event listener to the Overstock button.
document.getElementById('btn_overstock').addEventListener('click', function(event){
	event.preventDefault();
	// Set the mode.
	mode = 'overstock';
	var table_header = document.getElementById('main__table-header');
	if (table_header) {
		table_header.parentElement.removeChild(table_header);
	}
	// Clear the main and add the sport buttons.
	document.getElementById('main').innerHTML = '';
	create_buttons_sport();
}, false);

// Add and event listener for the Download Inventory button.
document.getElementById('btn_download-inventory').addEventListener('click', function(event){
	event.preventDefault();
	// Make sure the display area is the right height.
	var display = document.getElementById('main__display');
	display.className = 'main__display main__display_tall';
	// Clear the display areas.
	var temp_div = document.getElementById('main__table-header');
	if(temp_div){
		temp_div.innerHTML = '';
		temp_div.className = '';
	}
	display.innerHTML = '';
	document.getElementById('feedback').innerHTML = '';
	document.getElementById('navbar').innerHTML = '';
	// Reset the current_record global.
	current_record = 1;
	// Create the year buttons to allow the user to choose the year.
	cr_btns_year();
	// Set the mode to inventory.
	mode = 'inventory';
}, false);

// Add and event listener for the Newly Added button.
document.getElementById('btn_newly-added').addEventListener('click', function(event){
	event.preventDefault();
	// Clear the display areas.
	var temp_div = document.getElementById('main__table-header');
	if(temp_div){
		temp_div.innerHTML = '';
		temp_div.className = '';
	}
	document.getElementById('main__display').innerHTML = '';
	document.getElementById('feedback').innerHTML = '';
	document.getElementById('navbar').innerHTML = '';
	// Reset the current_record global.
	current_record = 1;
}, false);

// Add and event listener for the Sales Tax button.
document.getElementById('btn_sales-tax').addEventListener('click', function(event){
	event.preventDefault();
	// Make sure the display area is the right height.
	var display = document.getElementById('main__display');
	display.className = 'main__display main__display_tall';
	// Clear the display areas.
	var temp_div = document.getElementById('main__table-header');
	if(temp_div){
		temp_div.innerHTML = '';
		temp_div.className = '';
	}
	var display = document.getElementById('main__display');
	display.innerHTML = '';
	document.getElementById('feedback').innerHTML = '';
	document.getElementById('navbar').innerHTML = '';
	
	// Create a user message.
	var message = document.createElement('p');
	message.className = 'display__p';
	message.innerHTML = 'Select a dange range to calculate sales tax.';
	
	// Create two inputs to allow the user to choose dates.
	var new_date = new Date();
	var date_start_label = document.createElement('label');
	date_start_label.className = 'display__label';
	date_start_label.htmlFor = 'date_start';
	date_start_label.innerHTML = 'From:';
	var date_start = document.createElement('input');
	date_start.id = 'date_start';
	date_start.type = 'date';
	new_date.setDate(new_date.getDate() - 7);
	var value = new_date.getFullYear() + '-' +
		(parseInt(new_date.getMonth()) + 1) + '-' +
		new_date.getDate()
	date_start.value = value;
		
	var date_end_label = document.createElement('label');
	date_end_label.className = 'display__label';
	date_end_label.htmlFor = 'date_end';
	date_end_label.innerHTML = 'To:';
	var date_end = document.createElement('input');
	date_end.id = 'date_end';
	date_end.type = 'date';
	new_date.setDate(new_date.getDate() + 6);
	value = new_date.getFullYear() + '-' +
		(parseInt(new_date.getMonth()) + 1) + '-' +
		new_date.getDate()
	date_end.value = value;
	
	var temp_btn = document.createElement('button');
	temp_btn.id = 'submit_sales_tax';
	temp_btn.className = 'display__submit_display-block';
	temp_btn.innerHTML = 'Submit';
	
	display.appendChild(message);
	display.appendChild(date_start_label);
	display.appendChild(date_start);
	display.appendChild(date_end_label);
	display.appendChild(date_end);
	display.appendChild(temp_btn);
}, false);

// Add an event listener to the Sets button.
document.getElementById('btn_sets').addEventListener('click', function(event){
	event.preventDefault();
	// Set the mode.
	mode = 'sets';
	var table_header = document.getElementById('main__table-header');
	if(table_header){
		table_header.parentElement.removeChild(table_header);
	}
	// Make sure the display area is the right height.
	var display = document.getElementById('main__display');
	display.className = 'main__display main__display_tall';
	// Clear the display and add the year buttons.
	display.innerHTML = '';
	cr_btns_year();
}, false);

// Create the sport buttons.
create_buttons_sport();

function cL_btn_letter(btn_temp) {
	btn_temp.addEventListener('click', function(event) {
		event.preventDefault();
    var main = document.getElementById('main');
    var navbar = document.getElementById('navbar');
		// Save the name of the chosen letter.
		letter = btn_temp.innerHTML;
		// Update the navbar.
    temp_a = create_node({ 'type': 'a', 'id': 'link_letter', 'innerHTML': letter });
    temp_a.addEventListener('click', function(event) {
      // Clear the buttons.
      main.innerHTML = '';
      // Create the letter buttons to allow the user to re-choose the letter.
			create_buttons_letter();
      letter = '';
      // Remove the link_letter.
      navbar.removeChild(document.getElementById('link_letter'));			
		}, false);
    navbar.appendChild(temp_a);
		// Clear the buttons.
		main.innerHTML = '';
		var column_names = ['Year', 'Set', 'Location', 'Sales'];
		// Create the tables needed to display the set data.
		cr_layout_tcf(column_names);
		// Get the sets that that correspond to the chosen buttons.
		get_set_list();
	}, false);
}

function cL_btn_page(btn_temp) {
	btn_temp.addEventListener('click', function(event){
		event.preventDefault();
		// Save the page number.
		page = btn_temp.innerHTML;
		current_record = (parseInt(page) * 100) - 99;
		document.body.style.cursor = 'wait';
		search_for_page(page);
		btn_temp.className += ' btn_hidden';
	}, false);
}

function cL_btn_sales(btn_temp) {
	btn_temp.addEventListener('click', function(event){
		event.preventDefault();
		// Get the set_name from column 1.
		var row_num = btn_temp.id.replace('btn_sales', '');
		var row = document.getElementById('tbody_tr' + row_num);
		var cells = row.getElementsByClassName('td td1');
		temp_obj = {'category': sport, 'set_year': year,
		'set_name': cells[0].innerHTML};
		get_set_sales(temp_obj, btn_temp.id);
	}, false);
}

function cL_btn_sport(btn_temp) {
	btn_temp.addEventListener('click', function(event) {
		event.preventDefault();
    var main = document.getElementById('main');
    var navbar = document.getElementById('navbar');
		// Save the name of the chosen sport.
		sport = btn_temp.innerHTML;
		// Update the navbar.
    temp_a = create_node({ 'type': 'a', 'id': 'link_sport', 'innerHTML': sport });
    temp_a.addEventListener('click', function(event) {
      // Clear the buttons.
      main.innerHTML = '';
      create_buttons_sport();
      sport = '';
      // Remove the link_sport.
      navbar.removeChild(document.getElementById('link_sport'));
      if (document.getElementById('link_year')) {
        navbar.removeChild(document.getElementById('link_year'));
        year = '';
      }
      if (document.getElementById('link_letter')) {
        navbar.removeChild(document.getElementById('link_letter'));
        letter = '';
      }
    }, false);
		navbar.appendChild(temp_a);
		// Clear the buttons.
		main.innerHTML = '';
		// Create the year buttons.
		create_buttons_year();
	}, false);
}

function cL_btn_year(btn_temp) {
	btn_temp.addEventListener('click', function(event) {
		event.preventDefault();
    var main = document.getElementById('main');
    var navbar = document.getElementById('navbar');
		// Save the name of the chosen year.
		year = btn_temp.innerHTML;
		// Check to see if the mode is inventory.
		if (mode == 'inventory') {
			// Get the number of cards listed on beckett for the search term.
			search_dealer_home(1);
		}
		else if (mode == 'sets') {
			cr_loader();
			// Get the number of cards  in the database for that year.
			get_set_totals();
		}
		else {
			// Update the navbar.
      temp_a = create_node({ 'type': 'a', 'id': 'link_year', 'innerHTML': year });
			navbar.appendChild(temp_a);
			temp_a.addEventListener('click', function(event) {
				// Clear the buttons.
				document.getElementById('main').innerHTML = '';
				// Create the year buttons to allow the user to re-choose the year.
				create_buttons_year();
        year = '';
        // Remove the link_year.
        navbar.removeChild(document.getElementById('link_year'));
        if (document.getElementById('link_letter')) {
          navbar.removeChild(document.getElementById('link_letter'));
          letter = '';
        }
			}, false);
			// Clear the buttons.
			document.getElementById('main').innerHTML = '';
			// Create the letter buttons.
			create_buttons_letter();
		}
	}, false);
}

function create_buttons_letter() {
	var btn_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
	                'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                  'Y', 'Z'];
	var temp_div = document.createElement('div');
  temp_div.id = 'wrapper_letter';
	for (var i = 0; i < btn_list.length; i++) {
		var btn_temp = document.createElement('button');
		// Add an action listener to each button.
		cL_btn_letter(btn_temp);
		btn_temp.className = 'button button-green button-letter';
		btn_temp.innerHTML = btn_list[i];
		// Add the button to the main div.
    temp_div.appendChild(btn_temp);
	}
  document.getElementById('main').appendChild(temp_div);
}

function cr_btns_page(temp_obj) {
	// Save the total records in the global variable.
	total_records = response.records
	// Display the results in the navbar.
	var navbar = document.getElementById('navbar');
	navbar.innerHTML = '';
	navbar.innerHTML = 'There are ' + total_records + ' records for ' + year + '.';
	var display = document.getElementById('main__display');
	// Remove the loader.
	display.innerHTML = '';
	var row = 0;
	var div_temp = '';
	for(var i = 0; i < Math.ceil(temp_obj.records/100, -1); i++){
		// Stop the loop at 100 if there are more than 10,000 records.
		if(i == 100){
			break;
		}
		var btn_temp = document.createElement('button');
		btn_temp.id = 'page_button_' + (i + 1);
		btn_temp.className = 'button button-page button-green';
		btn_temp.innerHTML = i + 1;
		// Add a listener to each button.
		cL_btn_page(btn_temp);
		// Create a new row after 10 buttons are created.
		if(i % 10 == 0){
			// Create a new row.
			div_temp = document.createElement('div');
			div_temp.id = 'btn_row_' + row;
			div_temp.className = 'div_btn_page';
			row++;
			// Add the button to the row.
			div_temp.appendChild(btn_temp);
			// Add the row to the center div.
			display.appendChild(div_temp);
		}
		else{
			//Add the button to the row.
			div_temp.appendChild(btn_temp);
		}
	}	
}

function cr_btns_sales() {
	// Get all the td elements in the last column.
	var td_list = document.getElementsByClassName('td3');
	// Add a button to the cells.
	for(var i = 0; i < td_list.length; i++){
		var temp_btn = document.createElement('button');
		temp_btn.id = 'btn_sales' + i;
		temp_btn.className = 'btn_sales';
		temp_btn.innerHTML = 'Sales';
		cL_btn_sales(temp_btn);
		td_list[i].appendChild(temp_btn);
	}
}

function create_buttons_sport() {
	var btn_list = ['Baseball', 'Football', 'Basketball', 'Hockey',
						      'Nonsports', 'Multisport', 'Racing', 'Wrestling',
						      'Soccer', 'Golf', 'Magic', 'YuGiOh',
						      'Pokemon', 'Gaming', 'Diecast'];
  var temp_div = document.createElement('div');
  temp_div.id = 'wrapper_sport';
	for (var i = 0; i < btn_list.length; i++) {
		var btn_temp = document.createElement('button');
		btn_temp.className = 'button button-green button-sport';
		btn_temp.innerHTML = btn_list[i];
		// Add a listener to each button.
		cL_btn_sport(btn_temp);
    // Add the button to the main div.
    temp_div.appendChild(btn_temp);
  }
  document.getElementById('main').appendChild(temp_div);
}

function create_buttons_year() {
	var row = 0;
	var temp_div = document.createElement('div');
  temp_div.id = 'wrapper_year';
	for(var i = 1930; i < 2020; i++) {
		var btn_temp = document.createElement('button');
		// Add a listener to each button.
		cL_btn_year(btn_temp);
		btn_temp.className = 'button button-green button-year';
		btn_temp.innerHTML = i;
		// Add the button to the main div.
    temp_div.appendChild(btn_temp);
	}
  document.getElementById('main').appendChild(temp_div);
}

function cr_layout_tcf(column_names) {
	// Reset the global row_num variable.
	row_num = 0;
	//Clear the area where two tables will go.
	var table_header = document.createElement('div');
	table_header.id = 'main__table-header';
	table_header.className = 'main__table-header';
	var display = document.getElementById('main__display');
	display.className = 'main__display main__display_short';
	display.innerHTML = '';
	//Create table1.
	var temp_div_table = document.createElement('div');
	temp_div_table.id = 'table1';
	temp_div_table.className = 'table';
	var temp_div_thead = document.createElement('div');
	temp_div_thead.id = 'thead';
	var temp_div_tr = document.createElement('div');
	temp_div_tr.id = 'thead_tr';
	temp_div_tr.className = 'tr';
	//Create the cells for the thead_row.
	for(var i = 0; i < column_names.length; i++){
		var temp_div_th = document.createElement('div');
		temp_div_th.id = 'th' + i;
		temp_div_th.className = 'th';
		temp_div_th.innerHTML = column_names[i];
		temp_div_tr.appendChild(temp_div_th);
	}
	//Add the elements to the layout.
	temp_div_thead.appendChild(temp_div_tr);
	temp_div_table.appendChild(temp_div_thead);
	table_header.appendChild(temp_div_table);
	document.getElementById('main').insertBefore(table_header, main__display);
	
	//Create table2.
	var temp_div_table = document.createElement('div');
	temp_div_table.id = 'table2';
	temp_div_table.className = 'table';
	var temp_div_tbody = document.createElement('div');
	temp_div_tbody.id = 'tbody';
	//Add the elements to the layout.
	temp_div_table.appendChild(temp_div_tbody);
	display.appendChild(temp_div_table);
}

function cr_navbar_list() {
	// Clear the navbar.
	document.getElementById('navbar').innerHTML = '';
	var id_list = ['link_sport', 'link_year', 'link_letter',
	'link_set'];
	var temp_ul = document.createElement('ul');
	temp_ul.className = 'navbar__ul';
	for(var i = 0; i < id_list.length; i++){
		var temp_li = document.createElement('li');
		temp_li.className = 'navbar_li';
		var temp_a = document.createElement('a');
		temp_a.id = id_list[i];
		temp_li.appendChild(temp_a);
		temp_ul.appendChild(temp_li);
	}
	navbar.appendChild(temp_ul);
}

function cr_loader() {
	// Clear the buttons.
	var display = document.getElementById('main__display');
	display.innerHTML = '';
	// Create the loader.
	var temp_div = document.createElement('div');
	temp_div.id = 'loader';
	temp_div.className = 'loader';
	display.appendChild(temp_div);
}

function cr_row_tcf(temp_list) {
	//Create a new row.
	var temp_div_tr = document.createElement('div');
	temp_div_tr.id = 'tbody_tr' + row_num;
	temp_div_tr.className = 'tr tbody_tr';
	//Create the cells for the tbody_tr.
	for(var i = 0; i < temp_list.length + 1; i++){
		//Create the cell.
		var temp_div_td = document.createElement('div');
		if(i != 3){
			temp_div_td.className = 'td td' + i;
			temp_div_td.innerHTML = temp_list[i];
		}
		else{
			temp_div_td.className = 'td' + i;
		}
		//Add the cell to the row.
		temp_div_tr.appendChild(temp_div_td);
	}
	//Add the row to table2.
	document.getElementById('tbody').appendChild(temp_div_tr);
	//Update the row number.
	row_num++;
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

function display_result(response) {
	// Get the display area.
	var feedback = document.getElementById('feedback');
	// Create a p element and display the card just added.
	var temp_p = document.createElement('p');
	temp_p.id = 'p' + current_record;
	temp_p.className = 'card_name';
	if(response.hasOwnProperty('error')){
		temp_p.innerHTML = response.error;
	}
	else{
		temp_p.innerHTML = 'Card ' + current_record + ' of ' + total_records;
	}
	// Get the first p element.
	var top = document.getElementById('p' + (current_record - 1));
	feedback.insertBefore(temp_p, top);
	current_record++;
	// Reset the cursor when the page is finished.
	if(current_record > total_records || (current_record - 1) % 100 == 0){
		document.body.style.cursor = 'default';
		// Move to the next page.
		var next_page_id = 'page_button_' + (parseInt(page) + 1);
		var next_button = document.getElementById(next_page_id);
		if(next_button){
			var event = new Event('click');
			next_button.dispatchEvent(event);
		}
	}
}

function display_set_totals(response) {
	// Get the display area.
	var feedback = document.getElementById('feedback');
	// Create a p element and display the card just added.
	var temp_p = document.createElement('p');
	temp_p.className = 'set_total';
	temp_p.innerHTML = year + ': ' + response.total + ' records.';
	feedback.appendChild(temp_p);
	document.getElementById('main__display').innerHTML = '';
}

function search_dealer_home() {
	// Show the loader while the server is working.
	cr_loader();
	var xhttp = new XMLHttpRequest();
	var post_data = 'year=' + year + '&page=' + page;
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			//Get the number of pages for the search term.
			response = JSON.parse(xhttp.responseText);
			cr_btns_page(response);
		}
	}
	xhttp.open("POST", "/search_dealer_home", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(post_data);
}

function search_for_page(pg) {
	var xhttp = new XMLHttpRequest();
	var post_data = 'year=' + year + '&page=' + pg;
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			//Get the number of pages for the search term.
			response = JSON.parse(xhttp.responseText);
			// Clear the display area.
			var feedback = document.getElementById('feedback');
			feedback.innerHTML = '';
			// Add each card name to the display area after it's processed.
			for(var i = 0; i < response.length; i++){
				search_for_record(response[i]);
			}
		}
	}
	xhttp.open("POST", "/search_for_page", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(post_data);
}

function search_for_record(record) {
	var xhttp = new XMLHttpRequest();
	var post_data = record
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			//Get the number of pages for the search term.
			response = JSON.parse(xhttp.responseText);
			display_result(response);
		}
	}
	xhttp.open("POST", "/search_for_record", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(post_data));
}

function get_set_list() {
	var xhttp = new XMLHttpRequest();
	var post_data = 'category=' + sport + '&year=' + year + '&letter=' + letter;
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			// Get the set list with sales totals.
			var json_list = JSON.parse(xhttp.responseText);
			// Display the results.
			for(var i = 0; i < json_list.length; i++){
				var temp_list = [json_list[i]['set_year'],
				json_list[i]['set_name'], json_list[i]['location']]
				cr_row_tcf(temp_list);
			}
			// Add buttons that will get sales data.
			cr_btns_sales();
		}
	}
	xhttp.open("POST", "/set_list", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(post_data);
}

function get_set_totals() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			//Get the number of pages for the search term.
			response = JSON.parse(xhttp.responseText);
			console.log(response);
			display_set_totals(response);
		}
	}
	xhttp.open("POST", "/get_set_totals", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify({'year': year}));
}

function get_set_sales(post_data, btn_id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			// Get the set list with sales totals.
			var json_list = JSON.parse(xhttp.responseText);
			console.log(json_list[0]['total']);
			var temp_div = document.getElementById(btn_id).parentElement;
			temp_div.className = temp_div.className + ' background-border';
			temp_div.innerHTML = json_list[0]['total'];
		}
	}
	xhttp.open("POST", "/get_set_sales", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(post_data));
}

function create_table(parent_node_id, column_names, json_list, json_list_keys) {
	//Clear the area where the table will go.
	var parent_node = document.getElementById(parent_node_id);
	parent_node.innerHTML = '';
	//Create a table with and associated elements.
	var temp_table = document.createElement('table');
	temp_table.id = 'table_1';
	temp_table.className = 'table_1';
	var temp_thead = document.createElement('thead');
	var temp_row = document.createElement('tr');
	temp_row.id = 'thead_row';
	temp_row.className = 'thead_row';
	//Create the th cells for the thead_row.
	for(var i = 0; i < column_names.length; i++){
		var temp_th = document.createElement('th');
		temp_th.innerHTML = column_names[i];
		temp_th.className = 'th_' + i;
		temp_row.appendChild(temp_th);
	}
	//Add the thead elements to table.
	temp_thead.appendChild(temp_row);
	temp_table.appendChild(temp_thead);
	var temp_tbody = document.createElement('tbody');
	//Create a new row for each entry in the json_list.
	for(var i = 0; i < json_list.length; i++){
		var temp_row = document.createElement('tr');
		temp_row.id = 'tbody_row_' + i
		temp_row.className = 'tbody_row';
		//Create alternate striping for the rows.
		if (!(i % 2 === 0)){
			temp_row.style.backgroundColor = '#D3D3D3';
		}
		//Create cells for the row and populate with the data.
		for(var j = 0; j < json_list_keys.length; j++){
			var temp_td = document.createElement('td');
			temp_th.className = 'td_' + j;
			temp_td.innerHTML = json_list[i][json_list_keys[j]];
			temp_row.appendChild(temp_td);
		}
		temp_tbody.appendChild(temp_row);
	}
	//Add the tbody element to the table.
	temp_table.appendChild(temp_tbody);
	//Add the table to the parent_node.
	parent_node.appendChild(temp_table);
} */