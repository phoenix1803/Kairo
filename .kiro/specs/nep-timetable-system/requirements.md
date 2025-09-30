# Requirements Document

## Introduction

Kairo is a comprehensive NEP (National Education Policy) timetable management system designed to automate and optimize academic scheduling for educational institutions. The system leverages AI-powered constraint solving with Gemini integration to provide natural language constraint authoring and explainability. It serves multiple user roles including students, faculty, administrators, and super admins with a mobile-first PWA approach that works offline and supports real-time notifications.

The system is built entirely on free/open-source technologies with single-command Docker deployment, making it accessible to institutions without requiring paid services or complex infrastructure.

## Requirements

### Requirement 1

**User Story:** As a student, I want to search for my timetable using my enrollment number so that I can view my weekly schedule with room numbers, faculty information, and course details.

#### Acceptance Criteria

1. WHEN a student enters their enrollment number THEN the system SHALL display their personalized timetable
2. WHEN displaying the timetable THEN the system SHALL show course code, title, room number, branch, and faculty short form for each class
3. WHEN viewing the timetable THEN the system SHALL provide both week view and day view card layouts optimized for mobile devices
4. WHEN displaying courses THEN the system SHALL color-code classes by type (Major/Minor/Lab/SEC/AEC/VAC)
5. WHEN showing faculty information THEN the system SHALL display a legend beneath the grid mapping short forms to full faculty names
6. IF the institution enables "public timetable" mode THEN students SHALL access timetables without authentication

### Requirement 2

**User Story:** As a student, I want to install the timetable app on my mobile device and receive notifications so that I can access my schedule offline and stay updated about changes.

#### Acceptance Criteria

1. WHEN accessing the student portal THEN the system SHALL provide an "Install App" button for PWA installation
2. WHEN the app is installed THEN the system SHALL function offline with cached timetable data
3. WHEN students subscribe to alerts THEN the system SHALL send push notifications and email alerts for schedule changes
4. WHEN exporting is needed THEN the system SHALL provide PDF and iCal export options
5. WHEN offline THEN the system SHALL display the last cached version of the timetable

### Requirement 3

**User Story:** As a faculty member, I want to view my personal schedule and workload summary so that I can manage my teaching commitments and plan for substitutions.

#### Acceptance Criteria

1. WHEN a faculty member enters their Faculty ID THEN the system SHALL display their personal weekly schedule
2. WHEN viewing the schedule THEN the system SHALL show workload summary with free/busy time slots
3. WHEN faculty plans leave THEN the system SHALL suggest substitute faculty based on expertise and availability
4. WHEN viewing workload THEN the system SHALL indicate if teaching load exceeds maximum limits
5. WHEN conflicts exist THEN the system SHALL highlight scheduling conflicts in the faculty view

### Requirement 4

**User Story:** As an administrator, I want to upload and manage institutional data through CSV imports so that I can maintain accurate student, course, faculty, and room information.

#### Acceptance Criteria

1. WHEN uploading CSV files THEN the system SHALL accept data for students, courses, faculty, rooms, and enrollments
2. WHEN processing uploads THEN the system SHALL show preview and validation errors before saving
3. WHEN column headers differ THEN the system SHALL allow mapping of columns to expected fields
4. WHEN data is saved THEN the system SHALL create audit log entries for all changes
5. WHEN validation fails THEN the system SHALL provide clear error messages and prevent invalid data storage

### Requirement 5

**User Story:** As an administrator, I want to define scheduling constraints using both form-based UI and natural language input so that I can easily configure complex timetabling rules.

#### Acceptance Criteria

1. WHEN creating constraints THEN the system SHALL provide a form builder with dropdowns, sliders, and time pickers
2. WHEN using natural language input THEN the system SHALL convert text to structured JSON constraints using Gemini AI
3. WHEN constraints are created THEN the system SHALL validate them against a predefined schema
4. WHEN testing constraints THEN the system SHALL provide a dry-run validator showing potential violations
5. WHEN managing rulesets THEN the system SHALL support import/export of constraint configurations in JSON format
6. WHEN constraints conflict THEN the system SHALL highlight incompatible rules and suggest resolutions

### Requirement 6

**User Story:** As an administrator, I want to generate optimized timetables automatically so that I can create conflict-free schedules that satisfy institutional constraints.

#### Acceptance Criteria

1. WHEN generating timetables THEN the system SHALL use OR-Tools CP-SAT solver for optimization
2. WHEN solving THEN the system SHALL enforce hard constraints (no faculty/room conflicts, capacity limits, student clash-free electives)
3. WHEN optimizing THEN the system SHALL minimize soft constraint penalties (gaps, load balance, room utilization)
4. WHEN processing THEN the system SHALL show real-time progress via WebSocket (Queued → Solving → LNS → Finalized)
5. WHEN completed THEN the system SHALL display result summary with objective score, conflicts resolved, and utilization metrics
6. WHEN no solution exists THEN the system SHALL identify conflicting constraints and suggest modifications

### Requirement 7

**User Story:** As an administrator, I want to run what-if simulations and compare different scheduling scenarios so that I can evaluate the impact of changes before implementation.

#### Acceptance Criteria

1. WHEN creating simulations THEN the system SHALL allow cloning of existing scenarios
2. WHEN modifying scenarios THEN the system SHALL support tweaking constraints, adding faculty leave, or changing room capacity
3. WHEN comparing scenarios THEN the system SHALL provide side-by-side grid and metrics comparison
4. WHEN viewing differences THEN the system SHALL highlight penalty differences and affected classes
5. WHEN satisfied with changes THEN the system SHALL allow promoting simulation results to final timetable
6. WHEN scenarios are created THEN the system SHALL maintain version history for tracking

### Requirement 8

**User Story:** As an administrator, I want to receive automated suggestions for timetable improvements so that I can optimize schedules with minimal manual intervention.

#### Acceptance Criteria

1. WHEN analyzing timetables THEN the system SHALL identify overloaded faculty exceeding maximum load limits
2. WHEN detecting inefficiencies THEN the system SHALL flag underutilized rooms and time slots
3. WHEN finding high-penalty assignments THEN the system SHALL suggest 1-3 alternative slot assignments
4. WHEN suggestions are available THEN the system SHALL provide one-click apply functionality
5. WHEN applying suggestions THEN the system SHALL run localized re-solve for affected areas only
6. WHEN suggestions are applied THEN the system SHALL track acceptance rates and effectiveness

### Requirement 9

**User Story:** As an administrator, I want to track all changes and maintain audit logs so that I can monitor who made what changes and when.

#### Acceptance Criteria

1. WHEN any edit occurs THEN the system SHALL create changeset and audit event records
2. WHEN viewing history THEN the system SHALL show before/after JSON for all modifications
3. WHEN tracking changes THEN the system SHALL record actor, timestamp, and affected entities
4. WHEN displaying diffs THEN the system SHALL highlight moved classes, old/new slots, and affected users
5. WHEN auditing THEN the system SHALL provide searchable logs by user, date range, and change type

### Requirement 10

**User Story:** As an administrator, I want to manage faculty leave and automatically adjust timetables so that I can handle scheduling disruptions efficiently.

#### Acceptance Criteria

1. WHEN managing leave THEN the system SHALL provide calendar view for adding date-time ranges
2. WHEN importing leave data THEN the system SHALL accept CSV uploads with bulk leave information
3. WHEN leave is added THEN the system SHALL mark affected time slots as unavailable
4. WHEN adjustments are needed THEN the system SHALL suggest substitute faculty ranked by expertise and availability
5. WHEN no substitutes exist THEN the system SHALL propose reschedule windows with minimal penalties
6. WHEN leave changes THEN the system SHALL automatically trigger timetable re-optimization

### Requirement 11

**User Story:** As an administrator, I want to send notifications to students and faculty so that I can communicate schedule changes and important updates effectively.

#### Acceptance Criteria

1. WHEN creating notifications THEN the system SHALL provide templates with placeholders for course, room, and time information
2. WHEN selecting audience THEN the system SHALL support targeting by cohort, faculty, or entire semester
3. WHEN testing notifications THEN the system SHALL provide dry-run functionality without actual sending
4. WHEN sending push notifications THEN the system SHALL use VAPID protocol for web push delivery
5. WHEN sending emails THEN the system SHALL use configurable SMTP settings
6. WHEN notifications fail THEN the system SHALL log delivery status and retry failed attempts

### Requirement 12

**User Story:** As an administrator, I want to export timetables in multiple formats so that I can share schedules with stakeholders and integrate with other systems.

#### Acceptance Criteria

1. WHEN exporting PDFs THEN the system SHALL generate program-wise, faculty-wise, and student-wise documents with institutional branding
2. WHEN creating Excel exports THEN the system SHALL provide per-program tabs with pivot-ready data and conditional formatting
3. WHEN generating iCal feeds THEN the system SHALL create per-user calendar links for integration with external calendar applications
4. WHEN exporting THEN the system SHALL include legends and explanatory information in all formats
5. WHEN bulk exporting THEN the system SHALL provide progress indicators for large dataset processing

### Requirement 13

**User Story:** As a system administrator, I want to deploy the entire system with a single command so that I can set up the timetabling solution without complex configuration.

#### Acceptance Criteria

1. WHEN deploying THEN the system SHALL use Docker Compose for single-command deployment
2. WHEN setting up THEN the system SHALL include nginx reverse proxy, frontend, backend, database, and Redis cache
3. WHEN configuring THEN the system SHALL use only free and open-source technologies
4. WHEN scaling THEN the system SHALL support horizontal scaling through container orchestration
5. WHEN maintaining THEN the system SHALL provide health checks and monitoring endpoints
6. WHEN updating THEN the system SHALL support zero-downtime deployments through rolling updates

### Requirement 14

**User Story:** As any user, I want the system to provide AI-powered explanations for scheduling decisions so that I can understand why specific time slots were assigned.

#### Acceptance Criteria

1. WHEN viewing assignments THEN the system SHALL provide "Why this slot?" explanations using Gemini AI
2. WHEN explaining decisions THEN the system SHALL compile human-readable reasons including constraint impacts
3. WHEN constraints conflict THEN the system SHALL explain trade-offs and optimization priorities
4. WHEN weights change THEN the system SHALL show how different priorities affect slot selection
5. WHEN users query decisions THEN the system SHALL respond with clear, non-technical explanations
6. WHEN AI is unavailable THEN the system SHALL fall back to structured constraint violation reports