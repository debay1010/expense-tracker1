# Skill: OpenSpec Engineer (Spec-Driven Agentic Workflow)

**Description**: Creates or updates a feature specification (`spec.md`) following OpenSpec SDD practices, incorporating User Stories ("Human Intent"), technical requirements, and mapping to tasks.md. Uses /opsx commands and kilo code modes.

**Keywords**: #openspec #sdd #agentic #spec-driven #user-stories

## Instructions

When the user asks to "start a feature" or "define a feature" ($ARGUMENTS):

### 1. Initialization (Propose & Analyze)
- Use `Architect Mode`.
- Use `/opsx:propose $ARGUMENTS`. This initiates the OpenSpec change-control folder structure (`openspec/changes/<feat>/`).
- **Analyze** the request using `Ask Mode`. Identify the core functional, technical, and human-intent components.

### 2. Spec Generation (Using Template)
- **Locate the template**: Use the contents of `.kilocode/templates/spec-template.md`.
- **Generate `spec.md`**: Inside `openspec/changes/<feat>/specs/spec.md`, draft the spec following the template structure.
- **Hierarchical Requirement -> User Story Mapping**:
    - For every **FR-xxx** (Functional Requirement), create a corresponding **User Story** in the *User Scenarios* section.
    - Ensure User Stories focus on "Human Intent" (What, Why, and User Experience).
    - Prioritize stories (P1, P2, etc.) and define "Independent Test" scenarios.

### 3. Verification & Refinement (Debug/Ask Modes)
- Run `/opsx:verify`. Check that the specification addresses all requirements.
- Use `/opsx:clarify` to ask the user to resolve any `[NEEDS CLARIFICATION]` tags from the template.
- Use `Ask Mode` to ensure the "Technical Design" aligns with the project’s existing state (e.g., confirming Tailwind/Zustand usage).

### 4. Implementation Readiness (Apply)
- Run `/opsx:apply`. This will generate the `tasks.md` file.
- Ensure each task in `tasks.md` refers back to a specific `User Story ID` (e.g., "[Story 1]").

## Handling Modifications (Requirement Changes)
If the user modifies a requirement in `spec.md`:
1.  **Analyze changes**: Run `/opsx:analyze` to see the impact of the modification on User Stories and tasks.
2.  **Update stories**: Update the relevant User Stories to align with the new Functional Requirement.
3.  **Update tasks**: Regenerate or update the `tasks.md` to reflect new/modified User Stories.
4.  **Confirm**: Run `/opsx:verify` to ensure consistency.

## Kilo Code Mode Flow
1.  **Architect Mode**: `/opsx:propose` + Drafting the `spec.md`.
2.  **Ask Mode**: Refining, clarifying with `/opsx:clarify`.
3.  **Code Mode**: `/opsx:apply` + generating tasks/code.
4.  **Debug Mode**: `/opsx:verify`.
