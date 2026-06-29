### Development

#### General

Ensure:

- Responsive design
- Clean UI
- Types from Prisma
- Reduce code repetition

#### Prisma

- Check your logic for creating objects that involve relations

#### Org creation

- Verify through email before creating it

#### Invite Users

- Include link to user creation page in email
- Link should have expiry date
- After sending email invite, admin should not be able to send another email invite to that same email account unless link has expired
- When redirected through the link, user should be able to finish creating their account, and should be able to log in after that.

### Testing

- Check if user is created in database during account creation
- Test for organisation name
