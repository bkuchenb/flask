// Global variables.
var sport = '';
var year = '';
var letter = '';
var page = '';
var mode = '';
var row_num = 0;
var total_records = 0;
var current_record = 1;

// Make the menu icon display the menu when clicked.
var icon = document.getElementById('icon');
icon.addEventListener('click', display_menu, false);

// Add event listeners to the menu buttons.
var temp_btn = document.getElementById('btn_overstock');
temp_btn.addEventListener('click', set_mode.bind(null, 'overstock'), false);

temp_btn = document.getElementById('btn_download-inventory');
temp_btn.addEventListener('click', set_mode.bind(null, 'inventory'), false);

temp_btn = document.getElementById('btn_newly-added');
temp_btn.addEventListener('click', set_mode.bind(null, 'newly_added'), false);

temp_btn = document.getElementById('btn_sales-tax');
temp_btn.addEventListener('click', get_sales_tax, false);

temp_btn = document.getElementById('btn_sets');
temp_btn.addEventListener('click', set_mode.bind(null, 'sets'), false);

// Create the sport buttons.
create_buttons_sport();

function clear_navbar_links() {
  if (document.getElementById('link_sport')) {
    navbar.removeChild(document.getElementById('link_sport'));
    sport = '';
  }
  if (document.getElementById('link_year')) {
    navbar.removeChild(document.getElementById('link_year'));
    year = '';
  }
  if (document.getElementById('link_letter')) {
    navbar.removeChild(document.getElementById('link_letter'));
    letter = '';
  }
}

function cL_btn_letter(btn_temp) {
	btn_temp.addEventListener('click', function(event) {
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
		// Get the set_name from column 1.
		var row_num = btn_temp.id.replace('btn_sales', '');
		var row = document.getElementById('tr' + row_num);
		var cells = row.getElementsByTagName('td');
    console.log(cells.length);
		var temp_obj = {'category': sport, 'set_year': year,
      'set_name': cells[1].innerHTML};
    console.log(temp_obj);
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

/* function create_buttons_sales() {
	// Get all the td elements in the last column.
	var td_list = document.getElementsByClassName('td3');
	// Add a button to the cells.
	for (var i = 0; i < td_list.length; i++) {
		var btn_temp = create_node({ 'type': 'button', 'id': ('btn_sales' + i),
      'className': 'btn_sales',
      'innerHTML': 'Sales' });
		cL_btn_sales(temp_btn);
		td_list[i].appendChild(temp_btn);
	}
} */

function create_buttons_letter() {
	var btn_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
	                'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                  'Y', 'Z'];
	var temp_div = create_node({ 'type': 'div', 'id': 'wrapper_letter' });
	for (var i = 0; i < btn_list.length; i++) {
		var btn_temp = create_node({ 'type': 'button',
      'className': 'button button-letter color-green shape-rounded',
      'innerHTML': btn_list[i] });
		// Add a listener to each button.
		cL_btn_letter(btn_temp);
		// Add the button to the main div.
    temp_div.appendChild(btn_temp);
	}
  document.getElementById('main').appendChild(temp_div);
}

function create_buttons_sport() {
	var btn_list = ['Baseball', 'Football', 'Basketball', 'Hockey',
						      'Nonsports', 'Multisport', 'Racing', 'Wrestling',
						      'Soccer', 'Golf', 'Magic', 'YuGiOh',
						      'Pokemon', 'Gaming', 'Diecast'];
  var temp_div = create_node({ 'type': 'div', 'id': 'wrapper_sport' });
	for (var i = 0; i < btn_list.length; i++) {
		var btn_temp = create_node({ 'type': 'button',
      'className': 'button button-sport color-green shape-rounded',
      'innerHTML': btn_list[i] });
		// Add a listener to each button.
		cL_btn_sport(btn_temp);
    // Add the button to the main div.
    temp_div.appendChild(btn_temp);
  }
  document.getElementById('main').appendChild(temp_div);
}

function create_buttons_year() {
	var row = 0;
	var temp_div = create_node({ 'type': 'div', 'id': 'wrapper_year' });
	for (var i = 1930; i < 2020; i++) {
		var btn_temp = create_node({ 'type': 'button',
      'className': 'button button-year color-green shape-rounded',
      'innerHTML': i });
		// Add a listener to each button.
		cL_btn_year(btn_temp);
		// Add the button to the main div.
    temp_div.appendChild(btn_temp);
	}
  document.getElementById('main').appendChild(temp_div);
}

function create_table_overstock(json_list) {
  var main = document.getElementById('main');
  var temp_div = create_node({ 'type': 'div', 'className': 'wrapper_table1' });
	var table = create_node({ 'type': 'table', 'id': 'table1' });
  var thead = create_node({ 'type': 'thead' });
  var temp_tr = create_node({ 'type': 'tr' });
	// Create the cells for the thead_row.
  var column_names = ['Year', 'Set', 'Location', 'Sales'];
	for (var i = 0; i < column_names.length; i++) {
		var temp_th = create_node({ 'type': 'th',
      'innerHTML': column_names[i] });
    // Make the headings sort the columns when clicked.
    temp_th.addEventListener('click', sort_table.bind(null, i), false);
      /*var tbody = document.getElementById('tbody');
      var tr_list = tbody.getElementsByClassName('tr');
      console.log(tr_list.length);
       station_data = station_data.sort(function compare(a,b){
        if (order == 'descending') {
          var temp = a[index].localeCompare(b[index], undefined,
            { numeric: true, sensitivity: 'base' });
          if (temp == 1) { return -1; }
          else if (temp == -1) { return 1; }
          else { return 0; }
        }
        else {
          return(a[index].localeCompare(b[index], undefined,
            { numeric: true, sensitivity: 'base' }));
        }
      });
      if (order == 'descending') {
        order = 'ascending';
      }
      else {
        order = 'descending';
      }*/
		temp_tr.appendChild(temp_th);
	}
	// Add the elements to the layout.
	thead.appendChild(temp_tr);
	table.appendChild(thead);
  
  // This creates two tabels in order to freeze the thead.
  temp_div.appendChild(table);
  main.appendChild(temp_div);
  temp_div = create_node({ 'type': 'div', 'className': 'wrapper_table2' });
  table = create_node({ 'type': 'table', 'id': 'table2' });
  
  var tbody = create_node({ 'type': 'tbody' });
  // Create the rows.
  for (var i = 0; i < json_list.length; i++) {
    temp_tr = create_node({ 'type': 'tr', 'id': ('tr' + i) });
    var temp_td = create_node({ 'type': 'td', 'innerHTML': json_list[i]['set_year'] });
    temp_tr.appendChild(temp_td);
    temp_td = create_node({ 'type': 'td', 'innerHTML': json_list[i]['set_name'] });
    temp_tr.appendChild(temp_td);
    temp_td = create_node({ 'type': 'td', 'innerHTML': json_list[i]['location'] });
    temp_tr.appendChild(temp_td);
    temp_td = create_node({ 'type': 'td', 'id': ('td' + i) });
    var temp_btn = create_node({ 'type': 'button', 'id': ('btn_sales' + i),
      'className': 'btn_sales', 'innerHTML': 'Sales' });
		cL_btn_sales(temp_btn);
    temp_td.appendChild(temp_btn);
    temp_tr.appendChild(temp_td);
    tbody.appendChild(temp_tr);
  }
  table.appendChild(tbody);
  
  // Add the second table.
  temp_div.appendChild(table);
  main.appendChild(temp_div);
  main.classList.toggle('main_table');
  main.style.overflow = 'hidden';
}

/* function cr_layout_tcf_org(column_names) {
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
} */

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

/* function cr_row_tcf(temp_list) {
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
} */

function create_node(obj) {
	var element = document.createElement(obj.type);
	if (obj.alt) { element.alt = obj.alt; }
  if (obj.autofocus) { element.autofocus = obj.autofocus; }
  if (obj.backgroundImage) { element.style.backgroundImage = obj.backgroundImage; }
  if (obj.className) { element.className = obj.className; }
  if (obj.href) { element.href = obj.href; }
  if (obj.htmlFor) { element.htmlFor = obj.htmlFor; }
  if (obj.id) { element.id = obj.id; }
	if (obj.innerHTML) { element.innerHTML = obj.innerHTML; }
  if (obj.input_type) { element.type = obj.input_type; }
	if (obj.src) { element.src = obj.src; }
  if (obj.value) { element.value = obj.value; }	
	return element;
}

function display_menu() {
	var menu = document.getElementById('menu');
  if (menu.style.display == '' || menu.style.display == 'none') {
    menu.style.display = 'flex';
  }
  else {
    menu.style.display = 'none';
  }
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

/* function get_set_list_org() {
	var xhttp = new XMLHttpRequest();
	var post_data = 'category=' + sport + '&year=' + year + '&letter=' + letter;
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			// Get the set list with sales totals.
			var json_list = JSON.parse(xhttp.responseText);
			// Display the results.
      var column_names = ['Year', 'Set', 'Location', 'Sales'];
      // Create the tables needed to display the set data.
      create_table_overstock(column_names);
			for(var i = 0; i < json_list.length; i++){
				var temp_list = [json_list[i]['set_year'],
				json_list[i]['set_name'], json_list[i]['location']]
				cr_row_tcf(temp_list);
			}
			// Add buttons that will get sales data.
			create_buttons_sales();
		}
	}
	xhttp.open("POST", "/set_list", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(post_data);
} */

function get_sales_tax() {
	// Create a user message.
	var message = create_node({ 'type': 'p',
      'innerHTML': 'Select a dange range to calculate sales tax.' });
	
  // Get the date for 7 days ago and format it for the date picker.
	var new_date = new Date();
  new_date.setDate(new_date.getDate() - 7);
	var value = [new_date.getFullYear(), (parseInt(new_date.getMonth()) + 1),
		new_date.getDate()];
  for (var i = 0; i < value.length; i++) {
    if (String(value[i]).length === 1) {
      value[i] = ('0' + String(value[i]));
    }
  }
  value = value.join('-');
  
  // Create two labels and inputs to allow the user to choose dates.
	var date_start_label = create_node({ 'type': 'label',
    'innerHTML': 'From:', 'htmlFor': 'date_start' });
	var date_start = create_node({ 'type': 'input',
    'id': 'date_start', 'input_type': 'date', 'value': value });
  
  // Get the date for yesterday and format it for the date picker.
  new_date.setDate(new_date.getDate() + 6);
	value = [new_date.getFullYear(), (parseInt(new_date.getMonth()) + 1),
		new_date.getDate()];
  for (var i = 0; i < value.length; i++) {
    if (String(value[i]).length === 1) {
      value[i] = ('0' + String(value[i]));
    }
  }
  value = value.join('-');
  
  var date_end_label = create_node({ 'type': 'label',
    'innerHTML': 'To:', 'htmlFor': 'date_end' });
	var date_end = create_node({ 'type': 'input',
    'id': 'date_end', 'input_type': 'date', 'value': value });
	
	var temp_btn = create_node({ 'type': 'button',
    'id': 'submit_sales_tax', 'className': 'display__submit_display-block',
    'innerHTML': 'Submit' });
	
  // Clear the main element and navbar. Add the new elements.
	var main = document.getElementById('main');
  main.innerHTML = '';
  clear_navbar_links();
  main.appendChild(message);
	main.appendChild(date_start_label);
	main.appendChild(date_start);
	main.appendChild(date_end_label);
	main.appendChild(date_end);
	main.appendChild(temp_btn);
}

function get_set_list() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			// Get the set list with sales totals.
			var json_list = JSON.parse(xhttp.responseText);
			// Display the results.
      var column_names = ['Year', 'Set', 'Location', 'Sales'];
      // Create the tables needed to display the set data.
      create_table_overstock(json_list);
		}
    // Simulate data if database is unavailable. Used for debugging layout.
    /* else {
      var json_list = [{ 'category': 'Baseball', 'set_year': 1990, 'set_name': 'Topps' },
      { 'category': 'Baseball A', 'set_year': 1991, 'set_name': 'Topps A' },
      { 'category': 'Baseball B', 'set_year': 1992, 'set_name': 'Topps B' },
      { 'category': 'Baseball C', 'set_year': 1993, 'set_name': 'Topps C' },
      { 'category': 'Baseball D', 'set_year': 1994, 'set_name': 'Topps D' },
      { 'category': 'Baseball E', 'set_year': 1995, 'set_name': 'Topps E' },
      { 'category': 'Baseball F', 'set_year': 1996, 'set_name': 'Topps F' },
      { 'category': 'Baseball G', 'set_year': 1997, 'set_name': 'Topps G' },
      { 'category': 'Baseball H', 'set_year': 1998, 'set_name': 'Topps H' },
      { 'category': 'Baseball I', 'set_year': 1999, 'set_name': 'Topps I' },
      { 'category': 'Baseball J', 'set_year': 2000, 'set_name': 'Topps J' },
      { 'category': 'Baseball K', 'set_year': 2001, 'set_name': 'Topps K' },
      { 'category': 'Baseball L', 'set_year': 2002, 'set_name': 'Topps L' },
      { 'category': 'Baseball M', 'set_year': 2003, 'set_name': 'Topps M' },
      { 'category': 'Baseball N', 'set_year': 2004, 'set_name': 'Topps N' },
      { 'category': 'Baseball O', 'set_year': 2005, 'set_name': 'Topps O' },];
			// Display the results.
      var column_names = ['Year', 'Set', 'Location', 'Sales'];
      // Create the tables needed to display the set data.
      create_table_overstock(json_list);
    } */
	}
  xhttp.open('POST', '/master/get_set_list', true);
	xhttp.setRequestHeader('Content-type', 'application/json');
	xhttp.send(JSON.stringify({ 'category': sport, 'year': year,
                              'letter': letter }));
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

function get_set_sales(json, btn_id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			// Get the set list with sales totals.
			var json_list = JSON.parse(xhttp.responseText);
			var temp_td = document.getElementById(btn_id).parentElement;
			temp_td.classList.toggle = 'background-border';
			temp_td.innerHTML = json_list[0]['total'];
		}
	}
	xhttp.open("POST", "/master/get_set_sales", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(json));
}

function set_mode(new_mode) {
	// Set the mode.
	mode = new_mode;
  // Remove any navbar links.
  clear_navbar_links();
	// Clear the main element and add the correct buttons.
	document.getElementById('main').innerHTML = '';
  if (new_mode === 'overstock' || new_mode === 'sets') {
    create_buttons_sport();
  }
  else if (new_mode === 'inventory') {
    // Reset the current_record global.
    current_record = 1;
    // Create the year buttons.
    create_buttons_year();
  }
  
  else if (new_mode === 'newly_added') {
    // Reset the current_record global.
    current_record = 1;
  }
}

function sort_table(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('table2');
  switching = true;
  // Set the sorting direction to ascending:
  dir = 'asc'; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('tr');
    // Loop through all table rows :
    for (i = 0; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('td')[n];
      y = rows[i + 1].getElementsByTagName('td')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
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
}