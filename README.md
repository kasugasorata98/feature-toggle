# Feature Access Toggle Backend App

This is a backend application for managing feature access toggles. It provides two APIs: one for toggling feature access for a given user and feature, and one for checking whether a user has access to a given feature.

## Installation

1. Install Dependencies:
   ```sh
   cd feature-toggle
   npm install
   ```
2. Configure env variables:
   There is an env.example file to refer to.
   The application requires the following environment variables to be set:

   - NODE_ENV: development
   - PORT: 3000
   - MONGODB_CONNECTION_STRING: 'your-mongo-db-string'

3. Start the server:
   ```sh
   npm run dev
   ```

# Deployment

BASE_URL: `http://ec2-13-229-79-137.ap-southeast-1.compute.amazonaws.com:3000`

This application is deployed using GitHub Actions. The deployment pipeline includes the following steps:

- Run unit testing.
- Build a Docker image of the application using the Dockerfile in the root directory of the project.
- Push the Docker image to an Amazon Elastic Container Registry (ECR) repository.
- Deploy the Docker image to an Amazon Elastic Container Service (ECS) cluster.
- Start a new task on an Amazon Elastic Compute Cloud (EC2) instance running in the ECS cluster.

# Usage

## Toggling feature access

To toggle feature access for a given user and feature, send a POST request to the `/feature` endpoint with the following parameters:

- featureName: The name of the feature to toggle access for
- email: The email address of the user to toggle access for
- enable: A boolean value indicating whether to enable or disable access to the feature

Example:

```json
POST /feature

{
  "featureName": "example-feature",
  "email": "user@example.com",
  "enable": true
}
```

## Checking feature access

To check whether a user has access to a given feature, send a GET request to the /feature endpoint with the following parameters:

- featureName: The name of the feature to check access for
- email: The email address of the user to check access for

Example:

```json
GET /feature?featureName=example-feature&email=user@example.com
```

The server will respond with a JSON object indicating whether the user has access to the feature:

```json
{
  "canAccess": true
}
```

## Testing

To run unit tests for the application, use the following command:

```sh
npm test
```

## Technologies used

- Express.js: A popular Node.js framework for building web applications
- MongoDB: A popular NoSQL database for storing and retrieving data
- Mongoose: An Object-Document Mapping (ODM) library for MongoDB
- Jest: A popular JavaScript testing framework
- mongodb-memory-server: A package that provides an in-memory MongoDB database for unit testing
- ts-jest: A package that allows you to use Jest with TypeScript
