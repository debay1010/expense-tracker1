# Tasks: Expense Tracker

**Input**: Design documents from `/specs/002-expense-tracker/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Tests are optional and not included as they were not requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Vite project structure in repository root
- [ ] T002 Install dependencies: Vite, sql.js, Chart.js
- [ ] T003 [P] Configure Vite build scripts in package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create SQLite database module in src/db.js
- [ ] T005 Create Expense entity class in src/expense.js
- [ ] T006 Setup basic HTML structure in src/index.html
- [ ] T007 Create main app JavaScript file in src/app.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Record Expenses (Priority: P1) 🎯 MVP

**Goal**: Allow users to add new expenses and view them in a list

**Independent Test**: Add an expense and verify it appears in the list, confirming basic CRUD functionality

### Implementation for User Story 1

- [ ] T008 [P] [US1] Create expense form component in src/components/expense-form.js
- [ ] T009 [P] [US1] Create expense list component in src/components/expense-list.js
- [ ] T010 [US1] Implement add expense functionality in src/app.js (integrates form and list)
- [ ] T011 [US1] Add form validation and error handling

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Filter and Categorize Expenses (Priority: P2)

**Goal**: Enable filtering expenses by date range, category, and amount

**Independent Test**: Add multiple expenses, apply filters, and verify correct results are shown

### Implementation for User Story 2

- [ ] T012 [P] [US2] Create filter controls component in src/components/filters.js
- [ ] T013 [US2] Implement filtering logic in src/app.js
- [ ] T014 [US2] Update expense list to display filtered results

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Visual Summaries (Priority: P3)

**Goal**: Display charts and graphs summarizing expense data

**Independent Test**: With expense data present, view charts and verify they show accurate breakdowns

### Implementation for User Story 3

- [ ] T015 [P] [US3] Create chart component in src/components/charts.js
- [ ] T016 [US3] Implement summary calculations in src/app.js
- [ ] T017 [US3] Integrate charts into main app interface

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T018 [P] Add CSS styling in src/styles.css
- [ ] T019 Code cleanup and refactoring
- [ ] T020 Run quickstart.md validation
- [ ] T021 Update documentation in README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Builds on US1 but independently testable

### Within Each User Story

- Components before integration
- Core implementation before enhancements
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Components within a story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create expense form component in src/components/expense-form.js"
Task: "Create expense list component in src/components/expense-list.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence