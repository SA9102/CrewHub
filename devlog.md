### 5th July 2026

- In the 'Members' tab on the 'Team' page, a user can view a list of other users in that team.
- A user can click on a user to go their page and view more info about them (currently only their name and email).

---

### 3rd July 2026

- Created the team page. Currently, the user can view the teams they are in.
- A user can click on a team from the list to go to that team's page. They can switch between 'Chat', 'Events' and 'Members'

---

### 2nd July 2026

- Refactored the API URLs - now cleaner, as session is now retrieved from inside API file.
- Refactored the browser URLS - organisation ID removed as it was deemed unnecessary.
- Owners can see a list of all teams available in the organisation; users can see a list of only the teams they are in.
- Creating team page, where a user can view the team information and other members (not finished)

---

### 1st July 2026

- Added more tests.

---

### 29th June 2026

- Focused on adding tests.
- Added test that checks if organisation and user is created in database, and checks their values.
- Fixed testing issue where querying an object directly using Prisma was not retrieving the object. Solution was to set up a config file for tests, which loaded the database URL from the environment variables.

---

### 25th June 2026

#### Completed

- Owner can create a team - enter a name, and choose a list of users to add.
- Owner can delete a team.

---

### 24th June 2026

#### Completed:

- Added new model: Team.
- Added m-n relationship between User and Team.
- Currently implementing feature for owner to create a team - enter a name, and choose a list of users to add.

---

### 22nd June 2026

#### Completed:

- The owner can view a list of all users in the organisation. Can view their email address, first name, last name and role.
- Can delete a user (except their own).
- (Layout may change in the future).

---

### 20th June 2026

#### Completed:

- Fixed TypeScript errors.

---

### 18th June 2026

#### Completed:

- Code refactoring: reducing duplication in forms and util functions.
- Invite token is now checked to see if it exists, and if so then if it is valid.
- Users can now create an account from a valid link they have received, and sign in with that account.

---

### 15th June 2026

#### Worked on:

- Trying to check that an invite token is valid before a user can create an account.

#### Issues:

- Calling 'signIn' api during testing does not work

---

### 14th June 2026

#### Completed:

- Now cannot send another invite link to a particular email address if previous link for that email address has not expired.

#### Issues:

- Calling 'signIn' api during testing does not work

---

### 13th June 2026

#### Completed:

- Changed session checking from a layout file to proxy.ts. Now redirects to signin page if session is revoked.
- Adding extra logic for protecting routes in proxy file.

#### Issues:

- Calling 'signIn' api during testing does not work

---

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
