
(function(){

	var Application = {
		start: function start(){

		}
	}

	Listener.add(
		document,
		"DOMContentLoaded",
		Application.start(
			google_api_key,
			country,
			limit_results,
			0
		),
		false
	);
}());


