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
document.getElementById('icon').addEventListener('click', function(event) {
	var menu = document.getElementById('menu');
  if (menu.style.display == '' || menu.style.display == 'none') {
    menu.style.display = 'flex';
  }
  else { menu.style.display = 'none'; }
}, false);

// Add an event listener to the Overstock button.
document.getElementById('btn_overstock').addEventListener('click', function(event){
	event.preventDefault();
	// Set the mode.
	mode = 'overstock';
  // Remove any navbar links.
  clear_navbar_links();
  /* var table_header = document.getElementById('main__table-header');
  // Remove the table header.
	if (table_header) {
		table_header.parentElement.removeChild(table_header);
	} */
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
	create_buttons_year();
}, false);

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
    temp_th.addEventListener('click', function(event){
      var tbody = document.getElementById('tbody');
      main.innerHTML = '';
    }, false);
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
  /* document.getElementById('main').appendChild(table); */
  // This creates two tabels in order to freeze the thead.
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
    else {
      var json_list = [{ 'category': 'Baseball', 'set_year': 1990, 'set_name': 'Topps' },
      { 'category': 'Baseball', 'set_year': 1991, 'set_name': 'Topps' },
      { 'category': 'Baseball', 'set_year': 1992, 'set_name': 'Topps' }];
			// Display the results.
      var column_names = ['Year', 'Set', 'Location', 'Sales'];
      // Create the tables needed to display the set data.
      create_table_overstock(json_list);
    }
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