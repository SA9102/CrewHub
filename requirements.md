# 📄 CrewHub (Multi-Tenant Team Management Platform) — Requirements Specification

## 1. Overview

CrewHub is a multi-tenant web application designed for small teams and organisations to collaborate efficiently.

The system provides:

- Communication between team members
- Organisation and team management
- Event scheduling and calendars
- Basic team activity tracking

The platform is lightweight, scalable, and accessible via web browsers.

---

## 2. System Structure

The system is organised as:

- Organisations (top-level entity)
- Teams (within organisations)
- Users (global identity)
- Memberships (linking users to organisations/teams)

Each user belongs to at least one organisation.

---

## 3. User Roles & Permissions

### 3.1 Organisation Owner

- [x] Automatically created when a user creates an organisation
- [ ] Has full administrative access to the organisation
- [ ] Can manage organisation settings
- [ ] Can create, edit, and delete teams
- [x] Can invite and remove users
- [ ] Can assign and change user roles
- [ ] Can transfer ownership to another user

---

### 3.2 Organisation Admin

- [ ] Can manage users within the organisation
- [ ] Can create and manage teams
- [ ] Can create and edit events
- [ ] Can manage invitations
- [ ] Cannot delete the organisation or transfer ownership

---

### 3.3 Member

- [ ] Can view assigned teams
- [ ] Can participate in messaging
- [ ] Can view events and calendars
- [ ] Cannot manage users or organisation settings

---

## 4. Authentication & Accounts

- [x] Users can register and log in securely
- [x] Passwords must be securely hashed
- [ ] Sessions must persist across browser refresh
- [x] Users can log out securely
- [x] New users create or join an organisation during signup
- [ ] Email addresses must be unique globally
- [x] Invited users can join an organisation via secure invite link

---

## 5. Organisation Management

- [x] Users create a new organisation during registration
- [x] Organisations have unique identifiers
- [x] Organisation ownership is assigned automatically on creation
- [ ] Organisation settings can be updated by owners/admins

---

## 6. Team Management

- [ ] Organisations can contain multiple teams
- [ ] Teams belong to a single organisation
- [ ] Users can be assigned to multiple teams
- [ ] Teams have unique identifiers
- [ ] Teams are used to organise messaging and events

---

## 7. Memberships & Invitations

- [ ] Users are linked to organisations via membership records
- [ ] Each membership includes a role (owner, admin, member)
- [x] Users must accept invitations before joining an organisation
- [x] Invitations are sent via email with secure tokens
- [ ] Invitations can be revoked by admins
- [ ] Removed users immediately lose access

---

## 8. Messaging System

- [ ] Each team has a message feed or chat system
- [ ] Users can post messages in real time or near real time
- [ ] Messages include:
  - author
  - timestamp
  - content
- [ ] Message history is stored and retrievable
- [ ] Messages are scoped to teams

---

## 9. Events & Scheduling

- [ ] Teams can create events
- [ ] Events include:
  - title
  - description
  - date & time
  - optional location
- [ ] Events are visible in a calendar view
- [ ] Users can view upcoming events per team
- [ ] Events are scoped to teams within an organisation

---

## 10. Notifications (Optional MVP+)

- [ ] Users receive notifications for:
  - new messages
  - new events
  - organisation invitations
- [ ] Notifications are in-app for MVP

---

## 11. Data Requirements

The system must store:

- [ ] Users
- [ ] Organisations
- [ ] Teams
- [ ] Memberships (user-role-organisation relationships)
- [ ] Team memberships (user-team relationships)
- [ ] Messages
- [ ] Events
- [ ] Invitations

All data must be relational and consistent.

---

## 12. Non-Functional Requirements

### 12.1 Performance

- [ ] Pages load within acceptable web performance standards (<2s typical broadband load time)
- [ ] UI remains responsive under moderate load

---

### 12.2 Security

- [x] Passwords must be hashed securely (e.g. bcrypt or equivalent)
- [ ] Authentication required for all protected routes
- [ ] Role-based access control enforced server-side
- [ ] Input validation required on all forms
- [ ] Protection against:
  - XSS
  - SQL injection
  - CSRF (where applicable)

---

### 12.3 Usability

- [ ] Clean and minimal UI design
- [ ] Fully responsive for mobile and desktop
- [ ] Intuitive navigation between teams, messages, and calendar

---

### 12.4 Reliability

- [ ] System must persist data reliably
- [ ] Graceful error handling for API failures
- [ ] No data loss on refresh

---

## 13. Technical Constraints

- [ ] Web-based application only (no native apps required)
- [ ] Must be deployable using Docker
- [ ] REST API backend required
- [ ] PostgreSQL (or equivalent relational database)
- [ ] Component-based frontend (e.g. React)

---

## 14. Suggested Technology Stack (Non-mandatory)

- Frontend: Next.js + TypeScript
- Backend: Next.js API routes or Node.js backend
- Database: PostgreSQL + Prisma
- Auth: Auth.js (NextAuth)
- Deployment: Docker

---

## 15. Future Enhancements (Out of Scope for MVP)

- Real-time chat (WebSockets)
- File sharing system
- Video conferencing integration
- Advanced analytics dashboard
- Mobile application
- AI-assisted scheduling

---

## 16. Acceptance Criteria (MVP)

The project is considered complete when:

- [ ] Users can register, log in, and log out
- [ ] Organisations can be created and managed
- [ ] Role-based access control is enforced correctly
- [ ] Teams can be created and assigned users
- [ ] Messages can be posted and retrieved per team
- [ ] Events can be created and viewed in calendar form
- [ ] Invitations can be sent and accepted
- [ ] Application runs locally via Docker setup
- [ ] Basic documentation is provided
