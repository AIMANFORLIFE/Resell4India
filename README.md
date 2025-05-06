# Resell4India

A modern e-commerce platform for buying and selling second-hand products in India.

## Features

- User authentication with Supabase
- Product catalog integration with Polar.sh
- Shopping cart functionality
- Responsive design with TailwindCSS
- TypeScript for type safety
- Error handling and toast notifications

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- Supabase
- Polar.sh API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resell4india.git
   cd resell4india
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_POLAR_ORG_ID=your_polar_org_id
   VITE_POLAR_ACCESS_TOKEN=your_polar_access_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Set up environment variables in Vercel:
   - Go to your project settings in Vercel
   - Navigate to the "Environment Variables" section
   - Add the following variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_POLAR_ORG_ID`
     - `VITE_POLAR_ACCESS_TOKEN`

5. Enable automatic deployments:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy on every push to the main branch

## Project Structure

```
src/
├── components/     # React components
├── contexts/      # React contexts
├── services/      # API services
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 