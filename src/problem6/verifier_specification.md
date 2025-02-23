# We have 2 verifier
## 1. Action complete verfier must be sacrify: 
1. Action Validation before Issuing ActionToken
Backend Verifies the Action: The backend should not just issue an actionToken blindly when it receives a request. Instead, it should first check if the action the user claims to have completed is legitimate. For example:
If the action involves playing a game, the backend might check if the user actually completed a specific level, achieved a milestone, or finished the game session properly.
If the action is based on time or an event, ensure the event or action can’t be repeated in a short time frame. For instance, a user shouldn’t be able to "complete a task" multiple times within a few seconds or minutes.

Base on the real action we need more info from POST request, example like the answer from client to determine how client finish the level.

2. ActionToken One-Time Use
Token Expiration and Reusability: Each actionToken should only be usable once and should expire after a short period (e.g., 5 minutes). This ensures that even if the frontend continues to request tokens, each token is valid for a single update only.
Invalidating Tokens Post-Use: Once the actionToken is used to update the score, it should be marked as used or removed from the database. This prevents any attempt to reuse it.

3. Rate Limiting
Limiting Token Requests: To prevent spamming, we should implement rate limiting on the action token request itself. For example, each user can only request a new actionToken once every 30 or 60 seconds. This prevents them from continuously triggering requests just to obtain tokens without performing a real action.

4. Session or Action Linking
Session Integrity: The actionToken should be linked to a session or a unique action identifier. This way, when the frontend sends the actionToken for score update, the backend checks if the action corresponds to the current session or action the user is involved in. If there is a mismatch, the token can be rejected.


Databse: 
CREATE TABLE action_tokens (
  token VARCHAR(255) PRIMARY KEY,
  userId INT,
  actionId INT,
  timestamp TIMESTAMP,
  used BOOLEAN DEFAULT FALSE,
  expiresAt TIMESTAMP
);

## Update Score verifier :
Base on action_tokens and session and JWT to verify the request.