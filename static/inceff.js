// Make the menu icon display the menu when clicked.
var icon = document.getElementById('icon');
icon.addEventListener('click', clicked_icon, false);

// Add an EventListener to the Home nav_link.
var home = document.getElementById('home');
home.addEventListener('click', clicked_nav_link_home, false);

// Add an EventListener to the 3D Button Gallery nav_link.
var temp_btn = document.getElementById('button_gallery');
temp_btn.addEventListener('click', clicked_nav_link_gallery, false);

// Add an EventListener to the 3D Magic Button nav_link.
temp_btn = document.getElementById('button_magic');
temp_btn.addEventListener('click', clicked_nav_link_magic, false);

function change_button() {
  // Get the value of each slider from the label.
  var label_h = document.getElementById('label_h');
  var label_s = document.getElementById('label_s');
  var label_l = document.getElementById('label_l');
  var label_c = document.getElementById('label_c');
  var h = label_h.innerHTML.replace('Hue: ', '');
  var s = label_s.innerHTML.replace('Saturation: ', '').replace('%', '');
  var l = label_l.innerHTML.replace('Light: ', '').replace('%', '');
  var change = label_c.innerHTML.replace('Gradient: ', '').replace('%', '');

  // Force the light value to remain between 0 and 100;
  if (parseInt(l) + parseInt(change) > 100) {
    if (this.id === 'range_l') {
      change = 100 - parseInt(this.value);
      label_c.innerHTML = ('Gradient: ' + change + '%');
    }
    if (this.id === 'range_c') {
      l = 100 - parseInt(this.value);
      label_l.innerHTML = ('Light: ' + l + '%');
    }
  }
  if (parseInt(l) - parseInt(change) < 0) {
    if (this.id === 'range_l') {
      change = parseInt(this.value);
      label_c.innerHTML = ('Gradient: ' + change + '%');
    }
    if (this.id === 'range_c') {
      l = parseInt(this.value);
      label_l.innerHTML = ('Light: ' + l + '%');
    }
  }
  var hsl = ['h:', h, 's:', s, 'l:', l, 'change:', change];
  console.log(hsl.join(' '));
  // Remove the current button and create a new one based on slider values.
  var temp_div = document.getElementsByClassName('flex_column');
  var current_btn = document.getElementsByClassName('button_gallery');
  temp_div[0].removeChild(current_btn[0]);
  
  if (this.id === 'range_h') {
    label_h.innerHTML = ('Hue: ' + this.value);
    var new_btn = create_button_3D(this.value, s, l, change);
  }
  if (this.id === 'range_s') {
    label_s.innerHTML = ('Saturation: ' + this.value + '%');
    var new_btn = create_button_3D(h, this.value, l, change);
  }
  if (this.id === 'range_l') {
    label_l.innerHTML = ('Light: ' + this.value + '%');
    var new_btn = create_button_3D(h, s, this.value, change);
  }
  if (this.id === 'range_c') {
    label_c.innerHTML = ('Gradient: ' + this.value + '%');
    var new_btn = create_button_3D(h, s, l, this.value);
  }
  temp_div[0].insertBefore(new_btn, temp_div[0].firstChild);
}

function clicked_button_3D(temp_button, bg_down, bx_s_down, json) {
    temp_button.style.background = bg_down;
    temp_button.style.boxShadow = bx_s_down.join('');    
    temp_button.style.transform = 'translate(0, 4px) rotateX(20deg)';
    // Create and display the css for the button.
    create_css_3D_button(json);
}

function released_button_3D(temp_button, bg_up, bx_s_up) {
    temp_button.style.background = bg_up;
    temp_button.style.boxShadow = bx_s_up.join('');
    temp_button.style.transform = '';
}

function clicked_icon() {
	var menu = document.getElementById('menu');
  if (menu.style.display == '' || menu.style.display == 'none') {
    menu.style.display = 'block';
  }
  else {
    menu.style.display = 'none';
  }
}

function clicked_nav_link(nav_link, message) {
  var main = document.getElementById('main');
  main.innerHTML = message.join('');
  main.style.backgroundColor = 'transparent';
  main.style.color = 'black';
  var active = document.getElementsByClassName('nav_link_active');
  if (active.length > 0) { active[0].classList.toggle('nav_link_active'); }
  // Remove all last_row childNodes except the #menu and #main.
  var last_row = document.getElementById('last_row');
  var div_list = last_row.getElementsByTagName('div');
  if (div_list.length > 0) {
    last_row.removeChild(div_list[0]);
  }
}

function clicked_nav_link_gallery() {
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
  clicked_nav_link(this, message);
  this.classList.toggle('nav_link_active');
  
  // Create the button gallery.
  var last_row = document.getElementById('last_row');
  // Create a flex-row to hold the buttons;
  var temp_div = create_node({ 'type': 'div',
    'className': 'button_column' });
  //Create a button for each of the 360 hue values.
  for (var i = 1; i < 361; i += 1) {
    var js_button = create_button_3D(i, 100, 50, 15);
    temp_div.appendChild(js_button);
  }
  last_row.appendChild(temp_div);
}

function clicked_nav_link_magic() {
    var message = ['I created this button after reading about inputs ',
        'with type="range".'];
    clicked_nav_link(this, message);
    // Change the color to indicate this is the active link.
    this.classList.toggle('nav_link_active');
    
    var last_row = document.getElementById('last_row');
    // Create a flex-row to hold the buttons;
    var temp_div = create_node({ 'type': 'div',
      'className': 'flex_column' });
    //Create a button.
    var js_button = create_button_3D(180, 100, 50, 15);
    temp_div.appendChild(js_button);
    var temp_list = [
      { 'id': 'h', 'innerHTML': 'Hue: 180',
        'max': 360, 'min': 1 },
      { 'id': 's', 'innerHTML': 'Saturation: 100%',
        'max': 100, 'min': 0 },
      { 'id': 'l', 'innerHTML': 'Light: 50%',
        'max': 100, 'min': 0 },
      { 'id': 'c', 'innerHTML': 'Gradient: 15%',
        'max': 100, 'min': 0 }
    ];
    
    for (var i = 0; i < temp_list.length; i++) {
      var temp_p = create_node({ 'type': 'p' });
      var temp_label = create_node({ 'type': 'label',
        'htmlFor': ('range_' + temp_list[i].id),
        'id': ('label_' + temp_list[i].id),
        'className': 'label_range', 'innerHTML': temp_list[i].innerHTML });
      var temp_input = create_node({ 'type': 'input',
        'id': ('range_' + temp_list[i].id),
        'className': 'range', 'input_type': 'range', 'max': temp_list[i].max,
        'min': temp_list[i].min, 'value': temp_list[i].value});
      temp_input.oninput = change_button;
      temp_p.appendChild(temp_label);
      temp_p.appendChild(temp_input);
      temp_div.appendChild(temp_p);
    }
    
    last_row.appendChild(temp_div);
}

function clicked_nav_link_home() {
  // Reset the main element and nav_link colors.
  var message = [];
  clicked_nav_link(this, message);
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
    if (str_list[i] === 'g') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_green',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'r') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_red',
      'innerHTML': str_list[i + 1] }));
    }
    if (str_list[i] === 'y') {
      code.appendChild(create_node({ 'type': 'span', 'className': 'code_yellow',
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

function create_button_3D(h, s, l, change) {
    var plus = (parseInt(l) + parseInt(change));
    var minus = (parseInt(l) - parseInt(change));
    var hsl = [h, (s + '%') , (l + '%')];
    var hsl_str = ['hsl(', hsl.join(','), ')'].join('');
    var hsl_p = [h, (s + '%') , (plus + '%')];
    var hsl_str_p = ['hsl(', hsl_p.join(','), ')'].join('');
    var hsl_m = [h, (s + '%') , (minus + '%')];
    var hsl_str_m = ['hsl(', hsl_m.join(','), ')'].join('');
    // Create the linear-gradients for the different states.
    var bg_up = ('linear-gradient(' + hsl_str + ',' + hsl_str_m + ')');
    var bg_down = ('linear-gradient(' + hsl_str_m + ',' + hsl_str + ')');
    
    // Create the box-shadows for the different states.
    var bx_s_up = [('0px 6px 0px ' + hsl_str_m + ','),
                    '0px 3px 15px rgba(0,0,0,0.4),',
                    'inset 0px 1px 0px rgba(255,255,255,0.3),',
                    'inset 0px 0px 3px rgba(255,255,255,0.5)'];
    var bx_s_down = [('0px 2px 0px ' + hsl_str_m + ','),
                      '0px 1px 6px rgba(0,0,0,0.4),',
                      'inset 0px 1px 0px rgba(255,255,255,0.3),',
                      'inset 0px 0px 3px rgba(255,255,255,0.5)'];
                       
    // Create an object with all local variables.
    var json = {'h': h, 'hsl_str': hsl_str, 'hsl_str_p': hsl_str_p,
        'hsl_str_m': hsl_str_m, 'bg_up': bg_up, 'bg_down': bg_down,
        'bx_s_up': bx_s_up, 'bx_s_down': bx_s_down}
    
    var temp_button = create_node({ 'type': 'button', 'id': ('btn' + h),
        'className': 'button_gallery', 'innerHTML': h });
    // Set the background to a linear-gradient;
    temp_button.style.background = bg_up;
    // Set the border-color, box-shadow, text color, and text shadow.
    temp_button.style.borderColor = hsl_str;  
    temp_button.style.boxShadow = bx_s_up.join(''); 
    temp_button.style.color = 'hsl(0, 0%, 100%)';
    temp_button.style.textShadow = '0px -1px 0px rgba(0,0,0,0.5)';
    
    // Make the button go down when clicked.
    temp_button.addEventListener('mousedown',
        clicked_button_3D.bind(null, temp_button, bg_down, bx_s_down, json),
        false);
        
    // Make the button go up when the click is finished.
    temp_button.addEventListener('mouseup',
        released_button_3D.bind(null, temp_button, bg_up, bx_s_up), false);

    return temp_button;
}

function create_css_3D_button(json) {
    // Format the box-shadows for html.
    var temp_up = [];
    temp_up.push(json['bx_s_up'][0]);
    temp_up.push('&nbsp;&nbsp&nbsp;&nbsp;' + json['bx_s_up'][1]);
    temp_up.push('&nbsp;&nbsp&nbsp;&nbsp;' + json['bx_s_up'][2]);
    temp_up.push('&nbsp;&nbsp&nbsp;&nbsp;' + json['bx_s_up'][3]);
    temp_up = temp_up.join('<br>');

    var temp_down = [];
    temp_down.push(json['bx_s_down'][0]);
    temp_down.push('&nbsp;&nbsp;&nbsp;&nbsp;' + json['bx_s_down'][1]);
    temp_down.push('&nbsp;&nbsp;&nbsp;&nbsp;' + json['bx_s_down'][2]);
    temp_down.push('&nbsp;&nbsp;&nbsp;&nbsp;' + json['bx_s_down'][3]);
    temp_down = temp_down.join('<br>');
    
    var css = [
    'r', '.', 'g', ('color-' + json['h']), 'r', ' {', 0,
    1, 'gr', '/* main_color = ' + json['hsl_str'] + ' */', 0,
    1, 'gr', '/* Set the background-color if the browser doesn\'t support linear-gradients. */', 0,
    1, 'b', 'background-color', 'r', ': ', 'p', json['hsl_str'], 'r', ';', 0,
    1, 'gr', '/* Top is lighter than the bottom. */', 0,
    1, 'gr', '/* linear-gradient(main_color, main_color - 15%) */', 0,
    1, 'b', 'background', 'r', ': ', 'p', json['bg_up'], 'r', ';', 0,
    1, 'gr', '/* border-color = main_color */', 0,
    1, 'b', 'border-color', 'r', ': ', 'p', json['hsl_str'], 'r', ';', 0,
    1, 'gr', '/* box-shadow = (main_color - 15%) */', 0,
    1, 'b', 'box-shadow', 'r', ': ', 'p', temp_up,'r', ';', 0,
    1, 'b', 'color', 'r', ': ', 'p', 'hsl(0, 0%, 100%)', 'r', ';', 0,
    1, 'b', 'text-shadow', 'r', ': ', 'p', '0px -1px 0px rgba(0,0,0,0.5)', 'r', ';', 0,
    'r', '}', 0, 0,
    'r', '.', 'g', ('color-' + json['h']), 'r', ':', 'g', 'active', 'r', ' {', 0,
    1, 'b', 'background-color', 'r', ': ', 'p', json['hsl_str'], 'r', ';', 0,
    1, 'gr', '/* Top is darker than the bottom. */', 0,
    1, 'gr', '/* linear-gradient(main_color - 15%, main_color) */', 0,
    1, 'b', 'background', 'r', ': ', 'p', json['bg_down'], 'r', ';', 0,
    1, 'gr', '/* box-shadow = (main_color - 15%) */', 0,
    1, 'b', 'box-shadow', 'r', ': ', 'p', temp_down, 'r', ';', 0,
    1, 'b', 'transform', 'r', ': ', 'p', 'translate(0, 4px) rotateX(20deg)', 'r', ';', 0,
    'r', '}', 0, 0,
    'r', '.', 'g', ('color-' + json['h']), 'r', ':', 'g', 'hover', 'r', ' {', 0,
    1, 'b', 'color', 'r', ': ', 'p', json['hsl_str_p'], 'r', ';', 0,
    'r', '}'];
    
    // Add the code to element #main.
    var main = document.getElementById('main');
    main.style.backgroundColor = '#404040';
    main.style.color = '#ffffff';
    main.innerHTML = '';
    main.appendChild(color_css_text(css));
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
  if (obj.max) { element.max = obj.max; }
  if (obj.min) { element.min = obj.min; }
	if (obj.src) { element.src = obj.src; }
  if (obj.step) { element.step = obj.step; }
  if (obj.input_type) { element.type = obj.input_type; }	
	return element;
}