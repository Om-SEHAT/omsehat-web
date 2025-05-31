# Om SEHAT - Sistem Kesehatan Integrasi

Om SEHAT adalah platform kesehatan terintegrasi #1 di Indonesia dengan motto "Om Tolong Om! Om Siap Menolong!"

## Tech Stack

- **React** - Frontend library
- **Vite** - Build tool and development server
- **TypeScript** - Type safety and better developer experience
- **ShadCN** - Component library for styling
- **Tailwind CSS** - Utility-first CSS framework
- **Figma MCP Server** - For design assets and references

## Features

### Om SAPA - Layanan Konsultasi Kesehatan
- Patient registration form with validation
- Nationality selection with flag indicators
- Date of birth input with age calculation
- OTP verification flow
- Real-time chat with healthcare professionals
- Session-based conversation history

## API Integration

### Patient Registration
- Endpoint: `https://apidev-triana.sportsnow.app/register`
- Method: POST
- Body: Patient information in JSON format

### OTP Verification
- Endpoint: `https://apidev-triana.sportsnow.app/verify-otp`
- Method: POST
- Body: Registration data with OTP code

### Chat Session
- Endpoint: `https://apidev-triana.sportsnow.app/session/{session_id}`
- Method: POST
- Body: `{"new_message": "message content"}`
- Response: AI chatbot response with next action instructions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # ShadCN UI components
│   ├── Header.tsx       # Header component with search and login
│   ├── Footer.tsx       # Footer with links and social media
│   ├── PatientForm.tsx  # Patient registration form
│   ├── OTPDialog.tsx    # OTP verification dialog
│   ├── Chat.tsx         # Chat interface component
│   └── ChatMessage.tsx  # Individual chat message component
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── OmSapa.tsx       # Om SAPA feature page with chat
│   └── ...              # Other feature pages
├── styles/              # CSS styles
│   ├── patient-form.css # Styles for patient form
│   ├── otp-dialog.css   # Styles for OTP verification
│   ├── chat.css         # Styles for chat interface
│   └── ...              # Other style files
├── utils/               # Utility functions
│   ├── countries.ts     # Country data and helper functions
│   ├── validation.ts    # Form validation utilities
│   └── ...              # Other utility functions
└── contexts/            # React contexts for state management
```

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/omsehat-web.git
   cd omsehat-web
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Code Style
- Follow the TypeScript ESLint configuration
- Use ShadCN UI components where possible
- Keep components focused on a single responsibility
- Use CSS modules for component-specific styling

### Git Workflow
1. Create a new branch for each feature or bugfix
2. Make small, focused commits
3. Submit pull requests for review
4. Merge to main branch after review

## License
This project is licensed under the MIT License - see the LICENSE file for details.
