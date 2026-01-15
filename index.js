const http = require("http");

const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "text/html");

	let url = req.url;
	let response = "";

	switch (url) {
		case "/home":
			response = "<h1>Welcome home</h1>";
			break;
		case "/about":
			response = "<h1>Welcome to About Us</h1>";
			break;
		case "/node":
			response = "<h1>Welcome to my Node Js project</h1>";
			break;
		default:
			response = "<h1>Page Not Found</h1>";
	}

	res.end(response);
});

console.log("Server is created");

let port = 3000;
server.listen(port, () => {
	console.log("Server is running");
});
