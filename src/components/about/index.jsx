import React from 'react'

function About() {
  return (
    <div className='about-section-container mx-6'>
      <div>
        <h3 className='is-size-3 has-text-primary'>What Is It For?</h3>
      </div>
      <div>
        <p>I love planning and managing events and even daily todos. This is a time table app which I have created and as you might have already guessed it is dedicated to managing your weekly routine.</p>
        <p>Why only weekly though?</p>
        <p>Well, If you have read <a href='https://www.amazon.com/Rework-Jason-Fried/dp/0307463745' target='__blank'>ReWork by Jason Fried and David Heinemeier Hansson</a>, you would know that they talk about planning as nothing more than guessing. So with that analogy, If you plan for the next day, you are basically guessing what should or should not be in the coming day. Same for weeks, months and for years.</p>
        <p>Since you are like other human beings, you have a limited foresight of whats to come. Therefore, planning ... er I mean guessing ... for a coming week seems to me to be viable and doable as mere "days" would be too less and would keep us busy with managing the schedule rather working based on it. "months" and "years" would be too farfetched and would be brimming with uncertainties.</p>
        <p>On top of that, ad far as my experience goes, having more than 4 tasks per day makes the day cluttered, especially for a working person with 9-5 job. And having more than 5 tasks per day makes it very difficult for a person to check all the todos as "done".</p>
      </div>
      <div>
      <h3 className='is-size-3 has-text-primary'>How To Use It?</h3>
      </div>
      <div>
        <p>It is pretty simple and self explainatory. To edit the data that is shown in the table, you go to the "Edit Table" tab and tell the form how you want your week to be laid out.</p>
        <p>After that you only need to keep track of your daily tasks and mark them as done when you feel like it.</p>
        <p>There is also a "focus mode" which basically hides away all other days and simply shows you tasks for today and whether any of them are done or not.</p>
        <p>That pretty much covers everything.</p>
      </div>
      <div>
      <h3 className='is-size-3 has-text-primary'>Want To Contribute?</h3>
      </div>
      <div>
        <p>I am currently working for this section. Come back some time later and it should have some guidelines.</p>
      </div>
    </div>
  )
}

export default About