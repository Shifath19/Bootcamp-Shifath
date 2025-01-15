# Clinical Trials Dashboard Documentation

## Problem Definition

The goal is to create a **Clinical Trials Dashboard** that provides an intuitive and user-friendly interface for researchers, clinicians, and regulatory professionals to explore ongoing clinical trials. The dashboard should pull data from publicly available REST APIs and display it in a dynamic and interactive table format.

**TLDR:**

**What**: Create a user-friendly dashboard to explore clinical trials.

**Why**: Empower researchers, clinicians, and regulators with easy access to crucial trial information.

**Uses**: Search, filter, and view trial details.
Personalize data views with customizable tables.
Gain insights into ongoing research.

## Users and Usage

### Target Users

1. **Researchers and Scientists**: To explore trials relevant to their fields.
2. **Pharmaceutical Companies**: To monitor trials of competitors or potential collaborators.
3. **Clinicians**: To identify new treatments for patients.
4. **Regulatory Bodies**: To review the status of clinical trials.

### How Users Interact with the Dashboard

- **Search**: Input disease names or conditions to find relevant trials.
- **View Details**: Click on a trial to view comprehensive details.
- **Customize Table**: Add or remove columns to personalize the data view.
- **Navigate Data**: Use sticky columns to keep essential information visible while scrolling.

## Plan

### Breaking Down the Problem

1. **Data Retrieval**: Connect to the clinical trials REST API to fetch trial data.
2. **Dynamic Table**: Display data in a responsive table with customizable columns.
3. **Detail View**: Provide an expanded view of each trial's detailed information.
4. **Search Functionality**: Enable users to search trials by disease or condition.

### Step-by-Step Development Plan

#### Phase 1: Research and Design

- Identify available APIs for clinical trials data.
- Design the UI wireframes for the dashboard.
- Define the schema for API response mapping.

#### Phase 2: Backend Development

- Integrate the REST API for data retrieval.
- Build endpoints for search and filtering functionalities.

#### Phase 3: Frontend Development

- Create the dynamic table with sticky column functionality.
- Implement column selector for table customization.
- Develop the detailed view page for individual trials.

#### Phase 4: Testing and Optimization

- Conduct usability tests for functionality and responsiveness.
- Optimize API calls for better performance.

#### Phase 5: Deployment

- Host the dashboard on a public platform (e.g., Render, Vercel).
- Ensure the system is accessible and scalable.

## System Design

### Component Diagram

```
[API Server] --> [Backend Service] --> [Frontend Dashboard] --> [User]
```


## Milestones

1. API integration completed.
2. Basic dynamic table implemented.
3. Detail view functionality added.
4. Column customization enabled.
5. Testing and optimization completed.
6. Deployment finalized.

## Exit Criteria

The project will be considered complete when:

1. All key functionalities (search, table customization, detail view) are implemented and bug-free.
2. The dashboard passes usability and performance tests.
3. The system is deployed and accessible to users.

## Project Deliverables

1. **Executable Application**: The Clinical Trials Dashboard.
2. **Source Code**: Hosted on a version control system (e.g., GitHub).
3. **User Guide**: Documentation on how to use the dashboard.
4. **API Documentation**: Details of the integrated REST API.
5. **Testing Report**: Results of usability and performance tests.
6. **Deployment Guide**: Instructions for setting up the system on a new server.
