# EPA Project User Stories
**CloudCraft - Interview Question Bank**

---

## Table of Contents
1. [Must Have](#must-have)
2. [Should Have](#should-have)
3. [Nice to Have](#nice-to-have)

---

## Must Have

### End Users
#### Story 1: Create Account and Access Questions
**I want to** create an account and log in **so that** I can access the interview question bank and prepare for my interviews.

**Acceptance Criteria:**
- I can sign up using my email address
- I receive a temporary password via email that I must change on first login
- I can log in with my email and password
- I can change my password from my account settings if needed
- I cannot access questions without logging in (shown a login prompt)
- My session stays logged in until I log out or it expires

---

#### Story 2: Find Relevant Questions
**I want to** search and filter interview questions by category and difficulty **so that** I can practice topics relevant to my target role and skill level.

**Acceptance Criteria:**
- Questions display in browsable cards with text, category, and difficulty
- Search box filters questions by keyword (question text, category, competency)
- Filter dropdown for category (AWS, System Design, Security, etc.)
- Filter dropdown for difficulty (Easy, Medium, Hard)
- Multiple filters work together (AND logic)
- Results count shows "X of Y questions"
- Filters work in real-time without page reload

---

### Developers
#### Story 1: Secure Backend API
**I want to** implement secure authentication and authorization with AWS Cognito **so that** only authorized users can access protected resources and data.

**Acceptance Criteria:**
- Cognito user pool configured with password policies
- API Gateway validates JWT tokens on all requests
- Unauthenticated requests return 401
- Lambda functions use least-privilege IAM roles
- All traffic enforced over HTTPS
- Server-side input validation on all endpoints
- CORS configured properly for frontend domain

---

#### Story 2: Scalable Data Layer
**I want to** use DynamoDB for question storage **so that** the system scales efficiently and handles large question sets reliably.

**Acceptance Criteria:**
- Questions stored in DynamoDB with on-demand capacity
- Lambda functions retrieve questions via Scan operation
- Pagination handled for large datasets
- DynamoDB types converted properly (sets → arrays)
- GET /questions returns all questions
- GET /questions/{id} returns single question
- Structured JSON logging for all database operations

---

#### Story 3: Infrastructure as Code
**I want to** define infrastructure using AWS CDK **so that** environments are reproducible, version-controlled, and deployable via CI/CD.

**Acceptance Criteria:**
- All AWS resources defined in TypeScript CDK code
- Separate stacks for Alpha and Production environments
- GitHub Actions deploys infrastructure automatically
- Trivy scans CDK dependencies for vulnerabilities
- Production deployments require manual approval
- CloudWatch alarms configured for Lambda errors and API 5xx errors
- Structured logging to CloudWatch with request IDs

---

### Admin Users
#### Story 1: Manage Question Bank
**I want to** manage interview questions with proper authorization **so that** the question bank remains high-quality and only authorized users can make changes.

**Acceptance Criteria:**
- Admin users assigned to Cognito "Admin" group
- Admin Dashboard UI accessible at `/admin` route (visible only to Admin group members)
- Create new questions with form validation (question_text, category, difficulty required; reference_answer optional)
- Edit existing questions in modal with pre-filled data
- Delete questions with confirmation
- Search and filter questions (same as regular question bank)
- Category is free-text input (users can type any category)
- Difficulty is dropdown (Easy, Medium, Hard)
- Non-admin users receive 403 Forbidden for POST/PUT/DELETE operations
- GET operations available to all authenticated users
- Admin actions logged to CloudWatch with user identity and timestamp
- Role checks enforced in Lambda before DynamoDB writes
- Admin nav link only visible to users in Admin Cognito group
- Backend endpoints:
  - POST /questions - Create question (admin only)
  - PUT /questions/{id} - Update question (admin only)
  - DELETE /questions/{id} - Delete question (admin only)
  - GET /questions - List questions (all users)
  - GET /questions/{id} - Get single question (all users)

---

#### Story 2: Delegate Admin Responsibilities
**I want to** assign users to admin groups **so that** question management responsibilities can be shared across the team.

**Acceptance Criteria:**
- Script exists to add users to Cognito Admin group (`admin_create_user.py`)
- Group membership reflected in JWT claims
- Admin permissions take effect immediately after group assignment

---

### Platform Administrators
#### Story 1: Multi-Environment Infrastructure
**I want to** manage separate Alpha and Production environments **so that** changes can be tested safely before reaching end users.

**Acceptance Criteria:**
- Separate Cognito user pools for Alpha and Production
- Separate DynamoDB tables per environment
- Separate API Gateway instances per environment
- Custom domains:  and 
- CloudFront distributions per environment
- S3 buckets per environment
- Changes to Alpha do not affect Production (full isolation)

---

#### Story 2: Automated CI/CD Pipeline
**I want to** automate deployments with quality gates **so that** releases are consistent, tested, and secure before reaching production.

**Acceptance Criteria:**
- GitHub Actions triggers on push to main branch
- Parallel pipelines for frontend and backend
- Frontend pipeline: ESLint → TypeScript check → Trivy scan → Alpha → Manual approval → Production
- Backend pipeline: Unit tests → CDK check → Trivy scan → Alpha → Integration tests → Manual approval → Production
- Security scans fail build if high/critical vulnerabilities found
- Manual approval required before production deployment
- Deployment failures roll back automatically (or prevent promotion)

---

#### Story 3: Monitoring and Observability
**I want to** monitor system health with alarms and centralized logging **so that** I can detect and resolve issues quickly.

**Acceptance Criteria:**
- CloudWatch Logs capture all Lambda function output
- Structured JSON logging with request IDs
- CloudWatch alarms configured for:
  - Lambda errors (> threshold)
  - Lambda throttles
  - Lambda duration (high latency)
  - API Gateway 5xx errors
- Alarms send notifications via SNS (email)
- CloudTrail enabled for AWS API audit trail
- Logs retained for minimum 30 days

---

#### Story 4: Security and Cost Management
**I want to** enforce security best practices and optimize costs **so that** the application is secure and cost-efficient.

**Acceptance Criteria:**
- IAM roles follow least-privilege principle
- HTTPS enforced on CloudFront (HTTP redirects)
- DynamoDB encryption at rest enabled
- S3 bucket encryption enabled
- Serverless architecture (Lambda, DynamoDB on-demand) scales with usage
- CloudFront caching reduces origin requests
- Cost Explorer available for manual cost review

---

## Should Have

### End Users
#### Story 3: Track Progress
**I want to** see which questions I have already answered **so that** I can track my preparation progress and avoid repeating questions unnecessarily.

**Acceptance Criteria:**
- Answered questions are visually marked (e.g. checkmark or badge on card)
- Progress summary shows "X of Y questions attempted"
- Progress persists across sessions
- User can reset their progress

---

#### Story 4: Bookmark Questions
**I want to** save questions to a personal list **so that** I can revisit important or difficult questions later.

**Acceptance Criteria:**
- Bookmark icon on each question card
- Bookmarked questions accessible from a dedicated view
- Bookmarks persist across sessions
- User can remove bookmarks

---

### Developers
#### Story 4: Frontend Error Handling
**I want to** handle API errors gracefully in the frontend **so that** users receive clear feedback when something goes wrong rather than a broken UI.

**Acceptance Criteria:**
- Network/API errors display a user-friendly error message
- Loading states shown while data is being fetched
- Empty states shown when no questions match filters
- Errors logged to CloudWatch via structured logging

---

### Admin Users
#### Story 3: Bulk Question Import
**I want to** import multiple questions at once from a CSV or JSON file **so that** I can populate the question bank efficiently without entering questions one by one.

**Acceptance Criteria:**
- Admin can upload a CSV or JSON file from the Admin Dashboard
- File is validated before import (required fields, allowed difficulty values)
- Validation errors reported per row/entry before committing
- Successfully imported questions appear immediately in the question bank
- Import action logged to CloudWatch with user identity and count

---

### Platform Administrators
#### Story 5: Cost Alerting
**I want to** receive alerts when AWS costs exceed defined thresholds **so that** unexpected spend is caught early before it becomes significant.

**Acceptance Criteria:**
- AWS Budgets configured with monthly cost threshold
- Alert sent via SNS email when 80% and 100% of budget is reached
- Separate budgets for Alpha and Production environments
- Budget configuration defined in CDK

---

## Nice to Have

### End Users
#### Story 3: Practice with AI Feedback
**I want to** submit my answers and receive instant AI-powered evaluation **so that** I can understand my strengths, improve weaknesses, and build confidence.

**Acceptance Criteria:**
- User can type/paste answer in multi-line text area
- "Get AI Feedback" button submits answer to Marcus (AWS Bedrock)
- Loading state shows "Marcus is evaluating..." while processing
- Evaluation returns within 10 seconds
- Feedback displays: score (0-100), correctness indicator, strengths list, improvements list, suggestions list, personal comment
- User can click "Try Again" to clear and resubmit a new answer
- Optional reference answer available (expandable, hidden by default)

---

### Developers
#### Story 2: AI-Powered Answer Evaluation
**I want to** integrate AWS Bedrock for answer evaluation **so that** candidates receive instant, intelligent feedback on their interview answers.

**Acceptance Criteria:**
- Lambda function invokes Bedrock Claude 3.7 Sonnet model
- Evaluation prompt tailored to competency type (LP, System Design, Technical)
- AI response parsed and validated as JSON
- Response includes: score, correctness, strengths, improvements, suggestions, comment
- Evaluation completes in <10 seconds
- Graceful error handling if AI service unavailable
- Evaluation metrics logged (latency, errors)

---

## Appendix

### User Personas Summary
1. **End User (Candidate):** Prepares for interviews by practicing questions and receiving AI feedback.
2. **Developer:** Builds and maintains the application, ensuring security, reliability, and code quality.
3. **Admin User:** Manages interview questions, ensuring content is accurate and up-to-date.
4. **Platform Administrator:** Manages infrastructure, deployments, monitoring, and security.

**Document Version:** 2.2
**Last Updated:** February 22, 2026
**Updated By:** Antho103
