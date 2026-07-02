### General

Ensure:

- Responsive design
- Clean UI
- Types from Prisma
- Reduce code repetition
- Implement zod
- Tidy up API logic in routes: better responses, error handling and rest apis

### Prisma

- Check your logic for creating objects that involve relations

### API

- You don't need to pass the session when calling an API. Use 'await auth()' in the API file instead.

### Org creation

- Verify through email before creating it

### Invite Users

- Include link to user creation page in email
- Link should have expiry date
- After sending email invite, admin should not be able to send another email invite to that same email account unless link has expired
- When redirected through the link, user should be able to finish creating their account, and should be able to log in after that.

### Testing

- Focus mainly on:
  - Unit tests
  - Integration tests: testing features and API endpoints (some overlap here)
