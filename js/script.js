$(() => {
	console.log("hi there!");
	//////////////////////////////////-- test json data by array
	/*	$.getJSON("data/holiday.json", (data) => {
			loadTestHoliday(data.holidays);
			console.log(data.holidays);
			console.log("hi there!");
		});
		//load test data
		function loadTestHoliday(holidaysArray) {
			const $holidays = $(`<div>`);
			$("#section").append($holidays);
			const $ulHoliday = $(`<ul>`);
			$holidays.append($ulHoliday)
			holidaysArray.forEach((holiday) => {
				$ulHoliday.append(`<h4>${holiday.name}</h4><li>Date: ${holiday.date}</li><li>Date observed: ${holiday.observed}</li><li>Public: ${holiday.public}</li>`);
			});
		}*/

	loadHtml();

	function loadHtml() {
		$("#htmlData").append(`<h1>Historical Holidays of the World!</h1>
		<section id="introd">
			<h3>About this page</h3>
			<p>Search for historical holidays from year 1 to year 2016 from the countries listed below. See instructions below for details. </p>
		</section>
		<div id="instrucions">
			<h4>Instructions</h4>
			<ul><li>Country and Year are required fields.</li>
				<li>Use the country codes from the table below.</li>
				<li>Use 1-4 digit year. From year 1 up to the year before the current year.</li>
				<li>Use numbers 1-12 in the month field.</li>
				<li>Use numbers 1-31 for days field.</li>
				<li>Month and Day fields are optional.</li>
				<li>If Day is filled in and Month is blank, month and day fields will be ignored and will only read Country and Year data.</li>
			</ul>
				<p class="intro">Button "Show All Holidays" will display holidays for the specified country, year, month, day and their public status:</p>
			<ol>
				<li>Fill in Country, Year and/or Month and Day fields.</li>
				<li>Click "Show All Holidays".</li>
				<p>Note: If "Month" and/or "Day" fields are filled in, this will display both public and non-public holiday for the specified country, year, month and/or day. </p>
			</ol>
				<p class="intro">Button "Show Public Only" will only display public holidays for the specified country, year, month and/or day:</p> 
			<ol>
				<li>Country, Year and/or Month and Day fields</li>
				<li>Click "Show Public Only".</li>
				<p>Note: If "Month" and/or "Day" fields are filled in, this will display the public holiday for the specified country, year, month and/or day. </p>
			</ol>
		</div>
<h2>Input field</h2>
		<div id="api-input">
			<label>Country: *</label>
			<input type="text" name="country" id="country-api" required>
			<label>Year: *</label>
			<input type="number" name="year" id="year-api" required min="1" max="2017">
			<label>Month: </label>
			<input type="number" name="month" id="month-api" min="1" max="12">
			<label>Day: </label>
			<input type="number" name="day" id="day-api" min="1" max="12">
			<div id="buttons-div">
				<button id="country-year-public">Show All Holidays</button>
				<button id="true">Show Public Only</button>
				<!--<button id="day-button">With Day</button>-->
			</div>


			<div id="output">
			</div>
		</div>`);
	}
	////////////////////////////////////////////////////////////////////////	
	//holiday api - url
	holidayApp = {
			$target: $("#output"),
			//test API
		//holidayApi: "8a4c11e4-1dae-43d7-a6a3-ffd3ef6ab3ba",
			country: "",
			month: "",
			year: "",
		//	//live API	
			holidayApi: "e0412ac2-144a-43c6-916c-6e3020ba6d2c",
			////////////////////////////////////////////////////////////
			////////////////// get input data Country, year, month public
			getFormBothPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				if (country === null || country === "") {
					console.log("runningCountryYearMonthPublic")
				}
				if (year === null || year === "") {
					holidayApp.$target.html("Enter a valid year");
				}
				if (month === null || month === "") {
					holidayApp.getCountryYearBothPublicData();
				}
				if (day != null) {
					holidayApp.getCountryYearMonthDayPublicData(country, year, month, day);
				} else {
					holidayApp.getCountryYearMonthBothPublicData(country, year, month);
				}
			},
		
/////////////////////// get only public
			getFormOnlyPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				
				if (country === null || country === "") {
					console.log("runningCountryYearMonthPublic")
				}
				if (year === null || year === "") {
					holidayApp.$target.html("Enter a valid year");
				}
				if (month === null || month === "") {
					holidayApp.getCountryYearOnlyPublicData();
				}
				if (day != null) {
					holidayApp.getCountryYearMonthDayOnlyPublicData(country, year, month, day);
				} else {
					holidayApp.getCountryYearMonthOnlyPublicData(country, year, month);
				}

			},
		
	///////////////////////////////////////////////////////////////////
	
			/// get country and year both public and non-public
			getCountryYearBothPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				//const url = "data/testHoliday.json";
				const url = "https://holidayapi.com/v1/holidays?key=" + holidayApp.holidayApi + "&country=" + country + "&year=" + year + "&public%";
				const $list = $(`<ul>`);
				$("#output").append($list)
				$.getJSON(url, function (data) {

					if (data.cod == 200) {
						$list.html("Success");
					}

					for (holiday in data.holidays) {
						data.holidays[holiday].forEach((item) => {
							$list.append(`<tr><td><li style="font-weight: bold">Holiday: ${item.name}</li><li>Date: ${item.date}</li><li>Date observed: ${item.observed}</li><li style="color: green">Public: ${item.public}</li></td></tr>`);
						});
					}

				}).fail(function () {
					holidayApp.$target.html("Data access failed.");
				});
			},


			/// public only country and year
			getCountryYearOnlyPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				//const url = "data/testHoliday.json";
				const url = "https://holidayapi.com/v1/holidays?key=" + holidayApp.holidayApi + "&country=" + country + "&year=" + year + "&public=true";
				const $list = $(`<ul>`);
				$("#output").append($list)
				$.getJSON(url, function (data) {

					if (data.cod == 200) {
						$list.html("Success");
					}

					for (holiday in data.holidays) {
						data.holidays[holiday].forEach((item) => {
							$list.append(`<tr><td><li style="font-weight: bold">Holiday: ${item.name}</li><li>Date: ${item.date}</li><li>Date observed: ${item.observed}</li><li style="color: green">Public: ${item.public}</li></td></tr>`);
						});
					}

				}).fail(function () {
					holidayApp.$target.html("Data access failed.");
				});
			},
	
			/////////////////////////////////////////////////////////////
			//// get holidays both public and not
			getCountryYearMonthBothPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				//const url = "data/testHoliday.json";
				const url = "https://holidayapi.com/v1/holidays?key=" + holidayApp.holidayApi + "&country=" + country + "&year=" + year + "&month=" + month + "&public%";
				const $list = $(`<ul>`);
				$("#output").append($list);
				$.getJSON(url, function (data) {
					if (data.cod == 200) {
						$list.html("Success");
						data.holidays.forEach((item) => {
						$list.append(`<tr><td><li style="font-weight: bold">Holiday: ${item.name}</li><li>Date: ${item.date}</li><li>Date observed: ${item.observed}</li><li style="color: green">Public: ${item.public}</li></td></tr>`);
					});
						}
				}).fail(function () {
					holidayApp.$target.html("Data access failed.");
				});
			},
			//// get holidays public only
			getCountryYearMonthOnlyPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				//const url = "data/testHoliday.json";
				const url = "https://holidayapi.com/v1/holidays?key=" + holidayApp.holidayApi + "&country=" + country + "&year=" + year + "&month=" + month + "&public=true";
				const $list = $(`<ul>`);
				$("#output").append($list);
				$.getJSON(url, function (data) {
					if (data.cod == 200) {
						$list.html("Success");
					}
					data.holidays.forEach((item) => {
						$list.append(`<tr><td><li style="font-weight: bold">Holiday: ${item.name}</li><li>Date: ${item.date}</li><li>Date observed: ${item.observed}</li><li style="color: green">Public: ${item.public}</li></td></tr>`);
					});
				}).fail(function () {
					holidayApp.$target.html("Data access failed.");
				});
			},
			////get with by day with both public and non public
			getCountryYearMonthDayPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				//const url = "data/testHoliday.json";
				const url = "https://holidayapi.com/v1/holidays?key=" + holidayApp.holidayApi + "&country=" + country + "&year=" + year + "&month=" + month + "&day=" + day;
				const $list = $(`<ul>`);
				$("#output").append($list);
						$.getJSON(url, function (data) {
					if (data.cod == 200) {
						$list.html("Success");
					}
					data.holidays.forEach((item) => {
						$list.append(`<tr><td><li style="font-weight: bold">Holiday: ${item.name}</li><li>Date: ${item.date}</li><li>Date observed: ${item.observed}</li><li style="color: green">Public: ${item.public}</li></td></tr>`);
					});
				}).fail(function () {
					holidayApp.$target.html("Data access failed.");
				});
			},
			////getting by day with only public
			getCountryYearMonthDayOnlyPublicData: function () {
				const country = $("#country-api").val();
				const year = $("#year-api").val();
				const month = $("#month-api").val();
				const day = $("#day-api").val();
				//const url = "data/testHoliday.json";
				const url = "https://holidayapi.com/v1/holidays?key=" + holidayApp.holidayApi + "&country=" + country + "&year=" + year + "&month=" + month + "&day=" + day + "&public=true";
				const $list = $(`<ul>`);
				$("#output").append($list);
				$.getJSON(url, function (data) {
					if (data.cod == 200) {
						$list.html("Success");
					}
					data.holidays.forEach((item) => {
						$list.append(`<tr><td><li style="font-weight: bold">Holiday: ${item.name}</li><li>Date: ${item.date}</li><li>Date observed: ${item.observed}</li><li style="color: green">Public: ${item.public}</li></td></tr>`);
					});
						
				}).fail(function () {
					holidayApp.$target.html("Data access failed.");
				});
			},
		},
	
///////////////////////webApi buttons
	///get public and not public holidays
	$("#country-year-public").click(function () {
		$("#output").empty();
		holidayApp.getFormBothPublicData();
		return false;
	});
	///get only public holidays
	$("#true").click(function () {
		$("#output").empty();
		holidayApp.getFormOnlyPublicData();
		return false;
	});
	
	console.log("hi there!");
	//////////////////////////////////////////BREAK///////////////
	// load countries in table
	$.getJSON("data/countries.json", (data) => {
		loadCountries(data.countries);
		console.log(data.countries);
	});
	///load countries and their codes array
	function loadCountries(countriesArray) {
		
		const $divTable = $(`<div id="divTable">`);
		const $tableCountries = $(`<table id="countryTable">`);
		$tableCountries.append(`<h5>Supported Countries</h5>`);
		$("#countries-article").append($divTable);
		$divTable.append($tableCountries);
		countriesArray.forEach((countries) => {
			$tableCountries.append(`<li id="tableList">${countries.name}</li>`).sort();
		});
	}



});