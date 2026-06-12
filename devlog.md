### 12-13th June 2026

#### Completed:

- Redirects user to signin page from a route starting with /org if they don't have a session
- Added a 'role' field for a user: one of USER, ADMIN and OWNER. The user that creates an organisation is automatically the owner.

---

### 11th June 2026

#### Worked on:

- Signing in now redirects user to the dashboard of their organisation page; their organisation ID now appears in URL.

---

### 10th June 2026

#### Worked on:

- Trying to send back appropriate session data to browser when user logs in, so that the user can be redirected to the correct URL.

---

### 8th June 2026

#### Completed:

- Fixed mismatch between int and string for id of 'User' between neon table and prisma schema

---

### 7th June 2026

#### Completed:

- Functionality for user authentication works (I think)

#### Issues:

- Issue with account creation: database not recognising the type of the id - mismatch between int and string

---

### 6th June 2026

#### Completed:

- Created Organisation model
- Created a one-to-many relationship between User and Organisation; an Organisation can have many Users, a User can belong to only one Organisation
- 'SignUp' page changed to 'CreateOrganisation' page
- In 'CreateOrganisation' page, an organisation now gets created along with its top-level admin who will automatically have a foreign key to it
- Working on sign in functionality

#### Issues:

- Sign in not working - issues with authentication functionality

---

### 5th June 2026

#### Completed:

- Email sending for invite (right now without correct link) now works. Using Resend as the mailer.
- Created a [tasks list file](./tasks.md) to keep track of immediate tasks that need to be done to ensure nothing is missed.
- Created InviteToken model for storing valid and active invite tokens.

#### Issues:

N/A

---

### 27th May 2026

#### What I worked on:

- Creating a 'magic link' provider so owner can send an email to an email account, inviting the user to create an account

#### Issues:

- Error when attempting to send email

#### Next steps:

- Complete the magic link
- Testing: Write test for checking if user is created in database during account creation
- Modify the account creation to also create an organisation

---

### 24th May 2026

#### What I worked on

- Sign up page

#### What I completed

- Had ChatGPT regenerate the requirements, to include criteria for this application to have organisations and a hierarchy of users.
- In sign up page, added fields for organisation name.
- Added test for testing organisation name

#### Issues:

N/A

#### Next steps:

- Write test for checking if user is created in database during account creation
- Modify the account creation to also create an organisation

---

### 23rd May 2026

### What I worked on:

- Writing integration tests

#### What I completed:

- Added integration tests that validate all credentials - rejects if any of them are invalid

#### What I learned:

- Adding integration tests with Vitest

#### Next steps:

- Write test for checking if user is created in database

---

### 20th May 2026

#### What I worked on:

- Deployment
- Signup page

#### What I completed:

- Temporarily removed "account creation successful" message due to issues of using searchParams in the client
- Finally managed to deploy to netlify, after a few days of attempting
- Added spinner when system is attempting to create account

---

### 17th May 2026

#### What I worked on:

- Signup and signin pages
- API logic for creating user
- Authenticating the user

#### What I completed:

- Requirement 3.1.2
- Fixed password criteria checking bug
- Checks if first name, last name and email are valid
- Redirects to signin page if account creation successful
- If redirected, success message appears
- Links in both signin and signup pages to navigate if user has or does not have an account

#### Issues:

N/A

#### What I learned:

- Using 'useRouter' to redirect in client components

#### Next steps:

- Authenticating user

---

### 16th May 2026

#### What I worked on:

- Worked on signup page
- Creating logic for creating user in database, using Prisma

#### What I completed:

- Created logic for creating user in database, using Prisma
- Password criteria checking

#### Issues:

N/A

#### What I learned:

- How to set up and integrate Prisma in order to make queries

#### Next step:

- Creating the signup page, including validation of inputs

---

### 15th May 2026

#### What I worked on:

- Worked on signup page
- Trying to create logic for creating user in database, using Prisma

#### What I completed:

- changed /signin and /signup URL routes to /auth/signin and /auth/signup respectively

#### Issues:

N/A

#### What I learned:

N/A

#### Next step:

- Continuing to create a signup page so I can create users, and then authenticate them when logging in
- Continuing to create logic to add users to database when signing up

---

### 11th May 2026

#### What I worked on:

- Authentication
- Creating tables from model
- Created UI for signup page

#### What I completed:

- Added signup page
- Created first table (user) using model from schema.prisma
- Created UI for signup page

#### Issues:

N/A

#### What I learned:

- Using Auth.js to add credentials
- Using Prisma CLI to create a table in the database based on my model

#### Next step:

- Creating a signup page so I can create users, and then authenticate them when logging in
- Adding users to database when signing up

---

### 9th May 2026

#### What I worked on:

- Project setup

#### What I completed:

- Created project
- Set up requirements
- First push to GitHub

#### Issues:

N/A

#### What I learned:

N/A

#### Next step:

- Add models
