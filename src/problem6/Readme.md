# Scoreboard API Module - Backend Service

## Overview
This module is responsible for handling the backend logic of updating user scores in real-time. It ensures that scores can only be updated by legitimate actions from authenticated users, preventing fraud and ensuring security. It integrates with the frontend, providing real-time updates via WebSockets or polling and validates each action using **actionTokens**.

---

## Features
- **Real-Time Scoreboard Updates**: Displays the top 10 user scores and updates them live.
- **Action-based Score Updates**: Users must perform legitimate actions to increase their score.
- **Security & Anti-Cheat**: Each action that updates a user's score is validated using a one-time **actionToken** to prevent fraudulent score updates.
- **Rate Limiting & Expiration**: Action tokens are valid for a limited time and can only be used once.
- **Authentication**: Users must be authenticated using JWT tokens to perform any action.

---

## API Endpoints

### 1. **POST /scores/update**
#### Description:
Updates a user's score after verifying the action and token.

#### Request:
{
  "userId": "123",           // The ID of the user
  "scoreIncrease": 10,       // The score increment (positive integer)
  "actionToken": "string"    // The action token generated after completing an action
}


#### Response:
200 OK: If the action token is valid and the score is updated.
400 Bad Request: If the action token is invalid or expired.
401 Unauthorized: If the user is not authenticated (JWT token is missing or invalid).
429 Too Many Requests: If the user exceeded the rate limit for score updates.

Example 200:
{
  "message": "Score updated successfully",
  "newScore": 100
}
Example 400, 401:
{
  "error": "Invalid action token or token expired"
}

Example 429:
{
  "error": "Too many requests"
}

### 2. **POST /actions/complete**

#### Description:
Endpoint for triggering a user action. The backend will generate an actionToken if the action is valid.
#### Request:
{
  "userId": "123",          // The ID of the user
  "actionId": "456"         // The ID of the action performed (e.g., completing a game level)
}
#### Response:
200 OK: If the action is valid and an action token is created.
400 Bad Request: If the action is invalid or if the user has already completed it within the time limit.
401 Unauthorized: If the user is not authenticated (JWT token is missing or invalid).
Example 200:
{
  "message": "Action completed successfully",
  "actionToken": "a8f9c3a91b9f78a14c8e88c4d524d5ef208dfbb2a2f941ed012b2e92dbcbf4c7"
}

### 3. Specific for backend team:
#### Token Lifecycle
Token Generation: The action token is generated when the user completes an action (e.g., completing a level, or achieving a milestone).
Token Expiration: The action token expires after 5 minutes.
One-Time Use: Once used to update the score, the action token is invalidated.
Rate Limiting: Users can only request an action token once every 60 seconds.
#### Security Features
JWT Authentication: The user’s identity is verified using JSON Web Tokens (JWT) for each request. 
( Or OAuth2 using keycloak )
ActionToken Validation: Each request to update the score requires a valid action token. The server will verify that the token is associated with the authenticated user and that it is not expired or reused.
Rate Limiting: To prevent abuse, users can only request action tokens once every 60 seconds, and only one action token can be used within a given time frame.
