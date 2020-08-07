Jobcard component example:

```jsx static
<JobCard
  key={index}
  index={index}
  title={job.title}
  info={job.info}
  dl={job.deadline}
  handleClick={handleClick}
  handleSecondClick={handleSecondClick}
  applicantNum={job.applicantNum}
  loading={downloaded[index]}
/>
```

Examples with all other languages are rendered only as highlighted source code, not an actual component:

```html
<Button size="large">Push Me</Button>
```

Any [Markdown](http://daringfireball.net/projects/markdown/) is **allowed** _here_.
