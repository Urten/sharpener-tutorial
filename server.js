import http from 'http'
import querystring from 'querystring'

const PORT = process.env.PORT || 3000
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')

    const url = req.url
    const method = req.method
    console.log(`Received ${method} request for: ${url}`)

    if (method === 'POST' && url === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            const formData = querystring.parse(body);
            const name = formData.name;

            console.log('Form submitted with name:' + name)

            res.statusCode = 302
            res.setHeader('Location', '/message')
            res.end()
        })

        return
    }

    if (url === '/form') {


        res.end(
            `<form method="POST" action="/submit">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name">
                <input type="submit" value="Submit">
            </form>`
        )

        return
    }
    if (url === '/message') {
        res.end(
            `<h1>Message Page</h1>
            <p>Thank you for submitting the form!</p>
            <a href="/form">Go back to form</a>`
        )

        return
    }

    res.end('<h1>404 - Page Not Found</h1>')

})




server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})