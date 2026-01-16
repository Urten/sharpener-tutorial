import querystring from 'querystring'
import fs from 'fs'
export const requestHandler = (req, res) => {

    const MESSAGE_FILE = 'message.txt'
    
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");

	const url = req.url;
	const method = req.method;
	console.log(`Received ${method} request for: ${url}`);

	if (method === "POST" && url === "/submit") {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});

		req.on("end", () => {
			const formData = querystring.parse(body);
			const message = formData.message;

			console.log("Form submitted with message:" + message);

			// Read existing messages
			let messages = [];
			try {
				if (fs.existsSync(MESSAGE_FILE)) {
					const data = fs.readFileSync(MESSAGE_FILE, "utf8");
					messages = JSON.parse(data);
				}
			} catch (err) {
				console.error("Error reading messages:", err);
			}

			// Add new message at the beginning
			messages.unshift(message);

			// Save back to file
			try {
				fs.writeFileSync(
					MESSAGE_FILE,
					JSON.stringify(messages, null, 2)
				);
			} catch (err) {
				console.error("Error saving message:", err);
			}

			res.statusCode = 302;
			res.setHeader("Location", "/message");
			res.end();
		});

		return;
	}

	if (url === "/form") {
		// Read messages from file
		let messages = [];
		try {
			if (fs.existsSync(MESSAGE_FILE)) {
				const data = fs.readFileSync(MESSAGE_FILE, "utf8");
				messages = JSON.parse(data);
			}
		} catch (err) {
			console.error("Error reading messages:", err);
		}

		// Build HTML for messages
		const messagesHtml =
			messages.length > 0
				? `<div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc;">
                    <h3>Messages:</h3>
                    <ul>
                        ${messages.map((msg) => `<li>${msg}</li>`).join("")}
                    </ul>
                   </div>`
				: "<p>No messages yet.</p>";

		res.end(
			`${messagesHtml}
                <form method="POST" action="/submit">
                    <label for="message">Message:</label>
                    <input type="text" id="message" name="message">
                    <input type="submit" value="Submit">
                </form>`
		);

		return;
	}
	if (url === "/message") {

        let message = ""

        let messages = [];
        try {
            if (fs.existsSync(MESSAGE_FILE)) {
                const data = fs.readFileSync(MESSAGE_FILE, "utf8");
                messages = JSON.parse(data);
            }
        } catch (err) {
            console.error("Error reading messages:", err);
        }

        if (messages) {
            message = messages.join(" ")
        }


		res.end(
			`<h1>${message}</h1>
                <p>Thank you for submitting the form!</p>
                <a href="/form">Go back to form</a>`
		);

		return;
	}

	res.end("<h1>404 - Page Not Found</h1>");
};
