# Simple Node.js Web Application

A lightweight Node.js web application optimized for AWS deployment.

## Features

- Express.js web server
- Modern UI with responsive design
- Health check endpoint
- Environment configuration
- Ready for AWS deployment

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Production Deployment

### AWS Deployment Steps

1. Create an EC2 instance (t4g.nano recommended for cost optimization)
2. Install Node.js and npm on the instance
3. Clone this repository
4. Install dependencies: `npm install --production`
5. Set up environment variables
6. Start the application: `npm start`

### Estimated AWS Costs

- EC2 t4g.nano: ~$3/month
- Data transfer: ~$0.09/GB after first 1GB (free)
- Total estimated minimum cost: $3-7/month

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## API Endpoints

- `GET /`: Main application page
- `GET /api/health`: Health check endpoint

## License

ISC 