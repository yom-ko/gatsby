---
title: "Deploying Gatsby"
---

## Tutorials for deploying on different static site hosts

- [Netlify](/docs/deploy-gatsby/#netlify)
- [S3/Cloudfront](/docs/deploy-gatsby/#amazon-s3-and-cloudfront)
- [GitHub Pages](/docs/deploy-gatsby/#github-pages)
- [GitLab Pages](/docs/deploy-gatsby/#gitlab-pages)
- [Heroku](/docs/deploy-gatsby/#heroku)
- [Now](/docs/deploy-gatsby/#now)
- [Aerobatic](/docs/deploy-gatsby/#aerobatic)

## Netlify

Netlify is an excellent option for deploying Gatsby sites. Netlify is a unified
platform that automates your code to create high-performant, easily maintainable
sites and web apps. They provide continuous deployment (Git-triggered builds),
an intelligent, global CDN, full DNS (including custom domains), automated
HTTPS, asset acceleration, and a lot more.

Their free tier includes unlimited personal and commercial projects, HTTPS,
continuous deployment from public or private repos and more.

### Deploying to Netlify

To deploy your Gatsby site to Netlify, go to the [create a new
site](https://app.netlify.com/start) page, select your project repo from GitHub,
GitLab, or Bitbucket, and follow the prompts.

## Amazon S3 and Cloudfront

If you decide to host your Gatsby site on S3 with Cloudfront as CDN, you should
change the "Origin Domain Name" on the Cloudfront panel with the real URL of
your S3 bucket: **examplewebsite.com.s3-website-eu-west-1.amazonaws.com**
replacing the default URL suggested by Amazon
**examplewebsite.com.s3.amazonaws.com**.

Without this change,
[S3 doesn't look for index.html files when serving "clean urls"](https://forums.aws.amazon.com/message.jspa?messageID=314454).

## GitHub Pages

### Deploying a project page

You can deploy sites on GitHub Pages with or without a custom domain. If you
choose to use the default setup (without a custom domain), or if you create a
project site, you will need to setup your site with
[path prefixing](/docs/path-prefix/).

On GitHub, you get one site per GitHub account and organization, and unlimited
project sites. So it is most likely you will be creating a project site. If you
do not have an existing repository on GitHub that you plan to use, take the time
now to create a new repository on GitHub.

### Use the NPM package `gh-pages` for deploying

First add **gh-pages** as a `devDependency` of your site and create an npm
script to **deploy** your project by running `npm install gh-pages --save-dev`.

Then add a `deploy` script in your `package.json` file.

```json
"scripts": {
  "deploy": "gatsby build --prefix-paths && gh-pages -d public",
}
```

In the `gatsby-config.js`, set the `pathPrefix` to be added to your site's link
paths. The `pathPrefix` should be the project name in your repository. (ex.
`https://github.com/username/project-name` - your `pathPrefix` should be
`/project-name`). See
[the docs page on path prefixing for more](/docs/path-prefix/).

```js
module.exports = {
  pathPrefix: `/project-name`,
}
```

If you have not yet initialized a git repository in your working gatsby site
repo, set up git in your project with `git init`. Then tell Gatsby where to
deploy your site by adding the git remote address with https or ssh. Here is how
to do it with https: `git remote add origin git@github.com:username/project-name.git`.

Now run `npm run deploy`. Preview changes in your GitHub page
`https://username.github.io/project-name/`. You can also find the link to your
site on GitHub under `Settings` > `GitHub Pages`.

If this is not successful, make sure that `gh-pages` is set as the source branch in your repository's `Settings` > `GitHub Pages` and then re-run `npm run deploy`.

### Deploying a user/organization site

Unlike project pages, user/organization sites on GitHub live in a special
repository dedicated to files for the site. The sites must be published from the
`master` branch of the repository which means the site source files should be
kept in a branch named `source` or something similar. We also don't need to
prefix links like we do with project sites.

```json
"scripts": {
  "deploy": "gatsby build && gh-pages -b master -d public",
}
```

The repository for these sites requires a special name. See
https://help.github.com/articles/user-organization-and-project-pages/ for
documentation on naming your site's repository.

If you wish to link your custom domain with your `user.github.io` repo, you will need
a `CNAME` file inside the `static` folder at the root directory level with the your
custom domain url inside, like so:

```
your-custom-domain.com
```

## GitLab Pages

GitLab Pages are similar to GitHub Pages, perhaps even easier to setup. It also
supports custom domain names and SSL certificates. The process of setting GitLab
pages up is made a lot easier with GitLab's included continuous integration
platform.

Create a new GitLab repository, initialize your Gatsby project folder if you
haven't already, and add the GitLab remote.

```bash
git init
git remote add origin git@gitlab.com:examplerepository
git add .
git push -u origin master
```

You can deploy sites on GitLab Pages with or without a custom domain. If you choose to use the default setup (without a custom domain), or if you create a project site, you will need to setup your site with path prefixing. If adding a custom domain, you can skip the Path Prefix step, and remove `--prefix-paths` from the gitlab-ci.yml file.

### Path Prefix

As the site will be hosted under yourname.gitlab.io/examplerepository/, you will need to configure Gatsby to use the Path Prefix plugin.

In the `gatsby-config.js`, set the `pathPrefix` to be added to your site's link
paths. The `pathPrefix` should be the project name in your repository. (ex.
`https://gitlab.com/yourname/examplerepository/` - your `pathPrefix` should be
`/examplerepository`). See
[the docs page on path prefixing for more](/docs/path-prefix/).

```js
module.exports = {
  pathPrefix: `/examplerepository`,
}
```

### Build and Deploy with GitLab CI

To use GitLab's continuous integration (CI), you need to add a `.gitlab-ci.yml`
configuration file. This is the file that GitLab uses to manage the CI job.

It can easily be added to your repository by the [GitLab](https://gitlab.com)
website, as the online editor contains a pre-built template for Gatsby deployment.

To use the template open your repository on their website, select the 'Setup CI/CD' option on
the center menu, and it will create a new blank `.gitlab-ci.yml` for you. Now
select the 'Apply a GitLab CI Yaml Template' drop-down, and type 'Gatsby' into
the filter. Select the Gatsby option, click 'Commit Changes', and you are done!

If adding this manually to your project, the file needs to contain a few required
fields:

```yaml
image: node:latest

# This folder is cached between builds
# http://docs.gitlab.com/ce/ci/yaml/README.html#cache
cache:
  paths:
    - node_modules/

pages:
  script:
    - npm install
    - ./node_modules/.bin/gatsby build --prefix-paths
  artifacts:
    paths:
      - public
  only:
    - master
```

The CI platform uses Docker images/containers, so `image: node:latest` tells the
CI to use the latest node image. `cache:` caches the `node_modules` folder
in between builds, so subsequent builds should be a lot faster as it doesn't have
to reinstall all the dependencies required. `pages:` is the name of the
CI stage. You can have multiple stages, e.g. 'Test', 'Build', 'Deploy' etc.
`script:` starts the next part of the CI stage, telling it to start running the
below scripts inside the image selected. We have used the `npm install` and
`./node_modules/.bin/gatsby build --prefix-paths` which will install all dependencies, and
start the static site build, respectively.

We have used
`./node_modules/.bin/gatsby build --prefix-paths` because we then don't have to install
gatsby-cli to build the image, as it has already been included and installed
with `npm install`. We have included `--prefix-paths` as when running the command _without_ that flag, Gatsby ignores your pathPrefix. `artifacts:` and `paths:` are used to tell GitLab pages
where the static files are kept. `only:` and `master` tells the CI to only run
the above instructions when the master branch is deployed.

Add that configuration, and with the next master branch push, your site should
have been built correctly. This can be checked by going to your repository on
GitLab, and selecting CI/CD in the sidebar. This will then show you a log of all
jobs that have either succeeded or failed. You can click on the failed status,
and then select the job to get more information about why your build may have
failed.

If all went well, you should now be able to access your site. It will be hosted
under gitlab.io - for example if you have have a repository under your
namespace, the url will be yourname.gitlab.io/examplerepository.

Visit the
[GitLab Pages](https://gitlab.com/help/user/project/pages/getting_started_part_one.md)
to learn how to setup custom domains and find out about advanced configurations.

## Heroku

You can use the [heroku buildpack static](https://github.com/heroku/heroku-buildpack-static) to handle the static files of your site.

Set the `heroku/node.js` and `heroku-buildpack-static` buildpacks on your application creating an `app.json` file on the root of your project.

```json
{
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    },
    {
      "url": "https://github.com/heroku/heroku-buildpack-static"
    }
  ]
}
```

Sometimes specifying buildpacks via the `app.json` file doesn't work. If this is your case try to add them in the Heroku dashboard or via the CLI.

Add a `heroku-postbuild` script in your `package.json`:

```json
{
  // ...
  "scripts": {
    // ...
    "heroku-postbuild": "gatsby build"
    // ...
  }
  // ...
}
```

Finally, add a `static.json` file in the root of your project to define the directory where your static assets will be. You can check all the options for this file in the [heroku-buildpack-static configuration](https://github.com/heroku/heroku-buildpack-static#configuration).

```
{
  "root": "public/",
  "headers": {
    "/**.js": {
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  }
}
```

## Now

In order to deploy your Gatsby project using [Now](https://zeit.co/now), you can do the following:

1.  Install the Now CLI

`npm install -g now`

2.  Install a node server package (such as `serve`, or `http-server`)

`npm install --save serve`

3.  Add a `start` script to your `package.json` file, this is what Now will use to run your application:

`"start": "serve public/"`

4.  Run `now` at the root of your Gatsby project, this will upload your project, run the `build` script, and then your `start` script.

## Debugging tips

### Don't minify HTML

If you see the following error:

```
Unable to find element with ID ##
```

or alternatively

```
Uncaught Error: Minified React error #32; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=32&args[]=## for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
```

This is a new problem when dealing with static sites built with React. This is
not caused by Gatsby. React uses HTML comments to help identify locations of
components that do not render anything. If you are using a CDN that minifies
your HTML, it will eliminate the HTML comments used by React to take control of
the page on the client. Cloudflare is a CDN that minifies HTML by default.

## Aerobatic

[Aerobatic](https://www.aerobatic.com) is a specialized static site host. You can easily deploy your Gatsby site to Aerobatic with the following steps:

1.  Install the Aerobatic CLI:

`npm install aerobatic-cli -g`

2.  Create a new Aerobatic site at the root of your Gatsby project:

`aero create --name <your-site-name>`

3.  Deploy your Gatsby build output:

`aero deploy --directory public`

Your site will be ready on our CDN at https://<your-site-name>.aerobaticapp.com in a matter of seconds.

There are some additional HTTP header optimizations you can configure in your `aerobatic.yml` file:

```yaml
deploy:
  # Note with below setting it is not necessary to pass --directory to aero deploy command
  directory: public
  # Turn off the Aerobatic asset fingerprinting since Gatsby already does this
  optimizer:
    fingerprintAssets: false

plugins:
  # Force aggressive 1yr max-age header for all .js and .js.map requests
  - name: http-headers
    path: ["/*.js", "/*.js.map"]
    options:
      "Cache-Control": "public, max-age=31536000"
  - name: webpage
```

Learn more about Gatsy and Aerobatic at https://www.aerobatic.com/docs/static-site-generators/#react
