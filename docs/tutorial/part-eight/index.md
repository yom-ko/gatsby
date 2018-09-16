---
title: Preparing a site to go live
typora-copy-images-to: ./
---

Wow! You've come a long way! You've learned how to:

- create new Gatsby sites
- create pages and components
- style components
- add plugins to a site
- source & transform data
- use GraphQL to query data for pages
- programmatically create pages from your data

In this final section, we're going to walk through some common steps for preparing a site to go live by introducing a powerful site diagnostic tool called [Lighthouse](https://developers.google.com/web/tools/lighthouse/). Along the way, we'll introduce a few more plugins you'll often want to use in your Gatsby sites.

## Audit with Lighthouse

Quoting from the [Lighthouse website](https://developers.google.com/web/tools/lighthouse/):

> Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps (PWAs), and more.

Lighthouse is included in Chrome DevTools. Running its audit -- and then addressing the errors it finds and implementing the improvements it suggests -- is a great way to prepare your site to go live. It helps give you confidence that your site is as fast and accessible as possible.

Let's try it out!

First you need to create a production build of your Gatsby site. The Gatsby development server is optimized for making development fast; But the site that it generates, while closely resembling a production version of the site, isn't as optimized.

### ✋ Create a production build

1.  Stop the development server (if it's still running) and run:

```bash
gatsby build
```

> 💡 As you learned in [part 1](/tutorial/part-one/), this does a production build of your site and outputs the built static files into the `public` directory.

2.  View the production site locally. Run:

```bash
gatsby serve
```

Once this starts, you can now view your site at `localhost:9000`.

### Run a Lighthouse audit

Now let's run your first Lighthouse test.

1.  Open the site in Chrome (if you didn't already do so) and then open up the Chrome DevTools.

2.  Click on the "Audits" tab where you'll see a screen that looks like:

![Lighthouse audit start](./lighthouse-audit.png)

3.  Click "Perform an audit..." (All available audit types should be selected by default). Then click "Run audit". (It'll then take a minute or so to run the audit). Once the audit is complete, you should see results that look like this:

![Lighthouse audit results](./lighthouse-audit-results.png)

As you can see, Gatsby's performance is excellent out of the box but we're missing some things for PWA, Accessibility, Best Practices, and SEO that will improve your scores (and in the process make your site much more friendly to visitors and search engines).

## Add a manifest file

Looks like we have a pretty lackluster score in the "Progressive Web App" category. Let's address that.

But first, what exactly _are_ PWAs?

They are regular websites that take advantage of modern browser functionality to augment the web experience with app-like features and benefits. Check out [Google's overview](https://developers.google.com/web/progressive-web-apps/) of what defines a PWA experience.

Inclusion of a web app manifest is one of the three generally accepted [baseline requirements for a PWA](https://alistapart.com/article/yes-that-web-project-should-be-a-pwa#section1).

Quoting [Google](https://developers.google.com/web/fundamentals/web-app-manifest/):

> The web app manifest is a simple JSON file that tells the browser about your web application and how it should behave when 'installed' on the users mobile device or desktop.

[Gatsby's manifest plugin](/packages/gatsby-plugin-manifest/) configures Gatsby to create a `manifest.webmanifest` file on every site build.

### ✋ Using `gatsby-plugin-manifest`

1.  Install the plugin:

```bash
npm install --save gatsby-plugin-manifest
```

2.  Add the plugin to the `plugins` array in your `gatsby-config.js` file.

```javascript
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GatsbyJS",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "minimal-ui",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
      },
    },
  ]
}
```

That's all you need to get started with adding a web manifest to a Gatsby site. The example given reflects a base configuration -- Check out the [plugin reference](/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode) for more options.

## Add offline support

Another requirement for a website to qualify as a PWA is the use of a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). A service worker runs in the background, deciding to serve network or cached content based on connectivity, allowing for a seamless, managed offline experience.

[Gatsby's offline plugin](/packages/gatsby-plugin-offline/) makes a Gatsby site work offline, and more resistant to bad network conditions, by creating a service worker for your site.

### ✋ Using `gatsby-plugin-offline`

1.  Install the plugin:

```bash
npm install --save gatsby-plugin-offline
```

2.  Add the plugin to the `plugins` array in your `gatsby-config.js` file.

```javascript
{
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                ...
            }
        },
        'gatsby-plugin-offline'
    ]
}
```

That's all you need to get started with service workers with Gatsby.

> 💡 The manifest plugin should be listed _before_ the offline plugin so that the offline plugin can cache the created `manifest.webmanifest`.

## Add page metadata

Adding metadata to pages (such as a title or description) are key in helping search engines like Google understand your content, and decide when to surface it in search results.

[React Helmet](https://github.com/nfl/react-helmet) is a package that provides a React component interface for you to manage your [document head](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head).

Gatsby's [react helmet plugin](/packages/gatsby-plugin-react-helmet/) provides drop-in support for server rendering data added with React Helmet. Using the plugin, attributes you add to React Helmet will be added to the static HTML pages that Gatsby builds.

### ✋ Using `React Helmet` and `gatsby-plugin-react-helmet`

1.  Install both packages:

```bash
npm install --save gatsby-plugin-react-helmet react-helmet
```

2.  Add the plugin to the `plugins` array in your `gatsby-config.js` file.

```javascript
{
  plugins: [`gatsby-plugin-react-helmet`]
}
```

3.  Use `React Helmet` in your pages:

```jsx{8-12}
import React from "react"
import { Helmet } from "react-helmet"

class Application extends React.Component {
  render() {
    return (
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        ...
      </div>
    )
  }
}
```

> 💡 The above example is from the [React Helmet docs](https://github.com/nfl/react-helmet#example). Check those out for more!

## Keep making it better

In this section we've shown you a few Gatsby-specific tools to improve your site's performance and prepare to go live.

Lighthouse is a great tool for site improvements and learning -- Continue looking through the detailed feedback it provides and keep making your site better!

## That's all, folks

Well, not quite. Just for this tutorial. This is just the beginning. Keep going!

- Did you build something cool? Share it on Twitter, tag [#buildwithgatsby](https://twitter.com/search?q=%23buildwithgatsby), and [@mention us](https://twitter.com/gatsbyjs)!
- Did you write a cool blog post about what you learned? Share that, too!
- Contribute! Take a stroll through [open issues](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%93%8D+status%3A+help+wanted%22) on the gatsby repo and [become a contributor](/docs/how-to-contribute/).

Check out the ["how to contribute"](/docs/how-to-contribute/) docs for even more ideas.

We can't wait to see what you do 😄.
