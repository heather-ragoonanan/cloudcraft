# User Stories - CloudCraft Interview Question Bank

**Project:** CloudCraft
**Version:** 1.0
**Last Updated:** February 2026
**Target Audience:** Interview Candidates & Interviewers

---

## Table of Contents

1. [Overview](#overview)
2. [User Personas](#user-personas)
3. [Epic 1: Authentication & Access Control](#epic-1-authentication--access-control)
4. [Epic 2: Question Discovery & Browsing](#epic-2-question-discovery--browsing)
5. [Epic 3: AI-Powered Interview Practice](#epic-3-ai-powered-interview-practice)
6. [Epic 4: Question Management (Admin)](#epic-4-question-management-admin)
7. [Epic 5: User Experience & Accessibility](#epic-5-user-experience--accessibility)
8. [Non-Functional Requirements](#non-functional-requirements)
9. [Success Metrics](#success-metrics)

---

## Overview

CloudCraft is an interview preparation platform that enables candidates to practice technical interview questions with real-time AI feedback. The platform provides a centralized question bank organized by category and difficulty, with an AI-powered coach ("Marcus") that evaluates answers and provides personalized feedback.

### Key Features
- 🔐 Secure authentication via AWS Cognito
- 📚 Searchable question bank with filtering
- 🤖 AI-powered answer evaluation (Marcus - AWS Bedrock Claude 3.7 Sonnet)
- 🎯 Practice mode with instant feedback
- 📊 Categorized questions by competency and difficulty
- 💪 Personalized strengths and improvement areas
- 🌐 Multi-environment deployment (Alpha & Production)

---

## User Personas

### 1. **Sarah - Interview Candidate (Primary User)**
- **Role:** L4 Systems Engineer Candidate
- **Goal:** Prepare effectively for technical interviews
- **Needs:**
  - Access to relevant technical questions
  - Practice answering in a safe environment
  - Immediate feedback on answer quality
  - Understanding of strengths and weaknesses
  - Guidance on improvement areas

### 2. **Marcus - AI Interview Coach (AI Agent)**
- **Role:** AWS Bedrock-powered evaluation assistant
- **Goal:** Provide constructive, accurate feedback on candidate answers
- **Capabilities:**
  - Evaluate technical accuracy
  - Identify answer strengths
  - Suggest improvements
  - Provide encouraging, actionable feedback
  - Score answers on 0-100 scale

### 3. **David - Technical Interviewer (Admin User)**
- **Role:** Senior Systems Engineer / Hiring Manager
- **Goal:** Maintain high-quality interview question bank
- **Needs:**
  - Create and manage interview questions
  - Categorize questions by competency and difficulty
  - Ensure questions remain relevant and up-to-date
  - Control access to sensitive content

### 4. **Jamie - Platform Administrator**
- **Role:** DevOps Engineer
- **Goal:** Ensure platform reliability and security
- **Needs:**
  - Monitor system health and performance
  - Manage deployments across environments
  - Review security and access logs
  - Maintain infrastructure as code

---

## Epic 1: Authentication & Access Control

### User Story 1.1: Sign Up
**As a** candidate
**I want to** create an account with my email and password
**So that** I can access the interview question bank

**Acceptance Criteria:**
- ✅ User can register with email and password
- ✅ Password must meet security requirements (min 8 chars, uppercase, lowercase, number, special char)
- ✅ User receives confirmation email
- ✅ Account is managed via AWS Cognito
- ✅ User is redirected to login after successful signup

**Technical Implementation:**
- AWS Cognito User Pool
- Email verification enabled
- Password policy enforcement

---

### User Story 1.2: Login
**As a** registered user
**I want to** log in with my credentials
**So that** I can access my personalized experience

**Acceptance Criteria:**
- ✅ User can login with email and password
- ✅ JWT token is issued upon successful authentication
- ✅ Token expires after session (configurable timeout)
- ✅ User is redirected to question bank after login
- ✅ Invalid credentials show appropriate error message

**Technical Implementation:**
- Cognito authentication
- JWT token validation via API Gateway
- Secure token storage (httpOnly cookies or localStorage)

---

### User Story 1.3: Change Password
**As a** logged-in user
**I want to** change my password
**So that** I can maintain account security

**Acceptance Criteria:**
- ✅ User can update password from account settings
- ✅ Must provide current password for verification
- ✅ New password must meet security requirements
- ✅ User receives confirmation of password change
- ✅ Session remains active after password change

**Technical Implementation:**
- Cognito ChangePassword API
- Client-side password strength indicator
- Secure password transmission (HTTPS)

---

### User Story 1.4: Role-Based Access Control
**As a** system administrator
**I want to** enforce role-based permissions
**So that** only authorized users can manage questions

**Acceptance Criteria:**
- ✅ Users are assigned roles (standard user vs admin)
- ✅ Admin users can create, edit, delete questions
- ✅ Standard users can only view and practice questions
- ✅ API endpoints validate user roles before operations
- ✅ Unauthorized actions return 403 Forbidden

**Technical Implementation:**
- Cognito user groups (Admin, User)
- Lambda function role checks
- API Gateway authorization

---

## Epic 2: Question Discovery & Browsing

### User Story 2.1: Browse All Questions
**As a** candidate
**I want to** view all available interview questions
**So that** I can explore topics to practice

**Acceptance Criteria:**
- ✅ Questions are displayed in card format
- ✅ Each card shows: question text, difficulty, category
- ✅ Questions load efficiently (pagination if needed)
- ✅ Loading state is shown while fetching data
- ✅ Error handling for failed requests

**Technical Implementation:**
- DynamoDB Scan operation
- Lambda function to retrieve questions
- React frontend with loading states
- API Gateway REST endpoint: `GET /questions`

---

### User Story 2.2: Search Questions
**As a** candidate
**I want to** search questions by keyword
**So that** I can quickly find relevant topics

**Acceptance Criteria:**
- ✅ Search box at top of question list
- ✅ Real-time filtering as user types
- ✅ Search matches question text, category, and competency
- ✅ Case-insensitive matching
- ✅ Results update instantly (client-side filtering)

**Technical Implementation:**
- Client-side filtering using useMemo
- Debounced search input
- Highlighted search terms (optional)

---

### User Story 2.3: Filter by Category
**As a** candidate
**I want to** filter questions by category
**So that** I can focus on specific competency areas

**Acceptance Criteria:**
- ✅ Dropdown showing all available categories
- ✅ "All" option to show all questions
- ✅ Categories auto-populate from existing questions
- ✅ Filter persists during session
- ✅ Clear indication when filter is active

**Categories:**
- Technical
- Behavioral
- System Design
- AWS Fundamentals
- Networking
- Security

**Technical Implementation:**
- Extract unique categories from question data
- Client-side filtering with React state

---

### User Story 2.4: Filter by Difficulty
**As a** candidate
**I want to** filter questions by difficulty level
**So that** I can practice at my skill level

**Acceptance Criteria:**
- ✅ Dropdown showing: All, Easy, Medium, Hard
- ✅ Difficulty badges color-coded (green, yellow, red)
- ✅ Filter works in combination with category filter
- ✅ Results count shows filtered total

**Difficulty Levels:**
- **Easy:** Foundational concepts
- **Medium:** Practical application
- **Hard:** Complex scenarios and optimization

**Technical Implementation:**
- Multi-filter logic with AND conditions
- Visual difficulty indicators (CSS classes)

---

### User Story 2.5: View Question Details
**As a** candidate
**I want to** see detailed information about a question
**So that** I can understand the context and expectations

**Acceptance Criteria:**
- ✅ Question text displayed prominently
- ✅ Category and difficulty clearly shown
- ✅ Competency type indicated
- ✅ Reference answer available (optional, can be hidden)
- ✅ "Practice Answer" button to start evaluation

**Technical Implementation:**
- Modal overlay for question details
- Expandable reference answer (details tag)
- Click-to-practice workflow

---

## Epic 3: AI-Powered Interview Practice

### User Story 3.1: Submit Practice Answer
**As a** candidate
**I want to** submit my answer to a question
**So that** I can receive AI-powered feedback

**Acceptance Criteria:**
- ✅ Multi-line text area for answer input
- ✅ Character counter (optional)
- ✅ "Get AI Feedback" button
- ✅ Loading state while AI evaluates
- ✅ Cannot submit empty answer

**Technical Implementation:**
- Textarea component with controlled state
- API call to `/answers` endpoint
- AWS Bedrock (Claude 3.7 Sonnet) integration

---

### User Story 3.2: Receive AI Evaluation
**As a** candidate
**I want to** receive detailed feedback from Marcus (AI Coach)
**So that** I can understand my performance and improve

**Acceptance Criteria:**
- ✅ Evaluation shows correctness (correct/needs improvement)
- ✅ Numerical score out of 100
- ✅ List of strengths identified
- ✅ List of improvements needed
- ✅ Actionable suggestions for better answers
- ✅ Personal encouragement from Marcus

**Evaluation Structure:**
```json
{
  "is_correct": true,
  "score": 85,
  "strengths": ["Clear explanation", "Correct technical terms"],
  "improvements": ["Add more examples", "Discuss edge cases"],
  "suggestions": ["Research AWS Well-Architected Framework", "Practice with real scenarios"],
  "marcus_comment": "Great start! Your understanding is solid..."
}
```

**Technical Implementation:**
- Lambda function: `evaluate_answer.py`
- AWS Bedrock Runtime API
- Model: `anthropic.claude-3-7-sonnet-20250219-v1:0`
- Structured JSON response parsing

---

### User Story 3.3: View Feedback Breakdown
**As a** candidate
**I want to** see my evaluation results in a clear, organized format
**So that** I can easily understand what to improve

**Acceptance Criteria:**
- ✅ Visual score indicator (badge or progress bar)
- ✅ Color-coded correctness indicator (green/yellow)
- ✅ Sections for: Strengths, Improvements, Suggestions
- ✅ Marcus's personal comment highlighted
- ✅ "Try Again" button to submit new answer

**UI Layout:**
- Score badge (prominent)
- Correctness indicator
- Collapsible sections for feedback categories
- Marcus's avatar/icon next to comment

**Technical Implementation:**
- React component state for evaluation display
- CSS styling for feedback sections
- Modal remains open after evaluation

---

### User Story 3.4: Practice Multiple Times
**As a** candidate
**I want to** retry answering the same question
**So that** I can improve my response based on feedback

**Acceptance Criteria:**
- ✅ "Try Again" button clears previous answer and feedback
- ✅ Question remains the same
- ✅ Previous evaluation is cleared
- ✅ Can submit new answer for re-evaluation
- ✅ No limit on retry attempts

**Technical Implementation:**
- Reset evaluation state
- Clear textarea
- Maintain modal context

---

### User Story 3.5: Access Reference Answer
**As a** candidate
**I want to** view the reference answer after attempting
**So that** I can compare my approach with the recommended solution

**Acceptance Criteria:**
- ✅ Reference answer hidden by default (no cheating)
- ✅ Expandable "Reference Answer" section
- ✅ Click to reveal full answer
- ✅ Clearly formatted and readable
- ✅ Available before or after evaluation

**Technical Implementation:**
- HTML `<details>` tag for native expand/collapse
- Reference answer stored in question data
- Optional field (not all questions have reference answers)

---

## Epic 4: Question Management (Admin)

### User Story 4.1: Create New Question (Future)
**As an** admin user
**I want to** add new interview questions
**So that** the question bank stays current and comprehensive

**Acceptance Criteria:**
- ⏳ Form with fields: question text, category, difficulty, competency, reference answer
- ⏳ Validation for required fields
- ⏳ Preview before submission
- ⏳ Confirmation on successful creation
- ⏳ Question appears immediately in question list

**Technical Implementation (Planned):**
- `POST /questions` endpoint
- Lambda function: `questions_handler.py`
- DynamoDB PutItem operation
- Admin role validation

---

### User Story 4.2: Edit Existing Question (Future)
**As an** admin user
**I want to** update question details
**So that** I can correct errors or improve clarity

**Acceptance Criteria:**
- ⏳ Edit button on question cards (admin only)
- ⏳ Pre-populated form with existing data
- ⏳ Validation on update
- ⏳ Version tracking (optional)
- ⏳ Audit log of changes

**Technical Implementation (Planned):**
- `PUT /questions/{id}` endpoint
- UpdateItem with conditional expressions
- CloudWatch logging for audit trail

---

### User Story 4.3: Delete Question (Future)
**As an** admin user
**I want to** remove outdated or incorrect questions
**So that** candidates only see high-quality content

**Acceptance Criteria:**
- ⏳ Delete button with confirmation dialog
- ⏳ "Are you sure?" prompt
- ⏳ Soft delete option (mark as archived)
- ⏳ Audit log entry
- ⏳ Immediate removal from user view

**Technical Implementation (Planned):**
- `DELETE /questions/{id}` endpoint
- Soft delete: `archived: true` flag
- Hard delete: DynamoDB DeleteItem

---

### User Story 4.4: Manage User Accounts (Future)
**As an** admin
**I want to** promote users to admin role
**So that** I can delegate question management responsibilities

**Acceptance Criteria:**
- ⏳ Admin dashboard with user list
- ⏳ "Promote to Admin" action
- ⏳ Role change reflected immediately
- ⏳ Audit log of role changes

**Technical Implementation (Planned):**
- Cognito AdminAddUserToGroup API
- Lambda function: `admin_create_user.py`
- Group-based permissions

---

## Epic 5: User Experience & Accessibility

### User Story 5.1: Responsive Design
**As a** user on any device
**I want to** access CloudCraft on desktop, tablet, and mobile
**So that** I can practice anywhere, anytime

**Acceptance Criteria:**
- ✅ Desktop layout (>1024px)
- ✅ Tablet layout (768px - 1024px)
- ✅ Mobile layout (<768px)
- ✅ Touch-friendly buttons
- ✅ Readable font sizes on small screens

**Technical Implementation:**
- CSS media queries
- Flexbox/Grid layouts
- Responsive typography

---

### User Story 5.2: Loading States
**As a** user
**I want to** see clear feedback while content is loading
**So that** I know the system is working

**Acceptance Criteria:**
- ✅ Spinner animation during data fetch
- ✅ "Loading questions..." message
- ✅ Skeleton screens (optional)
- ✅ Disabled buttons during processing
- ✅ "Marcus is evaluating..." during AI feedback

**Technical Implementation:**
- React loading state management
- CSS animations for spinners
- Conditional rendering

---

### User Story 5.3: Error Handling
**As a** user
**I want to** see helpful error messages when something goes wrong
**So that** I understand what happened and can take action

**Acceptance Criteria:**
- ✅ User-friendly error messages (no stack traces)
- ✅ Retry button for failed requests
- ✅ Network error detection
- ✅ Authentication error handling (redirect to login)
- ✅ API error messages displayed clearly

**Error Types:**
- Network errors
- Authentication failures (401)
- Authorization failures (403)
- Not found errors (404)
- Server errors (500)

**Technical Implementation:**
- Try-catch blocks in async functions
- Error state in React components
- Toast notifications (optional)

---

### User Story 5.4: Accessibility (WCAG 2.1)
**As a** user with disabilities
**I want to** navigate and use CloudCraft with assistive technologies
**So that** I have equal access to interview preparation

**Acceptance Criteria:**
- ⏳ Keyboard navigation support
- ⏳ Screen reader compatibility
- ⏳ ARIA labels on interactive elements
- ⏳ Sufficient color contrast (4.5:1 minimum)
- ⏳ Focus indicators visible
- ⏳ Alt text for images

**Technical Implementation (Planned):**
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard event handlers
- Color contrast testing

---

### User Story 5.5: Multi-Environment Support
**As a** developer/tester
**I want to** test features in Alpha before Production
**So that** I can verify changes without impacting users

**Acceptance Criteria:**
- ✅ Alpha environment: ``
- ✅ Production environment: ``
- ✅ Separate Cognito user pools per environment
- ✅ Separate DynamoDB tables per environment
- ✅ Environment indicator in UI (optional)

**Technical Implementation:**
- AWS CDK environment parameters
- CloudFront custom domains
- Route53 DNS configuration

---

## Non-Functional Requirements

### Performance
- **Page Load:** < 3 seconds on 3G connection
- **API Response:** < 2 seconds for question list
- **AI Evaluation:** < 10 seconds for feedback
- **CDN Cache:** CloudFront edge caching for static assets

### Security
- ✅ HTTPS enforced (HTTP redirects to HTTPS)
- ✅ Authentication required for all API endpoints
- ✅ JWT token validation on every request
- ✅ IAM least privilege for Lambda functions
- ✅ CloudTrail logging for audit trail
- ✅ Secrets managed via AWS Secrets Manager (if applicable)

### Reliability
- **Uptime:** 99.9% availability target
- **Error Rate:** < 1% failed requests
- **Recovery:** Auto-recovery via Lambda retries
- **Backup:** DynamoDB point-in-time recovery enabled

### Scalability
- **Concurrent Users:** Supports 1000+ concurrent users
- **Auto-scaling:** Lambda scales automatically
- **DynamoDB:** On-demand capacity mode
- **API Gateway:** Default throttling limits

### Monitoring & Observability
- ✅ CloudWatch Logs for Lambda functions
- ✅ CloudWatch Metrics for API Gateway
- ✅ X-Ray tracing (optional)
- ✅ CloudWatch Alarms for errors
- ✅ Structured JSON logging

### Compliance
- **Data Residency:** All data stored in `eu-west-2` (London)
- **GDPR:** User data minimization, right to deletion
- **Authentication:** Industry-standard OAuth 2.0 / OpenID Connect (Cognito)

---

## Success Metrics

### User Engagement
- **Active Users:** Track daily/weekly active users
- **Questions Practiced:** Average questions per session
- **AI Feedback Utilization:** % of questions that get evaluated

### AI Performance
- **Evaluation Time:** Average time for Marcus feedback
- **User Satisfaction:** Feedback quality ratings (future survey)
- **Accuracy:** Manual review of AI evaluations (spot checks)

### System Health
- **API Latency:** P50, P95, P99 response times
- **Error Rate:** 4XX and 5XX error percentages
- **Availability:** Uptime percentage
- **Cost:** AWS monthly spend per user

### Business Goals
- **Question Bank Growth:** Number of questions added per month
- **User Retention:** % of users returning after 7 days
- **Candidate Preparation:** Time spent practicing before interviews
- **Interview Success:** Correlation with interview outcomes (future)

---

## Future Enhancements (Roadmap)

### Phase 2
- 📝 Admin question management UI (CRUD operations)
- 📊 User progress tracking and analytics dashboard
- 🏆 Gamification: badges, streaks, leaderboards
- 💬 Peer review: share answers with other candidates
- 🎥 Video answer practice (future AI video evaluation)

### Phase 3
- 🧪 Mock interview simulator (timed questions)
- 📈 Performance analytics and weak area identification
- 🤝 Team collaboration features for hiring committees
- 🌍 Multi-language support
- 🔔 Notifications and reminders

### Phase 4
- 🎙️ Voice answer practice (speech-to-text)
- 📱 Mobile native apps (iOS/Android)
- 🔗 Integration with HR systems (Workday, Taleo)
- 🤖 Advanced AI: Context-aware follow-up questions
- 📚 Learning paths and curated question sets

---

## Appendix

### Competency Types
- **Leadership Principles:** Amazon LP-based questions
- **System Design:** Architecture and scalability
- **Technical Depth:** Deep-dive technical questions
- **Behavioral:** STAR method situational questions
- **Problem Solving:** Algorithm and logic challenges

### Question Categories
- AWS Fundamentals
- Networking
- Security
- Linux/Systems Administration
- CI/CD & DevOps
- Databases
- Monitoring & Observability
- Troubleshooting

### Technology Stack Summary
- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Python 3.14, AWS Lambda
- **Database:** DynamoDB
- **AI:** AWS Bedrock (Claude 3.7 Sonnet)
- **Authentication:** AWS Cognito
- **Infrastructure:** AWS CDK (TypeScript)
- **CI/CD:** GitHub Actions
- **Hosting:** S3 + CloudFront
- **Monitoring:** CloudWatch, CloudTrail

---

**Document Version:** 1.0
**Last Updated:** February 2026
**Owner:** Andreas Papasavvas (apaps)
**Status:** Living Document (Updated as features evolve)
