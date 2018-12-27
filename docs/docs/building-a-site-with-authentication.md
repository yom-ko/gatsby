---
title: Building a site with authentication
---

With Gatsby, you are able to create restricted areas in your app. For that, you
must use the concept of [client-only routes](/docs/building-apps-with-gatsby/#client-only-routes).

Using the [@reach/router](https://reach.tech/router/) library, which comes
installed with Gatsby, you can control which component will be loaded when a
certain route is called, and check for the authentication state before serving
the content.

## Prerequisites

You must know how to set up a basic Gatsby project. If you need to, check the
[main tutorial](/tutorial).

## Setting the authentication workflow

To create a common authentication workflow, you can usually follow these steps:

- [Create client-only routes](/docs/authentication-tutorial/#creating-client-only-routes),
  to tell Gatsby which routes should be rendered on demand
- [Wrap private content in a PrivateRoute component](/docs/authentication-tutorial/#controlling-private-routes),
  to check if a user is authenticated or not, therefore rendering the content or
  redirecting to another page (usually, the login page)

## Real-world example: Gatsby store

The [Gatsby store](https://github.com/gatsbyjs/store.gatsbyjs.org) uses this
approach when handling a private route:

```jsx
// import ...
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (
    !isAuthenticated() &&
    isBrowser &&
    window.location.pathname !== `/login`
  ) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/app/login`)
    return null
  }

  return (
    <Router>
      <Component {...rest} />
    </Router>
  )
}
```

## Further reading

If you want more information about authenticated areas with Gatsby, this (non-exhaustive list) may help:

- [Making a site with user authentication](/docs/authentication-tutorial), a Gatsby advanced tutorial
- [Gatsby repo simple auth example](https://github.com/gatsbyjs/gatsby/tree/master/examples/simple-auth)
- [A Gatsby email _application_](https://github.com/DSchau/gatsby-mail), using React Context API to handle authentication
- [The Gatsby store for swag and other Gatsby goodies](https://github.com/gatsbyjs/store.gatsbyjs.org)
