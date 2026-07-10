export default function JobPosting({ url, by, time, title }) {
  return (
    <div className='post' role='listitem'>
      <h2 className='post__title'>
        {/* 
        Conditional rendering for job title:
        - If URL exists: render as clickable link that opens in new tab
        - If no URL: render as plain text
        
        INPUT: url = "https://techcompany.com/jobs", title = "Frontend Developer"
        OUTPUT: <a href="https://techcompany.com/jobs" target="_blank">Frontend Developer</a>
        
        INPUT: url = null, title = "Backend Engineer" 
        OUTPUT: "Backend Engineer" (plain text)
        */}
        {url ? (
          <a href={url} target='_blank' rel='noopener'>
            {title}
          </a>
        ) : (
          title
        )}
      </h2>

      {/* 
      Display job metadata (author and posting time)
      INPUT: by = "techCompany", time = 1609459200 (Unix timestamp)
      OUTPUT: "By techCompany 1/1/2021, 12:00:00 AM" (formatted based on user's locale)
      */}
      <p className='post__metadata'>
        By {by} {new Date(time * 1000).toLocaleString()}
      </p>
    </div>
  );
}
