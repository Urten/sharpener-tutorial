# Attendance App - Frontend

This is the frontend implementation of the Attendance Reporting App using **pure JavaScript** and **no frameworks**. It's a true single-page application (SPA) that communicates directly with the backend API.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Axios for HTTP requests
- No frameworks or build tools

## Project Structure

```
frontend/
├── index.html     # Main HTML file with navigation and views
├── style.css      # Minimal styling for the application
├── app.js         # Main JavaScript logic and API communication
└── README.md      # This documentation file
```

## Features

### Calendar View
- Date picker for selecting attendance dates
- Navigation to attendance view

### Attendance View
- List of all students with radio buttons for present/absent
- Save and finalize buttons for attendance sessions
- Disabled controls for finalized sessions
- Real-time API communication

### Report View
- Table displaying attendance statistics
- Present days, total days, and percentage for each student
- Real-time data from backend

### Add Student View
- Form to add new students with name and roll number
- Validation for required fields
- Direct API integration for student creation
- Success/error feedback to user

## Key Characteristics

- **No Frameworks**: Pure JavaScript without React, Vue, or Angular
- **No Build Tools**: No webpack, vite, or other bundlers required
- **Single Page Application**: All views handled within one HTML page
- **Axios Integration**: Uses Axios for all HTTP communication with backend
- **Student Management**: Complete CRUD operations for student management
- **Easy to Debug**: Straightforward DOM manipulation and event handling
- **Lightweight**: Minimal dependencies and fast loading

## API Endpoints Used

- `GET /api/students` - Fetch all students
- `GET /api/attendance/session?date=YYYY-MM-DD` - Get or create attendance session
- `POST /api/attendance/mark` - Save attendance records
- `POST /api/attendance/finalize` - Finalize attendance session
- `GET /api/report` - Get attendance report

## Browser Compatibility

This application uses modern JavaScript features and should work in:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Running the Application

1. Ensure the backend server is running on `http://localhost:3000`
2. Open `frontend/index.html` in a web browser
3. The application will load automatically in calendar view

## Possible Enhancements

- Prefill attendance when revisiting a date
- Bulk mark all present/absent functionality
- Role-based UI (admin/teacher permissions)
- Improved responsive design
- Local storage for offline functionality
- Better error handling and user feedback
- Date range selection for reports
- Export functionality for reports

## Development Notes

- All JavaScript functions are global for simplicity in this SPA
- The application uses template literals for HTML generation
- Event handlers are inline in the HTML for direct mapping
- CSS is minimal and focused on functionality over aesthetics
- The application follows the backend API structure exactly