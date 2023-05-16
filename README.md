# User Stories

## Users

---

### Sign Up

- As logged out and unregistered user, I want to be able to sign up for the website via a sign-up form.

  - When I'm on the `/signup` page:

    - I would like to be able to enter my personal details on a clearly laid out form.

    - I would like the website to log me in upon successful completion of the sign-up form.

  - When I enter invalid data on the sign-up form:

    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password) and allow me to try again.

### Log in

- As a logged out but registered user, I want to be able to log in to the website through a log-in form.

  - When I'm on the `/login` page:

    - I would like to be able to enter my email and password on a clearly laid out form.

    - I would like the website to log me in upon successful completion of the lob-up form.

      - So that I can seamlessly access the site's functionality

  - When I enter invalid data on the log-up form:

    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password) and allow me to try again.

- If my browser has previous session data I would like to automatically be signed in instead.

### Demo User

- As a logged out user, I would to be able to click a clearly marked `Demo User` button on the `/login` page.

  - I can click on a Demo User button to log me in and allow me access as a normal user.

### Log Out

- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.

  - While on any page of the site:

    - I can log out of my account and be redirected to the landing page.

## Reviews

---

### Viewing Reviews

- As a logged in **or** logged out user, I want to be able to see reviews for businesses.

  - On the landing page I would like to see star ratings for businesses.

  - On a business's `/details` page I would like to see full user reviews.

    - As a logged in user I would like to react to user reviews (voting/emojis).

### Leaving and Updating Reviews

- As a logged in user I would like to create reviews for businesses.

  - I would like to be able to press a button on a business `/details` page and have a `/review` form pop up.

    - If I make an error on the form I would like messages to inform me how to fix my error.

- As a logged in user I would like to be able to update/delete my `/review`.

  - I would like to be able to do this on the relevant business `/details` page.

  - I would like to be able to do this on a page that includes all my reviews `/user/reviews`.

Note: This is a living document and new user stories will be added as the project progresses.
