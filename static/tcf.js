// Global variables.
var home = 'http://flask-env.picmpn3pqu.us-west-2.elasticbeanstalk.com/';
var sport = '';
var year = '';
var letter = '';
var page = '';
var mode = '';
var row_num = 0;
var total_records = 0;
var current_record = 1;
// Make the logo_button reset the web page when clicked.
document.getElementById('logo__button').addEventListener('click', function(event){
	event.preventDefault();
	window.location.href = home;
}, false);
// Create the sport buttons.
cr_btns_sport();
cL_btn_inventory(document.getElementById('c3_L_r5_btn0'))
// Create and action listener for the Inventory button.
function cL_btn_inventory(btn_temp){
	btn_temp.addEventListener('click', function(event){
		event.preventDefault();
		// Clear the buttons and card number display area.
		document.getElementById('main__table-header').innerHTML = '';
		document.getElementById('c3_C_r2').innerHTML = '';
		document.getElementById('feedback').innerHTML = '';
		// Reset the current_record global.
		current_record = 1;
		// Create the year buttons to allow the user to choose the year.
		cr_btns_year();
		// Set the mode to inventory.
		mode = 'inventory';
	}, false);
}
function cL_btn_letter(btn_temp){
	btn_temp.addEventListener('click', function(event){
		event.preventDefault();
		//Save the name of the chosen letter.
		letter = btn_temp.innerHTML;
		//Update the navbar.
		document.getElementById('link_letter').innerHTML = letter;
		document.getElementById('link_letter').addEventListener('click', function(event){
			//Clear the buttons.
			c3_C_r2.innerHTML = '';
			//Create the letter buttons to allow the user to re-choose the letter.
			cr_btns_letter();
		}, false);
		//Clear the buttons.
		document.getElementById('c3_C_r2').innerHTML = '';
		var column_names = ['Year', 'Set', 'Location', 'Sales'];
		//Create the tables needed to display the set data.
		cr_layout_tcf(column_names);
		//Get the sets that that correspond to the chosen buttons.
		get_set_list();
		
	}, false);
}
function cL_btn_page(btn_temp){
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
function cL_btn_sport(btn_temp){
	btn_temp.addEventListener('click', function(event){
		event.preventDefault();
		//Save the name of the chosen sport.
		sport = btn_temp.innerHTML;
		//Update the navbar.
		document.getElementById('link_sport').innerHTML = sport;
		document.getElementById('link_sport').addEventListener('click', function(event){
			//Return to the homepage and reset all data.
			window.location.href = home;
		}, false);
		//Clear the buttons.
		document.getElementById('c3_C_r2').innerHTML = '';
		//Create the year buttons.
		cr_btns_year();
	}, false);
}
function cL_btn_year(btn_temp){
	btn_temp.addEventListener('click', function(event){
		event.preventDefault();
		// Save the name of the chosen year.
		year = btn_temp.innerHTML;
		// Check to see if the mode is inventory.
		if(mode == 'inventory'){
			// Get the number of cards listed on beckett for the search term.
			search_dealer_home(1);
		}
		else{
			// Update the navbar.
			document.getElementById('link_year').innerHTML = year;
			document.getElementById('link_year').addEventListener('click', function(event){
				// Clear the buttons.
				document.getElementById('c3_C_r2').innerHTML = '';
				// Create the year buttons to allow the user to re-choose the year.
				cr_btns_year();
			}, false);
			//Clear the buttons.
			document.getElementById('c3_C_r2').innerHTML = '';
			//Create the letter buttons.
			cr_btns_letter();
		}
	}, false);
}
function cr_btns_letter(){
	var btn_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
	'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '%'];
	var row = 0;
	var div_temp = '';
	for(var i = 0; i < btn_list.length; i++){
		var btn_temp = document.createElement('button');
		//Add an action listener to each button.
		cL_btn_letter(btn_temp);
		btn_temp.className = 'medium green button';
		if(btn_list[i] == ' '){
			btn_temp.className += ' btn_hidden';
		}
		btn_temp.innerHTML = btn_list[i];
		//Create a new row after 7 buttons are created.
		if(i % 7 == 0){
			//Create a new row.
			div_temp = document.createElement('div');
			div_temp.id = 'btn_row_' + row;
			div_temp.className = 'div_btn_letter';
			row++;
			//Add the button to the row.
			div_temp.appendChild(btn_temp);
			//Add the row the the center div.
			document.getElementById('c3_C_r2').appendChild(div_temp);
		}
		else{
			//Add the row the the center div.
			div_temp.appendChild(btn_temp);
		}
	}	
}
function cr_btns_page(temp_obj){
	// Save the total records in the global variable.
	total_records = response.records
	// Display the results in the navbar.
	var navbar = document.getElementById('navbar');
	navbar.innerHTML = '';
	navbar.innerHTML = 'There are ' + total_records + ' records for ' + year + '.';
	var c3_C_r2 = document.getElementById('c3_C_r2');
	// Remove the loader.
	c3_C_r2.innerHTML = '';
	var row = 0;
	var div_temp = '';
	for(var i = 0; i < Math.ceil(temp_obj.records/100, -1); i++){
		// Stop the loop at 100 if there are more than 10,000 records.
		if(i == 100){
			break;
		}
		var btn_temp = document.createElement('button');
		btn_temp.id = 'page_button_' + (i + 1);
		btn_temp.className = 'large green button';
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
			c3_C_r2.appendChild(div_temp);
		}
		else{
			//Add the button to the row.
			div_temp.appendChild(btn_temp);
		}
	}	
}
function cr_btns_sport(){
	var btn_list = ['Baseball', 'Football', 'Basketball', 'Hockey',
						  'Nonsports', 'Multisport', 'Racing', 'Wrestling',
						  'Soccer', 'Golf', 'Magic', 'YuGiOh',
						  'Pokemon', 'Gaming', 'Diecast', ' '];
	//Used to name the button rows.
	var row = 0;
	var div_temp = '';
	for(var i = 0; i < btn_list.length; i++){
		var btn_temp = document.createElement('button');
		btn_temp.className = 'xlarge green button';
		if(btn_list[i] == ' '){
			btn_temp.className += ' btn_hidden';
		}
		btn_temp.innerHTML = btn_list[i];
		//Add a listener to each button.
		cL_btn_sport(btn_temp);
		//Create a new row after 4 buttons are created.
		if(i % 4 == 0){
			div_temp = document.createElement('div');
			div_temp.id = 'btn_row_' + row;
			div_temp.className = 'div_btn_sport';
			row++;
			//Add the button to the row.
			div_temp.appendChild(btn_temp);
			//Add the row to the center div.
			document.getElementById('c3_C_r2').appendChild(div_temp);
		}
		else{
			//Add the button to the row.
			div_temp.appendChild(btn_temp);
		}
	}
}
function cr_btns_year(){
	var row = 0;
	var div_temp = '';
	for(var i = 1930; i < 2020; i++){
		var btn_temp = document.createElement('button');
		//Add a listener to each button.
		cL_btn_year(btn_temp);
		btn_temp.className = 'large green button';
		btn_temp.innerHTML = i;
		//Create a new row after 10 buttons are created.
		if(i % 10 == 0){
			//Create a new row.
			div_temp = document.createElement('div');
			div_temp.id = 'btn_row_' + row;
			div_temp.className = 'div_btn_year';
			row++;
			//Add the button to the row.
			div_temp.appendChild(btn_temp);
			//Add the row to the center div.
			document.getElementById('c3_C_r2').appendChild(div_temp);
		}
		else{
			//Add the button to the row.
			div_temp.appendChild(btn_temp);
		}
	}	
}
function cr_layout_tcf(column_names){
	//Clear the area where two tables will go.
	var header = document.getElementById('main__table-header');
	header.innerHTML = '';
	header.className = 'main__table-header';
	var c3_C_r2 = document.getElementById('c3_C_r2');
	c3_C_r2.innerHTML = '';
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
	header.appendChild(temp_div_table);
	
	//Create table2.
	var temp_div_table = document.createElement('div');
	temp_div_table.id = 'table2';
	temp_div_table.className = 'table';
	var temp_div_tbody = document.createElement('div');
	temp_div_tbody.id = 'tbody';
	//Add the elements to the layout.
	temp_div_table.appendChild(temp_div_tbody);
	c3_C_r2.appendChild(temp_div_table);
}
function cr_loader(){
	// Clear the buttons.
	var c3_C_r2 = document.getElementById('c3_C_r2');
	c3_C_r2.innerHTML = '';
	// Create the loader.
	var temp_div = document.createElement('div');
	temp_div.id = 'loader';
	temp_div.className = 'loader';
	c3_C_r2.appendChild(temp_div);
}
function cr_row_tcf(temp_list){
	//Create a new row.
	var temp_div_tr = document.createElement('div');
	temp_div_tr.id = 'tbody_tr' + row_num;
	temp_div_tr.className = 'tr tbody_tr';
	//Create the cells for the tbody_tr.
	for(var i = 0; i < temp_list.length; i++){
		//Create the cell.
		var temp_div_td = document.createElement('div');
		temp_div_td.className = 'td td' + i;
		temp_div_td.innerHTML = temp_list[i];
		//Add the cell to the row.
		temp_div_tr.appendChild(temp_div_td);
	}
	//Add the row to table2.
	document.getElementById('tbody').appendChild(temp_div_tr);
	//Update the row number.
	row_num++;
}
function display_result(response){
	// Get the display area.
	var feedback = document.getElementById('feedback');
	// Create a p element and add display the card just added.
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
		console.log('Next page is ' + next_page_id);
		if(next_button){
			var event = new Event('click');
			next_button.dispatchEvent(event);
		}
	}
}
function search_dealer_home(){
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
function search_for_page(pg){
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
function search_for_record(record){
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
function get_set_list(){
	var xhttp = new XMLHttpRequest();
	var post_data = 'category=' + sport + '&year=' + year + '&letter=' + letter;
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200){
			//Get the set list with sales totals.
			var json_list = JSON.parse(xhttp.responseText);
			console.log(json_list);
			//Add the data to table2.
			for(var i = 0; i < json_list.length; i++){
				var temp_list = [json_list[i]['set_year'],
				json_list[i]['set_name'], json_list[i]['location'],
				json_list[i]['total']]
				cr_row_tcf(temp_list);
			}//Add the data to table2.
		}
	}
	xhttp.open("POST", "/set_list", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(post_data);
}
function create_table(parent_node_id, column_names, json_list, json_list_keys){
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