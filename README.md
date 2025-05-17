# About

The Learning Management System (LMS) for Digitally Camp is an intuitive platform designed to deliver high-quality, interactive online courses in development and design. The LMS offers seamless learning experiences for students and robust management tools for instructors.

src/
│
├── components/
│ ├── Admin/
│ │ ├── AdminDashboard.jsx
│ │ ├── AddAdmin.jsx
│ │ └── ManageUsers.jsx
│ ├── User/
│ │ ├── UserDashboard.jsx
│ │ └── Profile.jsx
│ ├── Auth/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── ForgotPassword.jsx
│ └── Shared/
│ ├── Header.jsx
│ ├── Footer.jsx
│ └── Sidebar.jsx
│
├── context/
│ └── AuthContext.js
│
├── pages/
│ ├── AdminPage.jsx
│ ├── UserPage.jsx
│ ├── LoginPage.jsx
│ ├── RegisterPage.jsx
│ └── NotFoundPage.jsx
│
├── utils/
│ ├── authHelpers.js
│ ├── privateRoutes.js
│ └── api.js
│
├── App.js
├── index.js
└── routes.js

Firebase Resourse

- Availbale libraries : https://firebase.google.com/docs/web/setup#available-libraries

-Get started: https://firebase.google.com/docs/web/setup?hl=en&authuser=0&_gl=1*16gfxjo*_ga*NTAxODA2MTM1LjE3MTgxMDUyMTc.*_ga_CW55HF8NVT*MTczNTc3NzMyNC42My4xLjE3MzU3Nzc4MDcuMzMuMC4w

- WEB SDK API refrence: https://firebase.google.com/docs/reference/js/?hl=en&authuser=0&_gl=1*16gfxjo*_ga*NTAxODA2MTM1LjE3MTgxMDUyMTc.*_ga_CW55HF8NVT*MTczNTc3NzMyNC42My4xLjE3MzU3Nzc4MDcuMzMuMC4w

- Smaples https://firebase.google.com/docs/samples/?hl=en&authuser=0&_gl=1*16gfxjo*_ga*NTAxODA2MTM1LjE3MTgxMDUyMTc.*_ga_CW55HF8NVT*MTczNTc3NzMyNC42My4xLjE3MzU3Nzc4MDcuMzMuMC4w

# todo

## Add user to user collections afrter signup in.

when user login without signup, update their `user collection` with just the `email`
Redirect the user to onboarding

When user authenticate fro signup, redirect them to onboarding screen to complete the onboarding and set the `isOnboardingComplete` property `to true`

## Add course to user

- When user click on i have made payment for the first time, add the course to user. :done
- Admin approves user by update the `approved` field in the added course. :done
- Show only user approved course in dashboard. : done
- Show only user approved course lessons in lessons page. : check this solution in node.md :done
- Create a colelction for lessons: done
- Retrive user lessons under each batch and course : check this solution in node.md : done
- Admin deleted user from database
- Display LESSONS in CourseLesson UI
- Create a form for admin to add lessons to a batch

## scrape this page

https://algomite.com/blog/the-complete-list-of-javascript-event-listeners#Animation_Events
