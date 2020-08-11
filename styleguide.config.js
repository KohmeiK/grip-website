module.exports = {
  title: 'Styleguidist ASES Global',

  sections: [
    {
      name: 'Preface',
      sections: [
        {
          name: 'Installation / Setup',
          content: 'docs/installation.md',
          description: 'This section explains how to set up your developmemt enviroment'
        },
        {
          name: 'UI Design Guide',
          content: 'docs/styleguide.md',
          description: 'This section is a UI style guide for when you want to add more pages to the site while keeping it themactically consistent'
        },
        {
          name: 'Misc',
          content: 'docs/misc.md',
          description: 'Other useful info that I had no where else to put'
        },
        {
          name: 'Live Site',
          external: true,
          href: 'http://kolledgeholdings.com'
        }
      ]
    },
    {
      name: 'Admin',
      components: 'src/Admin/*.js',
      description: 'Pages that only admin accounts can acsess'
      // exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      // usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
    },
    {
      name: 'Applications',
      components: 'src/Applications/*.js',
      description: '(Previously Your Applications) - show a list of companies a student has applied to'
    },
    {
      name: 'Apply',
      components: 'src/Apply/*.js',
      description: 'Job list page where studens can see a list of jobs they can apply to'
    },
    {
      name: 'Company',
      components: 'src/Company/*.js',
      description: 'Pages only company accounts can acsess'
    },
    {
      name: 'Firebase',
      components: 'src/Firebase/*.js',
      description: 'Context for firebase services'
    },
    {
      name: 'Home',
      components: 'src/Home/*.js',
      description: 'Landing page, which contains (How it works, about, FAQ, testimonials, contact)'
    },
    {
      name: 'Nav',
      components: 'src/Nav/*.js',
      description: 'Anything to do with the nav bar'
    },
    {
      name: 'Route',
      components: 'src/Route/*.js',
      description: 'React Router Stuff and acess error pages'
    },
    {
      name: 'Signup',
      components: 'src/Signup/*.js',
      description: 'Log in / Sign up + New account onboarding'
    },
    {
      name: 'User',
      components: 'src/User/*.js',
      description: '(Previously My Profile) Anything under the My Info'
    },
  ]
};
